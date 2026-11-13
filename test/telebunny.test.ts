import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';

import { TelegramError, TeleBunnyError } from '../src/errors.ts';
import { InputFile } from '../src/client/input-file.ts';
import { TeleBunny } from '../src/telebunny.ts';
import {
	InputMediaType,
	ParseMode,
	UpdateType,
} from '../src/telegram/index.ts';
import {
	fail,
	hold,
	ok,
	startFakeTelegram,
	TOKEN,
	type ApiHandler,
	type FakeTelegram,
} from './fake-telegram.ts';

const SECRET = 'test-secret';
const headers = { 'x-telegram-bot-api-secret-token': SECRET };

let telegram: FakeTelegram | undefined;
let bot: TeleBunny | undefined;

async function setup(
	handler: ApiHandler,
	errors: unknown[] = [],
): Promise<{ bot: TeleBunny; telegram: FakeTelegram }> {
	telegram = await startFakeTelegram(handler);
	bot = new TeleBunny(TOKEN, {
		apiRoot: telegram.apiRoot,
		webhookSecret: SECRET,
		onError: (error) => errors.push(error),
	});

	return { bot, telegram };
}

afterEach(async () => {
	await bot?.stopPolling();
	await telegram?.close();

	bot = telegram = undefined;
});

interface WireUpdate {
	update_id: number;
	message: object;
}

const message = (text: string) => ({
	message_id: 1,
	date: 0,
	chat: { id: 42, type: 'private' },
	text,
});

