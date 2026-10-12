import { setTimeout as sleep } from 'node:timers/promises';

import { TeleBunnyError, TelegramError } from '../errors.ts';
import {
	BodyType,
	HttpClient,
	type RequestBody,
	type RequestOptions,
} from './http.ts';
import { InputFile } from './input-file.ts';
import type {
	ApiMethod,
	ParamsOf,
	ResponseParameters,
	ResultOf,
} from '../telegram/index.ts';

export interface ApiOptions {
	apiRoot?: string;
	/** Default request timeout in milliseconds. */
	timeout?: number;
	/** How many times a request is repeated after a 429 error. */
	maxRetries?: number;
}

export type CallOptions = RequestOptions;

export type CallArgs<M extends ApiMethod> =
	Record<never, never> extends ParamsOf<M>
		? [params?: ParamsOf<M>, options?: CallOptions]
		: [params: ParamsOf<M>, options?: CallOptions];

type ApiResponse =
	| { ok: true; result: unknown }
	| {
			ok: false;
			error_code: number;
			description: string;
			parameters?: ResponseParameters;
	  };

export class TelegramApi {
	readonly #base: string;
	readonly #http: HttpClient;
	readonly #maxRetries: number;

	constructor(token: string, options: ApiOptions = {}) {
		const root = (options.apiRoot ?? 'https://api.telegram.org').replace(
			/\/+$/,
			'',
		);

		this.#base = `${root}/bot${token}/`;
		this.#http = new HttpClient({ timeout: options.timeout });
		this.#maxRetries = options.maxRetries ?? 3;
	}

	async call<M extends ApiMethod>(
		method: M,
		...args: CallArgs<M>
	): Promise<ResultOf<M>> {
		const [params, options] = args as [
			ParamsOf<M> | undefined,
			CallOptions | undefined,
		];
		const body = await toRequestBody(params ?? {});

		for (let attempt = 0; ; attempt++) {
			const response = await this.#post(method, body, options);

			if (response.ok) return response.result as ResultOf<M>;

			const error = new TelegramError(
				method,
				response.error_code,
				response.description,
				response.parameters,
			);

			if (error.retryAfter === undefined || attempt >= this.#maxRetries) {
				throw error;
			}

			await sleep(error.retryAfter * 1000, undefined, {
				signal: options?.signal,
			});
		}
	}

	async #post(
		method: ApiMethod,
		body: RequestBody,
		options?: CallOptions,
	): Promise<ApiResponse> {
		let json: unknown;

		try {
			({ json } = await this.#http.post(
				this.#base + method,
				body,
				options,
			));
		} catch (error) {
			if (options?.signal?.aborted || error instanceof TeleBunnyError) {
				throw error;
			}

			throw new TeleBunnyError(`${method} request failed`, {
				cause: error,
			});
		}

		if (!isApiResponse(json)) {
			throw new TeleBunnyError(
				`${method} returned an unexpected response`,
			);
		}

		return json;
	}
}

function isApiResponse(value: unknown): value is ApiResponse {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof (value as { ok?: unknown }).ok === 'boolean'
	);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	if (typeof value !== 'object' || value === null) return false;

	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
}

async function toRequestBody(params: object): Promise<RequestBody> {
	const files = new Map<string, InputFile>();
	const fields: [string, unknown][] = [];

	const attach = (value: unknown): unknown => {
		if (value instanceof InputFile) {
			const name = `file${files.size}`;

			files.set(name, value);

			return `attach://${name}`;
		}

		if (Array.isArray(value)) return value.map(attach);
		if (isPlainObject(value)) {
			return Object.fromEntries(
				Object.entries(value).map(([key, item]) => [key, attach(item)]),
			);
		}

		return value;
	};

	for (const [key, value] of Object.entries(params)) {
		if (value === undefined) continue;
		if (value instanceof InputFile) files.set(key, value);
		else fields.push([key, attach(value)]);
	}

	if (files.size === 0) return { type: BodyType.Json, data: params };

	const form = new FormData();

	for (const [key, value] of fields) {
		form.append(
			key,
			typeof value === 'object' && value !== null
				? JSON.stringify(value)
				: String(value),
		);
	}

	for (const [name, file] of files) {
		form.append(name, await file.toBlob(), file.filename);
	}

	return { type: BodyType.FormData, data: form };
}
