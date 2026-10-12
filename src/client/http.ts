import { HttpError } from '../errors.ts';

export const BodyType = {
	Json: 'json',
	FormData: 'form-data',
} as const;
export type BodyType = (typeof BodyType)[keyof typeof BodyType];

export type RequestBody =
	| { type: typeof BodyType.Json; data: unknown }
	| { type: typeof BodyType.FormData; data: FormData };

export interface RequestOptions {
	signal?: AbortSignal;
	/** Milliseconds before the request is aborted. Overrides the client default. */
	timeout?: number;
}

export interface HttpResponse {
	status: number;
	json: unknown;
}

export interface HttpClientOptions {
	timeout?: number;
}

export class HttpClient {
	readonly #timeout: number;

	constructor(options: HttpClientOptions = {}) {
		this.#timeout = options.timeout ?? 60_000;
	}

	async post(
		url: string | URL,
		body: RequestBody,
		options: RequestOptions = {},
	): Promise<HttpResponse> {
		const signals = [AbortSignal.timeout(options.timeout ?? this.#timeout)];
		if (options.signal) signals.push(options.signal);

		const response = await fetch(url, {
			method: 'POST',
			signal: AbortSignal.any(signals),
			...HttpClient.#encode(body),
		});
		const text = await response.text();

		try {
			return { status: response.status, json: JSON.parse(text) };
		} catch (error) {
			throw new HttpError(
				response.status,
				`Expected JSON response, got status ${response.status}`,
				{ cause: error },
			);
		}
	}

	static #encode(body: RequestBody): RequestInit {
		switch (body.type) {
			case BodyType.Json:
				return {
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body.data),
				};
			case BodyType.FormData:
				return { body: body.data };
		}
	}
}
