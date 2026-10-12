import { strict as assert } from 'node:assert';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { after, before, describe, it } from 'node:test';

import { HttpError } from '../src/errors.ts';
import { BodyType, HttpClient } from '../src/client/http.ts';

describe('HttpClient', () => {
	let server: Server;
	let url: string;

	before(async () => {
		server = createServer(async (req, res) => {
			const chunks: Buffer[] = [];

			for await (const chunk of req) chunks.push(chunk);

			const body = Buffer.concat(chunks).toString('utf8');

			if (req.url === '/text') return res.end('not json');
			if (req.url === '/slow') {
				return setTimeout(() => res.end('{}'), 1_000);
			}

			res.setHeader('Content-Type', 'application/json');
			res.end(
				JSON.stringify({
					contentType: req.headers['content-type'],
					body,
				}),
			);
		});

		await new Promise<void>((resolve) =>
			server.listen(0, '127.0.0.1', resolve),
		);

		url = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
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

	it('posts multipart/form-data with a boundary', async () => {
		const form = new FormData();

		form.append('field', 'value');

		const { json } = await new HttpClient().post(`${url}/echo`, {
			type: BodyType.FormData,
			data: form,
		});
		const { contentType, body } = json as {
			contentType: string;
			body: string;
		};

		assert.match(contentType, /^multipart\/form-data; boundary=/);
		assert.match(body, /name="field"\r\n\r\nvalue/);
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
});
