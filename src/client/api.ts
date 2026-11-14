import type { Agent } from 'node:http';
import { setTimeout as sleep } from 'node:timers/promises';

import { TeleBunnyError, TelegramError } from '../errors.ts';
import { camelKeys, isPlainObject, snakeKey } from './case.ts';
import {
	BodyType,
	HttpClient,
	type RequestBody,
	type RequestOptions,
} from './http.ts';
import { InputFile, readInputFile } from './input-file.ts';
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
	/**
	 * Agent for HTTP(S) requests, e.g. a proxy agent from `https-proxy-agent` or
	 * `socks-proxy-agent`. Defaults to Node's global agent, which keeps connections
	 * alive and honors `HTTPS_PROXY` when `NODE_USE_ENV_PROXY=1` is set.
	 */
	agent?: Agent;
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
			parameters?: unknown;
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
		this.#http = new HttpClient({
			timeout: options.timeout,
			agent: options.agent,
		});
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
		const body = await toRequestBody(
			(params ?? {}) as Record<string, unknown>,
		);

		for (let attempt = 0; ; attempt++) {
			const response = await this.#post(method, body, options);

			if (response.ok) return camelKeys<ResultOf<M>>(response.result);

			const error = new TelegramError(
				method,
				response.error_code,
				response.description,
				camelKeys<ResponseParameters | undefined>(response.parameters),
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

async function toRequestBody(
	params: Record<string, unknown>,
): Promise<RequestBody> {
	const files = new Map<string, InputFile>();
	const fields: Record<string, unknown> = Object.create(null);

	const convert = (value: unknown): unknown => {
		if (typeof value !== 'object' || value === null) return value;

		if (value instanceof InputFile) {
			const name = `file${files.size}`;

			files.set(name, value);

			return `attach://${name}`;
		}

		if (Array.isArray(value)) {
			const result = new Array<unknown>(value.length);

			for (let i = 0; i < value.length; i++) {
				result[i] = convert(value[i]);
			}

			return result;
		}

		if (!isPlainObject(value)) return value;

		const result: Record<string, unknown> = {};

		for (const key in value) result[snakeKey(key)] = convert(value[key]);

		return result;
	};

	for (const key in params) {
		const value = params[key];

		if (value === undefined) continue;
		if (value instanceof InputFile) files.set(snakeKey(key), value);
		else fields[snakeKey(key)] = convert(value);
	}

	if (files.size === 0) return { type: BodyType.Json, data: fields };

	const textFields: [string, string][] = [];

	for (const key in fields) {
		const value = fields[key];

		textFields.push([
			key,
			typeof value === 'object' && value !== null
				? JSON.stringify(value)
				: String(value),
		]);
	}

	return {
		type: BodyType.Multipart,
		fields: textFields,
		files: await Promise.all(
			Array.from(files, async ([name, file]) => ({
				name,
				filename: file.filename,
				data: await readInputFile(file),
			})),
		),
	};
}
