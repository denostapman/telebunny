import { strict as assert } from 'node:assert';
import { execFile } from 'node:child_process';
import { openAsBlob } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import {
	Agent,
	createServer,
	type ClientRequestArgs,
	type Server,
} from 'node:http';
import { Agent as HttpsAgent } from 'node:https';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { Duplex } from 'node:stream';
import { after, before, describe, it } from 'node:test';
import { promisify } from 'node:util';

import { HttpError } from '../src/errors.ts';
import { BodyType, HttpClient } from '../src/client/http.ts';

async function parseForm(body: Buffer, contentType: string) {
	const form = await new Response(new Uint8Array(body), {
		headers: { 'Content-Type': contentType },
	}).formData();
	const fields: Record<string, unknown> = {};

	for (const [name, value] of form) {
		fields[name] =
			typeof value === 'string'
				? value
				: {
						name: value.name,
						type: value.type,
						size: value.size,
						tail: (await value.text()).slice(-8),
					};
	}

	return fields;
}

const listen = async (server: Server) => {
	await new Promise<void>((resolve) =>
		server.listen(0, '127.0.0.1', resolve),
	);

	return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
};

describe('HttpClient', () => {
	let server: Server;
	let url: string;

	before(async () => {
		server = createServer(async (req, res) => {
			const chunks: Buffer[] = [];

			for await (const chunk of req) chunks.push(chunk);

			const raw = Buffer.concat(chunks);
			const body = raw.toString('utf8');
			const { pathname } = new URL(req.url ?? '/', url);
			const json = (value: unknown) => {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(value));
			};

			if (pathname === '/text') return res.end('not json');
			if (pathname === '/slow') {
				return setTimeout(() => res.end('{}'), 1_000);
			}
			if (pathname === '/stall') {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				return res.write('{"partial":');
			}
			if (pathname === '/port') return json(req.socket.remotePort);
			if (pathname === '/form') {
				return json({
					contentLength: Number(req.headers['content-length']),
					received: raw.length,
					transferEncoding: req.headers['transfer-encoding'],
					fields: await parseForm(
						raw,
						req.headers['content-type'] ?? '',
					),
				});
			}
			json({ contentType: req.headers['content-type'], body });
		});

		url = await listen(server);
	});

	after(() => {
		server.closeAllConnections();
		server.close();
	});

	it('posts JSON and parses the JSON response', async () => {
		const response = await new HttpClient().post(`${url}/echo`, {
			type: BodyType.Json,
			data: { a: 1 },
		});

		assert.equal(response.status, 200);
		assert.deepEqual(response.json, {
			contentType: 'application/json',
			body: '{"a":1}',
		});
	});

	it('posts multipart/form-data that a standard parser accepts', async () => {
		const { json } = await new HttpClient().post(`${url}/form`, {
			type: BodyType.Multipart,
			fields: [
				['chat_id', '42'],
				['caption', 'line\nbreak'],
			],
			files: [
				{
					name: 'document',
					filename: 'a "quoted".txt',
					data: new Blob(['hello'], { type: 'text/plain' }),
				},
				{
					name: 'thumbnail',
					filename: 't',
					data: new Uint8Array([1, 2, 3]),
				},
			],
		});

		assert.deepEqual((json as { fields: unknown }).fields, {
			chat_id: '42',
			caption: 'line\nbreak',
			document: {
				name: 'a "quoted".txt',
				type: 'text/plain',
				size: 5,
				tail: 'hello',
			},
			thumbnail: {
				name: 't',
				type: 'application/octet-stream',
				size: 3,
				tail: '\x01\x02\x03',
			},
		});
	});

	it('escapes quotes and line breaks in multipart names', async () => {
		const { json } = await new HttpClient().post(`${url}/form`, {
			type: BodyType.Multipart,
			fields: [['evil"\r\nX-Injected: 1', 'value']],
			files: [
				{
					name: 'document',
					filename: 'evil"\r\nContent-Type: text/html',
					data: Buffer.from('x'),
				},
			],
		});

		assert.deepEqual((json as { fields: unknown }).fields, {
			'evil"\r\nX-Injected: 1': 'value',
			document: {
				name: 'evil"\r\nContent-Type: text/html',
				type: 'application/octet-stream',
				size: 1,
				tail: 'x',
			},
		});
	});

	it('streams large Blob uploads with Content-Length', async () => {
		const content = 'a'.repeat(5_000_000) + 'END';

		const { json } = await new HttpClient().post(`${url}/form`, {
			type: BodyType.Multipart,
			fields: [],
			files: [
				{
					name: 'document',
					filename: 'big.txt',
					data: new Blob([content]),
				},
			],
		});
		const upload = json as {
			contentLength: number;
			received: number;
			transferEncoding?: string;
			fields: { document: { size: number; tail: string } };
		};

		assert.equal(upload.transferEncoding, undefined);
		assert.equal(upload.contentLength, upload.received);
		assert.equal(upload.fields.document.size, content.length);
		assert.equal(upload.fields.document.tail, 'aaaaaEND');
	});

	it('throws HttpError when the response is not JSON', async () => {
		await assert.rejects(
			new HttpClient().post(`${url}/text`, {
				type: BodyType.Json,
				data: {},
			}),
			(error) => {
				assert.ok(error instanceof HttpError);
				assert.equal(error.status, 200);

				return true;
			},
		);
	});

	it('reuses connections between requests', async () => {
		const client = new HttpClient();
		const request = () =>
			client.post(`${url}/port`, { type: BodyType.Json, data: {} });

		const first = await request();
		const second = await request();

		assert.equal(first.json, second.json);
	});

	it('rejects without crashing when the request cannot be created', async () => {
		const client = new HttpClient({ timeout: 20, agent: new HttpsAgent() });

		await assert.rejects(
			client.post(`${url}/port`, { type: BodyType.Json, data: {} }),
			{ code: 'ERR_INVALID_PROTOCOL' },
		);
		await new Promise((resolve) => setTimeout(resolve, 60));
	});

	it('sends requests through a custom agent', async () => {
		class CountingAgent extends Agent {
			connections = 0;

			override createConnection(
				options: ClientRequestArgs,
				callback?: (error: Error | null, stream: Duplex) => void,
			) {
				this.connections++;

				return super.createConnection(options, callback);
			}
		}

		const agent = new CountingAgent({ keepAlive: true });
		const client = new HttpClient({ agent });

		await client.post(`${url}/port`, { type: BodyType.Json, data: {} });
		await client.post(`${url}/port`, { type: BodyType.Json, data: {} });

		assert.equal(agent.connections, 1);
		agent.destroy();
	});

	it('aborts requests after the timeout', async () => {
		await assert.rejects(
			new HttpClient({ timeout: 50 }).post(`${url}/slow`, {
				type: BodyType.Json,
				data: {},
			}),
			{ name: 'TimeoutError' },
		);
	});

	it('aborts requests with a signal', async () => {
		const controller = new AbortController();
		const request = new HttpClient().post(
			`${url}/slow`,
			{ type: BodyType.Json, data: {} },
			{ signal: controller.signal },
		);

		controller.abort();

		await assert.rejects(request, { name: 'AbortError' });
	});

	it('aborts requests while the response body is streaming', async () => {
		const controller = new AbortController();
		const request = new HttpClient().post(
			`${url}/stall`,
			{ type: BodyType.Json, data: {} },
			{ signal: controller.signal },
		);

		setTimeout(() => controller.abort(), 50);

		await assert.rejects(request, { name: 'AbortError' });
	});

	it('times out while the response body is streaming', async () => {
		await assert.rejects(
			new HttpClient({ timeout: 50 }).post(`${url}/stall`, {
				type: BodyType.Json,
				data: {},
			}),
			{ name: 'TimeoutError' },
		);
	});

	it('aborts requests after the timeout when a signal is given', async () => {
		await assert.rejects(
			new HttpClient({ timeout: 50 }).post(
				`${url}/slow`,
				{ type: BodyType.Json, data: {} },
				{ signal: new AbortController().signal },
			),
			{ name: 'TimeoutError' },
		);
	});
});

