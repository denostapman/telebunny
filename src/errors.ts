import type { ResponseParameters } from './telegram/index.ts';

export class TeleBunnyError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);

		this.name = 'TeleBunnyError';
	}
}

/** Telegram answered a request with `ok: false`. */
export class TelegramError extends TeleBunnyError {
	readonly method: string;
	readonly code: number;
	readonly description: string;
	readonly parameters: ResponseParameters;

	constructor(
		method: string,
		code: number,
		description: string,
		parameters: ResponseParameters = {},
	) {
		super(`${method} failed: ${code} ${description}`);

		this.name = 'TelegramError';
		this.method = method;
		this.code = code;
		this.description = description;
		this.parameters = parameters;
	}

	/** Seconds to wait before repeating the request (flood control), if present. */
	get retryAfter(): number | undefined {
		return this.parameters.retryAfter;
	}
}

/** The server responded with something other than a Bot API JSON envelope. */
export class HttpError extends TeleBunnyError {
	readonly status: number;

	constructor(status: number, message: string, options?: ErrorOptions) {
		super(message, options);

		this.name = 'HttpError';
		this.status = status;
	}
}