const updates = (...texts: string[]): WireUpdate[] =>
	texts.map((text, i) => ({ update_id: i + 1, message: message(text) }));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('API calls', () => {
	it('sends positional and optional parameters as snake_case JSON', async () => {
		const { bot, telegram } = await setup(() => ok(message('hi')));

		const result = await bot.sendMessage('hi', {
			chatId: 42,
			parseMode: ParseMode.HTML,
			replyParameters: { messageId: 7 },
		});

		assert.equal(result.text, 'hi');
		assert.equal(result.messageId, 1);
		assert.equal(telegram.requests[0].method, 'sendMessage');
		assert.equal(telegram.requests[0].contentType, 'application/json');
		assert.deepEqual(telegram.requests[0].params, {
			chat_id: 42,
			text: 'hi',
			parse_mode: 'HTML',
			reply_parameters: { message_id: 7 },
		});
	});

	it('calls methods without parameters', async () => {
		const { bot } = await setup(() =>
			ok({ id: 1, is_bot: true, first_name: 'Bunny' }),
		);

		assert.equal((await bot.getMe()).firstName, 'Bunny');
	});

	it('fetches updates manually with getUpdates', async () => {
		const { bot, telegram } = await setup(() => ok(updates('a')));

		const [update] = await bot.getUpdates({
			offset: 5,
			allowedUpdates: [UpdateType.Message],
		});

		assert.equal(update.updateId, 1);
		assert.equal(update.message?.text, 'a');
		assert.deepEqual(telegram.requests[0].params, {
			offset: 5,
			allowed_updates: ['message'],
		});
	});

	it('rejects with TelegramError on failed requests', async () => {
		const { bot } = await setup(() =>
			fail(400, 'Bad Request: message to delete not found', {
				migrate_to_chat_id: 43,
			}),
		);

		await assert.rejects(bot.deleteMessage(42, 1), (error) => {
			assert.ok(error instanceof TelegramError);
			assert.equal(error.method, 'deleteMessage');
			assert.equal(error.code, 400);
			assert.equal(error.parameters.migrateToChatId, 43);
			assert.match(error.message, /message to delete not found/);

			return true;
		});
	});

	it('waits retry_after and repeats flood-limited requests', async () => {
		let attempts = 0;
		const { bot } = await setup(() =>
			++attempts < 3
				? fail(429, 'Too Many Requests', { retry_after: 0 })
				: ok(true),
		);

		assert.equal(await bot.sendChatAction(42, 'typing'), true);
		assert.equal(attempts, 3);
	});

	it('gives up after maxRetries flood-limit errors', async () => {
		const telegram = await startFakeTelegram(() =>
			fail(429, 'Too Many Requests', { retry_after: 0 }),
		);
		const limited = new TeleBunny(TOKEN, {
			apiRoot: telegram.apiRoot,
			maxRetries: 1,
		});

		await assert.rejects(limited.getMe(), { name: 'TelegramError' });
		assert.equal(telegram.requests.length, 2);

		await telegram.close();
	});

	it('keeps string files as file_id/URL without reading the disk', async () => {
		const { bot, telegram } = await setup(() => ok(message('')));

		await bot.sendPhoto('./package.json', { chatId: 42 });

		assert.equal(telegram.requests[0].contentType, 'application/json');
		assert.equal(telegram.requests[0].params.photo, './package.json');
	});

	it('uploads InputFile as multipart/form-data', async () => {
		const { bot, telegram } = await setup(() => ok(message('')));

		await bot.sendDocument(
			new InputFile(Buffer.from('hello'), 'hello.txt'),
			{
				chatId: 42,
				caption: 'doc',
			},
		);

		const [request] = telegram.requests;

		assert.match(request.contentType, /^multipart\/form-data/);
		assert.deepEqual(request.params, { chat_id: '42', caption: 'doc' });
		assert.deepEqual(request.files.document, {
			filename: 'hello.txt',
			content: 'hello',
		});
	});

	it('attaches nested InputFile values in media groups', async () => {
		const { bot, telegram } = await setup(() => ok([]));

		await bot.sendMediaGroup(42, [
			{
				type: InputMediaType.Photo,
				media: new InputFile(
					new URL('../package.json', import.meta.url),
				),
			},
			{ type: InputMediaType.Photo, media: 'file-id' },
		]);

		const [request] = telegram.requests;

		assert.deepEqual(JSON.parse(request.params.media as string), [
			{ type: 'photo', media: 'attach://file0' },
			{ type: 'photo', media: 'file-id' },
		]);
		assert.equal(request.files.file0.filename, 'package.json');
		assert.match(request.files.file0.content, /"name": "telebunny"/);
	});

	it('omits chat_id for ephemeral replies to callback queries', async () => {
		const { bot, telegram } = await setup(() => ok(message('')));
		const ephemeralMessageParameters = { callbackQueryId: 'query' };

		await bot.sendMessage('hi', { ephemeralMessageParameters });
		await bot.sendDocument(
			new InputFile(Buffer.from('hello'), 'hello.txt'),
			{
				ephemeralMessageParameters,
			},
		);

		const [json, form] = telegram.requests;

		assert.deepEqual(json.params, {
			text: 'hi',
			ephemeral_message_parameters: { callback_query_id: 'query' },
		});
		assert.deepEqual(form.params, {
			ephemeral_message_parameters: '{"callback_query_id":"query"}',
		});
	});

	it('sends widgets and answers widget queries', async () => {
		const { bot, telegram } = await setup(({ method }) =>
			ok(method === 'sendWidget' ? message('') : true),
		);

		await bot.sendWidget(42, '<b>widget</b>', {
			publicData: '{}',
			allowQueries: true,
		});
		await bot.answerWidgetQuery('query', { data: 'pong' });
		await bot.editSharedWidgetData('widget', '', { cacheTime: 5 });

		assert.deepEqual(
			telegram.requests.map(({ method, params }) => [method, params]),
			[
				[
					'sendWidget',
					{
						chat_id: 42,
						html: '<b>widget</b>',
						public_data: '{}',
						allow_queries: true,
					},
				],
				[
					'answerWidgetQuery',
					{ widget_query_id: 'query', data: 'pong' },
				],
				[
					'editSharedWidgetData',
					{ widget_id: 'widget', public_data: '', cache_time: 5 },
				],
			],
		);
	});
});

describe('Key conversion', () => {
	it('converts keys but keeps values as sent by Telegram', async () => {
		const { bot } = await setup(() =>
			ok({
				url: '',
				has_custom_certificate: false,
				pending_update_count: 0,
				allowed_updates: ['message', 'chat_member'],
			}),
		);

		const info = await bot.getWebhookInfo();

		assert.equal(info.hasCustomCertificate, false);
		assert.deepEqual(info.allowedUpdates, ['message', 'chat_member']);
	});
});

