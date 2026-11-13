import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { camelKey, camelKeys, snakeKey } from '../src/client/case.ts';
import { deepFreeze } from './utils/freeze.ts';

describe('Key case', () => {
	it('converts single keys in both directions', () => {
		assert.equal(camelKey('chat_id'), 'chatId');
		assert.equal(
			camelKey('can_send_other_messages'),
			'canSendOtherMessages',
		);
		assert.equal(camelKey('photo_640x'), 'photo640x');
		assert.equal(camelKey('text'), 'text');
		assert.equal(snakeKey('chatId'), 'chat_id');
		assert.equal(
			snakeKey('canSendOtherMessages'),
			'can_send_other_messages',
		);
		assert.equal(snakeKey('text'), 'text');
	});

	it('returns the same result for cached keys', () => {
		assert.equal(camelKey('reply_markup'), camelKey('reply_markup'));
		assert.equal(snakeKey('replyMarkup'), 'reply_markup');
		assert.equal(snakeKey('replyMarkup'), 'reply_markup');
	});

	it('keeps converting keys after the cache is full', () => {
		for (let i = 0; i < 5_000; i++) {
			assert.equal(camelKey(`key_${i}_x`), `key${i}X`);
			assert.equal(snakeKey(`key${i}X`), `key${i}_x`);
		}
	});
});

describe('camelKeys', () => {
	it('converts nested objects and arrays but not values', () => {
		assert.deepEqual(
			camelKeys({
				update_id: 1,
				message: {
					message_id: 2,
					entities: [{ type: 'bot_command', offset: 0 }],
					reply_markup: {
						inline_keyboard: [
							[{ text: 'a', callback_data: 'b_c' }],
						],
					},
				},
				allowed_updates: ['chat_member'],
			}),
			{
				updateId: 1,
				message: {
					messageId: 2,
					entities: [{ type: 'bot_command', offset: 0 }],
					replyMarkup: {
						inlineKeyboard: [[{ text: 'a', callbackData: 'b_c' }]],
					},
				},
				allowedUpdates: ['chat_member'],
			},
		);
	});

	it('passes primitives and null through', () => {
		assert.equal(camelKeys(true), true);
		assert.equal(camelKeys(5), 5);
		assert.equal(camelKeys('a_b'), 'a_b');
		assert.equal(camelKeys(null), null);
		assert.equal(camelKeys(undefined), undefined);
	});

	it('does not mutate its input', () => {
		const input = deepFreeze({
			update_id: 1,
			message: { photo: [{ file_id: 'a' }, { file_id: 'b' }] },
		});

		assert.deepEqual(camelKeys(input), {
			updateId: 1,
			message: { photo: [{ fileId: 'a' }, { fileId: 'b' }] },
		});
	});

	it('keeps non-plain objects as they are', () => {
		const date = new Date(0);
		const result = camelKeys<{ someDate: Date }>({ some_date: date });

		assert.equal(result.someDate, date);
	});
});
