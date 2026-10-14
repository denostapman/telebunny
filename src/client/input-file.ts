import { openAsBlob } from 'node:fs';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

export type InputFileSource =
	string | URL | Uint8Array | Blob | AsyncIterable<Uint8Array>;

/**
 * A file to upload. Plain strings passed to file parameters are sent as
 * file_id or URL; local files and binary data must be wrapped in InputFile.
 *
 * @example
 * await bot.sendPhoto(chatId, new InputFile('./cat.jpg'));
 * await bot.sendDocument(chatId, new InputFile(buffer, 'report.pdf'));
 */
export class InputFile {
	readonly filename: string;
	readonly #source: InputFileSource;

	/**
	 * @param source local path (string or file: URL), binary data, Blob or async iterable stream
	 * @param filename name shown to users, defaults to the path basename
	 */
	constructor(source: InputFileSource, filename?: string) {
		this.#source = source;
		this.filename = filename ?? InputFile.#defaultFilename(source);
	}

	async toBlob(): Promise<Blob> {
		const source = this.#source;

		if (typeof source === 'string' || source instanceof URL) {
			return openAsBlob(source);
		}
		if (source instanceof Blob) return source;
		if (source instanceof Uint8Array) {
			return new Blob([new Uint8Array(source)]);
		}

		const chunks: Uint8Array[] = [];

		for await (const chunk of source) chunks.push(chunk);

		return new Blob([Buffer.concat(chunks)]);
	}

	static #defaultFilename(source: InputFileSource): string {
		if (typeof source === 'string') return basename(source);
		if (source instanceof URL) return basename(fileURLToPath(source));
		if (source instanceof File) return source.name;
		return 'file';
	}
}