describe('Updates', () => {
	it('dispatches webhook updates to typed listeners', async () => {
		const { bot } = await setup(() => ok(true));
		const received: string[] = [];

		bot.on(UpdateType.Message, async (msg, update) => {
			received.push(`${update.updateId}:${msg.text}`);
		});

		await bot.processUpdate(
			Buffer.from(JSON.stringify(updates('a')[0])),
			headers,
		);
		await bot.processUpdate(
			JSON.stringify({ update_id: 2, message: message('b') }),
			new Headers(headers),
		);
		await bot.processUpdate(
			{ update_id: 3, message: message('c') },
			headers,
		);

		assert.deepEqual(received, ['1:a', '2:b', '3:c']);
	});

	it('dispatches multi-word update types', async () => {
		const { bot } = await setup(() => ok(true));
		const received: string[] = [];

		bot.on(UpdateType.CallbackQuery, (query, update) => {
			received.push(`${update.updateId}:${query.data}`);
		});

		await bot.processUpdate(
			{
				update_id: 1,
				callback_query: {
					id: '1',
					from: { id: 42, is_bot: false, first_name: 'Bunny' },
					chat_instance: '1',
					data: 'hop',
				},
			},
			headers,
		);

		assert.deepEqual(received, ['1:hop']);
	});

	it('dispatches widget queries with converted nested keys', async () => {
		const { bot } = await setup(() => ok(true));
		const received: unknown[] = [];

		bot.on(UpdateType.WidgetQuery, (query) => {
			if (query.type.type === 'sign_data') {
				received.push(query.widgetId, query.type.wallet.publicKey);
			}
		});

		await bot.processUpdate(
			{
				update_id: 1,
				widget_query: {
					id: '1',
					from: { id: 42, is_bot: false, first_name: 'Bunny' },
					chat_instance: '1',
					type: {
						type: 'sign_data',
						wallet: {
							address: 'EQ',
							amount: '0',
							public_key: 'ab',
						},
						sign_data: '{}',
					},
					data: 'ping',
					widget_id: 'widget',
				},
			},
			headers,
		);

		assert.deepEqual(received, ['widget', 'ab']);
	});

	it('supports once and off', async () => {
		const { bot } = await setup(() => ok(true));
		let once = 0;
		let on = 0;
		const listener = () => {
			on++;
		};

		bot.once('message', () => {
			once++;
		});
		bot.on('message', listener);
		await bot.processUpdate(updates('a')[0], headers);

		bot.off('message', listener);
		await bot.processUpdate(updates('b')[0], headers);

		assert.equal(once, 1);
		assert.equal(on, 1);
	});

	it('reports listener errors to onError without rejecting', async () => {
		const errors: unknown[] = [];
		const { bot } = await setup(() => ok(true), errors);

		bot.on('message', () => {
			throw new Error('listener failed');
		});
		await bot.processUpdate(updates('a')[0], headers);

		assert.equal(errors.length, 1);
	});

	it('rejects input that is not an update', async () => {
		const { bot } = await setup(() => ok(true));

		await assert.rejects(
			bot.processUpdate('{oops', headers),
			TeleBunnyError,
		);
		await assert.rejects(bot.processUpdate('[]', headers), TeleBunnyError);
	});

	it('rejects updates without the right secret token', async () => {
		const { bot } = await setup(() => ok(true));
		let received = 0;

		bot.on('message', () => {
			received++;
		});

		await assert.rejects(
			bot.processUpdate(updates('a')[0], {}),
			/Invalid webhook secret token/,
		);
		await assert.rejects(
			bot.processUpdate(updates('a')[0], {
				'x-telegram-bot-api-secret-token': 'wrong',
			}),
			/Invalid webhook secret token/,
		);

		assert.equal(received, 0);
	});

	it('rejects updates while the secret is unknown', async () => {
		const telegram = await startFakeTelegram(() => ok(true));
		const unsecured = new TeleBunny(TOKEN, { apiRoot: telegram.apiRoot });

		await assert.rejects(
			unsecured.processUpdate(updates('a')[0], headers),
			/Webhook secret is unknown/,
		);

		await telegram.close();
	});

	it('generates a secret in setWebhook and checks it afterwards', async () => {
		const telegram = await startFakeTelegram(() => ok(true));
		const unsecured = new TeleBunny(TOKEN, { apiRoot: telegram.apiRoot });
		let received = 0;

		unsecured.on('message', () => {
			received++;
		});

		await unsecured.setWebhook('https://example.com/hook');

		const secret = telegram.requests[0].params.secret_token as string;

		assert.match(secret, /^[\w-]{32,}$/);

		await unsecured.processUpdate(updates('a')[0], {
			'x-telegram-bot-api-secret-token': secret,
		});

		assert.equal(received, 1);

		await telegram.close();
	});
});

