import { setTimeout as sleep } from 'node:timers/promises';

import type { TelegramApi } from '../client/api.ts';
import { TelegramError } from '../errors.ts';
import { UpdateQueue } from './queue.ts';
import type { Update, UpdateType } from '../telegram/index.ts';

export interface PollingOptions {
	/** Long polling timeout in seconds. Telegram holds the request open until updates arrive. */
	timeout?: number;
	/** Updates fetched per request, 1-100. */
	limit?: number;
	/** Update types to receive. Telegram keeps the previous setting when omitted. */
	allowedUpdates?: UpdateType[];
	dropPendingUpdates?: boolean;
	/** Updates handled at the same time. 1 keeps them strictly ordered. */
	concurrency?: number;
	/** Queued updates after which polling pauses until handlers catch up. */
	queueCapacity?: number;
	/** First delay in milliseconds before retrying a failed request, doubled on every failure. */
	retryDelay?: number;
	/** Upper bound for the retry delay in milliseconds. */
	maxRetryDelay?: number;
}

const FATAL_ERROR_CODES = new Set([401, 404]);

export class Poller {
	readonly #api: TelegramApi;
	readonly #onError: (error: unknown) => void;
	readonly #queue: UpdateQueue<Update>;
	readonly #timeout: number;
	readonly #limit: number;
	readonly #allowedUpdates?: UpdateType[];
	readonly #dropPendingUpdates: boolean;
	readonly #retryDelay: number;
	readonly #maxRetryDelay: number;
	#controller?: AbortController;
	#loop?: Promise<void>;

	constructor(
		api: TelegramApi,
		handle: (update: Update) => Promise<void>,
		onError: (error: unknown) => void,
		options: PollingOptions = {},
	) {
		this.#api = api;
		this.#onError = onError;
		this.#timeout = Math.max(0, options.timeout ?? 30);
		this.#limit = Math.min(100, Math.max(1, options.limit ?? 100));
		this.#allowedUpdates = options.allowedUpdates;
		this.#dropPendingUpdates = options.dropPendingUpdates ?? false;
		this.#retryDelay = Math.max(1, options.retryDelay ?? 1_000);
		this.#maxRetryDelay = Math.max(
			this.#retryDelay,
			options.maxRetryDelay ?? 60_000,
		);

		this.#queue = new UpdateQueue(
			async (update) => {
				try {
					await handle(update);
				} catch (error) {
					this.#onError(error);
				}
			},
			{
				concurrency: options.concurrency,
				capacity: options.queueCapacity ?? this.#limit,
			},
		);
	}

	get running(): boolean {
		return this.#loop !== undefined;
	}

	async start(): Promise<void> {
		if (this.#loop) return;

		const controller = new AbortController();
		const started = this.#api.call(
			'deleteWebhook',
			{ drop_pending_updates: this.#dropPendingUpdates },
			{ signal: controller.signal },
		);

		this.#controller = controller;
		this.#loop = started
			.then(
				() => this.#run(controller.signal),
				() => {},
			)
			.finally(() => {
				if (this.#controller !== controller) return;
				this.#controller = undefined;
				this.#loop = undefined;
			});

		try {
			await started;
		} catch (error) {
			if (!controller.signal.aborted) throw error;
		}
	}

	async stop(): Promise<void> {
		this.#controller?.abort();
		await this.#loop;
	}

	async #run(signal: AbortSignal): Promise<void> {
		let offset: number | undefined;
		let delay = this.#retryDelay;

		while (!signal.aborted) {
			let updates: Update[];

			try {
				updates = await this.#api.call(
					'getUpdates',
					{
						offset,
						limit: this.#limit,
						timeout: this.#timeout,
						allowed_updates: this.#allowedUpdates,
					},
					{ signal, timeout: (this.#timeout + 30) * 1_000 },
				);
			} catch (error) {
				if (signal.aborted) break;

				this.#onError(error);

				if (
					error instanceof TelegramError &&
					FATAL_ERROR_CODES.has(error.code)
				) {
					break;
				}

				await sleep(delay, undefined, { signal }).catch(() => {});
				delay = Math.min(delay * 2, this.#maxRetryDelay);
				continue;
			}

			delay = this.#retryDelay;

			if (updates.length > 0) {
				offset = updates[updates.length - 1].update_id + 1;
				this.#queue.push(...updates);
			}

			await this.#queue.whenReady();
		}

		await this.#queue.whenIdle();

		if (offset !== undefined) {
			await this.#api
				.call('getUpdates', { offset, limit: 1, timeout: 0 })
				.catch(this.#onError);
		}
	}
}
