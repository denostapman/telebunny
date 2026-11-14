import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { UpdateQueue } from '../src/updates/queue.ts';

const tick = (ms = 5) =>
	new Promise<void>((resolve) => setTimeout(resolve, ms));

describe('UpdateQueue', () => {
	it('processes items in order one at a time by default', async () => {
		const log: string[] = [];
		const queue = new UpdateQueue<number>(async (item) => {
			log.push(`start ${item}`);
			await tick();
			log.push(`end ${item}`);
		});

		queue.push(1, 2);
		await queue.whenIdle();

		assert.deepEqual(log, ['start 1', 'end 1', 'start 2', 'end 2']);
	});

	it('limits concurrency', async () => {
		let active = 0;
		let peak = 0;
		const queue = new UpdateQueue<number>(
			async () => {
				peak = Math.max(peak, ++active);
				await tick();
				active--;
			},
			{ concurrency: 2 },
		);

		queue.push(1, 2, 3, 4, 5);
		await queue.whenIdle();

		assert.equal(peak, 2);
	});

	it('signals when there is room below capacity', async () => {
		const queue = new UpdateQueue<number>(() => tick(20), { capacity: 2 });

		queue.push(1, 2, 3);

		let ready = false;
		const waiting = queue.whenReady().then(() => (ready = true));

		await tick();
		assert.equal(ready, false);

		await waiting;
		assert.ok(queue.size < 2);
	});
});

describe('UpdateQueue with keys', () => {
	interface Item {
		id: string;
		key?: string;
	}

	function tracked(options: { concurrency?: number } = {}) {
		const log: string[] = [];
		let active = 0;
		let peak = 0;
		const queue = new UpdateQueue<Item>(
			async ({ id }) => {
				peak = Math.max(peak, ++active);
				log.push(`start ${id}`);
				await tick();
				log.push(`end ${id}`);
				active--;
			},
			{ concurrency: options.concurrency ?? 10, key: (item) => item.key },
		);

		return { queue, log, peak: () => peak };
	}

	it('runs items with the same key one after another in order', async () => {
		const { queue, log, peak } = tracked();

		queue.push({ id: 'a1', key: 'a' }, { id: 'a2', key: 'a' });
		await queue.whenIdle();

		assert.deepEqual(log, ['start a1', 'end a1', 'start a2', 'end a2']);
		assert.equal(peak(), 1);
	});

	it('runs items with different keys in parallel', async () => {
		const { queue, peak } = tracked();

		queue.push({ id: 'a1', key: 'a' }, { id: 'b1', key: 'b' });
		await queue.whenIdle();

		assert.equal(peak(), 2);
	});

	it('runs items without a key in parallel', async () => {
		const { queue, peak } = tracked();

		queue.push({ id: 'x' }, { id: 'y' }, { id: 'z' });
		await queue.whenIdle();

		assert.equal(peak(), 3);
	});

	it('does not block other keys behind a busy key', async () => {
		const { queue, log } = tracked();

		queue.push(
			{ id: 'a1', key: 'a' },
			{ id: 'a2', key: 'a' },
			{ id: 'b1', key: 'b' },
		);
		await queue.whenIdle();

		assert.ok(log.indexOf('start b1') < log.indexOf('end a1'));
		assert.ok(log.indexOf('start a2') > log.indexOf('end a1'));
	});

	it('still limits concurrency across keys', async () => {
		const { queue, peak } = tracked({ concurrency: 2 });

		queue.push(
			{ id: 'a1', key: 'a' },
			{ id: 'b1', key: 'b' },
			{ id: 'c1', key: 'c' },
			{ id: 'd1' },
		);
		await queue.whenIdle();

		assert.equal(peak(), 2);
	});
});