describe('Polling', () => {
	function pollingHandler(batches: WireUpdate[][]): {
		handler: ApiHandler;
		maxInFlight: () => number;
	} {
		let inFlight = 0;
		let maxInFlight = 0;

		const handler: ApiHandler = async (request, signal) => {
			if (request.method !== 'getUpdates') return ok(true);

			inFlight++;
			maxInFlight = Math.max(maxInFlight, inFlight);

			try {
				const offset =
					(request.params.offset as number | undefined) ?? 0;
				const batch = batches.find(
					(items) => items[0].update_id >= offset,
				);

				if (batch) return ok(batch);

				await hold(1_000, signal);

				return ok([]);
			} finally {
				inFlight--;
			}
		};

		return { handler, maxInFlight: () => maxInFlight };
	}

	it('removes the webhook, handles updates in order and confirms them on stop', async () => {
		const all = updates('a', 'b', 'c');
		const { handler, maxInFlight } = pollingHandler([
			all.slice(0, 2),
			all.slice(2),
		]);
		const { bot, telegram } = await setup(handler);
		const received: string[] = [];
		const done = new Promise<void>((resolve) => {
			bot.on('message', async (msg) => {
				await sleep(10);
				received.push(msg.text ?? '');

				if (received.length === 3) resolve();
			});
		});

		await bot.startPolling({
			timeout: 1,
			allowedUpdates: ['message', 'callback_query'],
		});
		assert.equal(bot.isPolling, true);

		await done;
		await bot.stopPolling();

		const methods = telegram.requests.map((request) => request.method);
		const last = telegram.requests[telegram.requests.length - 1];

		assert.equal(bot.isPolling, false);
		assert.deepEqual(received, ['a', 'b', 'c']);
		assert.equal(maxInFlight(), 1);
		assert.equal(methods[0], 'deleteWebhook');
		assert.deepEqual(telegram.requests[1].params.allowed_updates, [
			'message',
			'callback_query',
		]);
		assert.deepEqual(last.params, { offset: 4, limit: 1, timeout: 0 });
	});

	it('waits for the queue to have room before fetching more updates', async () => {
		const all = updates('a', 'b');
		const { handler } = pollingHandler([all.slice(0, 1), all.slice(1)]);
		const { bot, telegram } = await setup(handler);
		const fetches = () =>
			telegram.requests.filter(
				(request) => request.method === 'getUpdates',
			).length;

		let release!: () => void;
		const blocked = new Promise<void>((resolve) => (release = resolve));
		let started!: () => void;
		const handling = new Promise<void>((resolve) => (started = resolve));

		bot.on('message', async (msg) => {
			if (msg.text === 'a') {
				started();
				await blocked;
			}
		});

		await bot.startPolling({ timeout: 1, queueCapacity: 1 });
		await handling;
		await sleep(50);

		assert.equal(fetches(), 1);

		release();
		await sleep(50);

		assert.ok(fetches() > 1);
	});

	it('retries failed requests and stops on an invalid token', async () => {
		const errors: unknown[] = [];
		let calls = 0;
		const { bot } = await setup((request) => {
			if (request.method !== 'getUpdates') return ok(true);

			return ++calls === 1
				? fail(502, 'Bad Gateway')
				: fail(401, 'Unauthorized');
		}, errors);

		await bot.startPolling({ retryDelay: 10 });

		while (bot.isPolling) await sleep(10);

		assert.equal(calls, 2);
		assert.deepEqual(
			errors.map((error) => (error as TelegramError).code),
			[502, 401],
		);
	});

	it('rejects startPolling when the token is invalid', async () => {
		const { bot } = await setup(() => fail(401, 'Unauthorized'));

		await assert.rejects(bot.startPolling(), { name: 'TelegramError' });
		assert.equal(bot.isPolling, false);
	});
});
