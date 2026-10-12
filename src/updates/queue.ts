export interface UpdateQueueOptions {
	concurrency?: number;
	capacity?: number;
}

interface Waiter {
	ready: () => boolean;
	resolve: () => void;
}

export class UpdateQueue<T> {
	readonly #worker: (item: T) => Promise<void>;
	readonly #concurrency: number;
	readonly #capacity: number;
	readonly #items: T[] = [];
	#active = 0;
	#waiters: Waiter[] = [];

	constructor(
		worker: (item: T) => Promise<void>,
		options: UpdateQueueOptions = {},
	) {
		this.#worker = worker;
		this.#concurrency = Math.max(1, options.concurrency ?? 1);
		this.#capacity = Math.max(1, options.capacity ?? 100);
	}

	get size(): number {
		return this.#items.length + this.#active;
	}

	push(...items: T[]): void {
		this.#items.push(...items);
		this.#drain();
	}

	whenReady(): Promise<void> {
		return this.#wait(() => this.size < this.#capacity);
	}

	whenIdle(): Promise<void> {
		return this.#wait(() => this.size === 0);
	}

	#wait(ready: () => boolean): Promise<void> {
		if (ready()) return Promise.resolve();

		return new Promise((resolve) => this.#waiters.push({ ready, resolve }));
	}

	#drain(): void {
		while (this.#active < this.#concurrency && this.#items.length > 0) {
			const item = this.#items.shift() as T;

			this.#active++;

			void this.#worker(item).finally(() => {
				this.#active--;
				this.#drain();
				this.#notify();
			});
		}
	}

	#notify(): void {
		const waiting: Waiter[] = [];

		for (const waiter of this.#waiters) {
			if (waiter.ready()) waiter.resolve();
			else waiting.push(waiter);
		}

		this.#waiters = waiting;
	}
}