describe('HttpClient upload failures', () => {
	it('stops uploading when the server responds early', async () => {
		let open = 0;
		const server = createServer((req, res) => {
			res.writeHead(413, { 'Content-Type': 'application/json' });
			res.end('{"ok":false,"error_code":413}');
		});

		server.on('connection', (socket) => {
			open++;
			socket.on('close', () => open--);
		});

		const url = await listen(server);
		const { status } = await new HttpClient().post(url, {
			type: BodyType.Multipart,
			fields: [],
			files: [
				{
					name: 'document',
					filename: 'big.bin',
					data: Buffer.alloc(64 * 1024 * 1024),
				},
			],
		});

		await new Promise((resolve) => setTimeout(resolve, 100));

		assert.equal(status, 413);
		assert.equal(open, 0);
		server.close();
	});

	it('closes the connection when a file fails mid-upload', async () => {
		const closed: number[] = [];
		const server = createServer((req, res) => {
			req.on('error', () => {});
			req.resume();
			req.on('end', () => res.end('{}'));
		});

		server.on('connection', (socket) =>
			socket.on('close', () => closed.push(performance.now())),
		);

		const url = await listen(server);
		const dir = await mkdtemp(join(tmpdir(), 'telebunny-'));
		const path = join(dir, 'changing.bin');

		await writeFile(path, Buffer.alloc(1_000, 1));

		const changing = await openAsBlob(path);

		await writeFile(path, Buffer.alloc(10, 2));

		const started = performance.now();

		await assert.rejects(
			new HttpClient({ timeout: 10_000 }).post(url, {
				type: BodyType.Multipart,
				fields: [],
				files: [
					{
						name: 'first',
						filename: 'a.bin',
						data: Buffer.alloc(2_000_000),
					},
					{ name: 'second', filename: 'b.bin', data: changing },
				],
			}),
			{ name: 'NotReadableError' },
		);
		await new Promise((resolve) => setTimeout(resolve, 100));

		assert.equal(closed.length, 1);
		assert.ok(closed[0] - started < 1_000);

		server.close();
		await rm(dir, { recursive: true });
	});
});

describe('HttpClient with NODE_USE_ENV_PROXY', () => {
	let proxy: Server;
	let proxyUrl: string;

	before(async () => {
		proxy = createServer((req, res) => {
			req.resume();
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ proxied: req.url }));
		});
		proxyUrl = await listen(proxy);
	});

	after(() => {
		proxy.closeAllConnections();
		proxy.close();
	});

	it('sends requests through HTTP_PROXY', async () => {
		const module = new URL('../src/client/http.ts', import.meta.url).href;
		const script = `
			import { BodyType, HttpClient } from '${module}';
			const { json } = await new HttpClient().post(
				'http://telegram.invalid/bot1:token/getMe',
				{ type: BodyType.Json, data: {} },
			);
			console.log(JSON.stringify(json));
		`;
		const { stdout } = await promisify(execFile)(
			process.execPath,
			['--input-type=module', '-e', script],
			{
				env: {
					PATH: process.env.PATH,
					NODE_USE_ENV_PROXY: '1',
					HTTP_PROXY: proxyUrl,
				},
			},
		);

		assert.deepEqual(JSON.parse(stdout), {
			proxied: 'http://telegram.invalid/bot1:token/getMe',
		});
	});
});
