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
