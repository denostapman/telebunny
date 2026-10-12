import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';

export interface UploadedFile {
	filename: string;
	content: string;
}

export interface ApiRequest {
	method: string;
	contentType: string;
	params: Record<string, unknown>;
	files: Record<string, UploadedFile>;
}

export type ApiHandler = (request: ApiRequest, signal: AbortSignal) => unknown;

export interface FakeTelegram {
	apiRoot: string;
	requests: ApiRequest[];
	close(): Promise<void>;
}

export const TOKEN = '123:TEST';

export async function startFakeTelegram(
	handler: ApiHandler,
): Promise<FakeTelegram> {
	const requests: ApiRequest[] = [];
	const server = createServer(async (req, res) => {
		const controller = new AbortController();

		res.on('close', () => controller.abort());

		const chunks: Buffer[] = [];

		for await (const chunk of req) chunks.push(chunk);

		const body = Buffer.concat(chunks);
		const contentType = req.headers['content-type'] ?? '';
		const method = (req.url ?? '').split('/').pop() ?? '';

		const request: ApiRequest = {
			method,
			contentType,
			params: {},
			files: {},
		};

		if (contentType.startsWith('application/json')) {
			request.params = JSON.parse(body.toString('utf8'));
		} else if (contentType.startsWith('multipart/form-data')) {
			const form = await new Response(body, {
				headers: { 'content-type': contentType },
			}).formData();

			for (const [key, value] of form) {
				if (typeof value === 'string') {
					request.params[key] = value;
				} else {
					request.files[key] = {
						filename: value.name,
						content: await value.text(),
					};
				}
			}
		}

		requests.push(request);

		const response = await handler(request, controller.signal);

		if (res.destroyed) return;

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(response));
	});

	await new Promise<void>((resolve) =>
		server.listen(0, '127.0.0.1', resolve),
	);

	const { port } = server.address() as AddressInfo;

	return {
		apiRoot: `http://127.0.0.1:${port}`,
		requests,
		close: () => {
			server.closeAllConnections();

			return new Promise((resolve) => server.close(() => resolve()));
		},
	};
}

export const ok = (result: unknown) => ({ ok: true, result });
export const fail = (
	error_code: number,
	description: string,
	parameters?: object,
) => ({
	ok: false,
	error_code,
	description,
	parameters,
});

export function hold(ms: number, signal: AbortSignal): Promise<void> {
	return new Promise((resolve) => {
		const timer = setTimeout(resolve, ms);

		signal.addEventListener('abort', () => {
			clearTimeout(timer);
			resolve();
		});
	});
}
