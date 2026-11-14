import { randomUUID } from 'node:crypto';
import {
	request as httpRequest,
	type Agent,
	type ClientRequest,
	type OutgoingHttpHeaders,
} from 'node:http';
import { request as httpsRequest } from 'node:https';

import { HttpError } from '../errors.ts';

export const BodyType = {
	Json: 'json',
	Multipart: 'multipart',
} as const;
export type BodyType = (typeof BodyType)[keyof typeof BodyType];

export interface MultipartFile {
	name: string;
	filename: string;
	data: Uint8Array | Blob;
}

export type RequestBody =
	| { type: typeof BodyType.Json; data: unknown }
	| {
			type: typeof BodyType.Multipart;
			fields: [name: string, value: string][];
			files: MultipartFile[];
	  };

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
	agent?: Agent;
}

type BodyPart = Uint8Array | Blob;

interface EncodedBody {
	headers: OutgoingHttpHeaders;
	parts: BodyPart[];
}

interface RawResponse {
	status: number;
	text: string;
}

export class HttpClient {
	readonly #timeout: number;
	readonly #agent?: Agent;

	constructor(options: HttpClientOptions = {}) {
		this.#timeout = options.timeout ?? 60_000;
		this.#agent = options.agent;
	}

	async post(
		url: string | URL,
		body: RequestBody,
		options: RequestOptions = {},
	): Promise<HttpResponse> {
		const { status, text } = await this.#send(
			new URL(url),
			encode(body),
			options.timeout ?? this.#timeout,
			options.signal,
		);

		try {
			return { status, json: JSON.parse(text) };
		} catch (error) {
			throw new HttpError(
				status,
				`Expected JSON response, got status ${status}`,
				{ cause: error },
			);
		}
	}

	#send(
		url: URL,
		{ headers, parts }: EncodedBody,
		timeout: number,
		signal?: AbortSignal,
	): Promise<RawResponse> {
		const request = url.protocol === 'https:' ? httpsRequest : httpRequest;

		return new Promise((resolve, reject) => {
			let timedOut = false;

			const fail = (error: unknown) => {
				clearTimeout(timer);
				reject(
					timedOut
						? new DOMException(
								'The operation was aborted due to timeout',
								'TimeoutError',
							)
						: signal?.aborted
							? signal.reason
							: error,
				);
			};

			const req = request(
				url,
				{ method: 'POST', agent: this.#agent, headers, signal },
				(res) => {
					const chunks: Buffer[] = [];

					res.on('data', (chunk: Buffer) => chunks.push(chunk));
					res.on('error', fail);
					res.on('end', () => {
						clearTimeout(timer);
						resolve({
							status: res.statusCode ?? 0,
							text: (chunks.length === 1
								? chunks[0]
								: Buffer.concat(chunks)
							).toString(),
						});

						if (!req.writableFinished) req.destroy();
					});
				},
			);

			const timer = setTimeout(() => {
				timedOut = true;
				req.destroy();
			}, timeout);

			req.on('error', fail);
			writeBody(req, parts).catch((error) => req.destroy(error));
		});
	}
}

function encode(body: RequestBody): EncodedBody {
	switch (body.type) {
		case BodyType.Json: {
			const data = Buffer.from(JSON.stringify(body.data));

			return {
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': data.length,
				},
				parts: [data],
			};
		}
		case BodyType.Multipart:
			return encodeMultipart(body.fields, body.files);
	}
}

const UNSAFE_NAME = /["\r\n]/;

const escapeName = (name: string) =>
	UNSAFE_NAME.test(name)
		? name.replace(/\n/g, '%0A').replace(/\r/g, '%0D').replace(/"/g, '%22')
		: name;

function encodeMultipart(
	fields: [name: string, value: string][],
	files: MultipartFile[],
): EncodedBody {
	const boundary = `----TeleBunnyFormBoundary${randomUUID()}`;
	const parts: BodyPart[] = [];
	let text = '';
	let length = 0;

	const flush = () => {
		const data = Buffer.from(text);

		parts.push(data);
		length += data.length;
		text = '';
	};

	for (const [name, value] of fields) {
		text += `--${boundary}\r\nContent-Disposition: form-data; name="${escapeName(name)}"\r\n\r\n${value}\r\n`;
	}

	for (const { name, filename, data } of files) {
		const type =
			(data instanceof Blob && data.type) || 'application/octet-stream';

		text +=
			`--${boundary}\r\nContent-Disposition: form-data; name="${escapeName(name)}"; filename="${escapeName(filename)}"\r\n` +
			`Content-Type: ${type}\r\n\r\n`;
		flush();
		parts.push(data);
		length += data instanceof Blob ? data.size : data.byteLength;
		text = '\r\n';
	}

	text += `--${boundary}--\r\n`;
	flush();

	return {
		headers: {
			'Content-Type': `multipart/form-data; boundary=${boundary}`,
			'Content-Length': length,
		},
		parts,
	};
}

const writable = (req: ClientRequest) =>
	new Promise<void>((resolve) => {
		const done = () => {
			req.off('drain', done);
			req.off('close', done);
			resolve();
		};

		req.on('drain', done);
		req.on('close', done);
	});

async function writeBody(req: ClientRequest, parts: BodyPart[]): Promise<void> {
	if (parts.length === 1 && !(parts[0] instanceof Blob)) {
		req.end(parts[0]);
		return;
	}

	for (const part of parts) {
		const chunks = part instanceof Blob ? part.stream() : [part];

		for await (const chunk of chunks) {
			if (req.destroyed) return;
			if (!req.write(chunk)) await writable(req);
		}
	}

	req.end();
}
