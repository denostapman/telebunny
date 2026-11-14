export interface UpdateQueueOptions<T> {
	concurrency?: number;
	capacity?: number;
	key?: (item: T) => unknown;
}

interface Entry<T> {
	item: T;
	key: unknown;
}

interface Waiter {
	ready: () => boolean;
	resolve: () => void;
}

export class UpdateQueue<T> {
	readonly #worker: (item: T) => Promise<void>;
	readonly #concurrency: number;
	readonly #capacity: number;
	readonly #key?: (item: T) => unknown;
	readonly #pending: Entry<T>[] = [];
	readonly #activeKeys = new Set<unknown>();
	#active = 0;
	#waiters: Waiter[] = [];

	constructor(
		worker: (item: T) => Promise<void>,
		options: UpdateQueueOptions<T> = {},
	) {
		this.#worker = worker;
		this.#concurrency = Math.max(1, options.concurrency ?? 1);
		this.#capacity = Math.max(1, options.capacity ?? 100);
		this.#key = options.key;
	}

	get size(): number {
		return this.#pending.length + this.#active;
	}

	push(...items: T[]): void {
		for (const item of items) {
			this.#pending.push({ item, key: this.#key?.(item) });
		}

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
		for (
			let i = 0;
			i < this.#pending.length && this.#active < this.#concurrency;
		) {
			const { item, key } = this.#pending[i];

			if (key !== undefined && this.#activeKeys.has(key)) {
				i++;
				continue;
			}

			this.#pending.splice(i, 1);
			this.#active++;
			if (key !== undefined) this.#activeKeys.add(key);

			void this.#worker(item).finally(() => {
				this.#active--;
				if (key !== undefined) this.#activeKeys.delete(key);
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
