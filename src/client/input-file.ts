import { openAsBlob } from 'node:fs';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

export type InputFileSource =
	string | URL | Uint8Array | Blob | AsyncIterable<Uint8Array>;

let sourceOf: (file: InputFile) => InputFileSource;

/**
 * A file to upload. Plain strings passed to file parameters are sent as
 * file_id or URL; local files and binary data must be wrapped in InputFile.
 *
 * @example
 * await bot.sendPhoto(new InputFile('./cat.jpg'), { chatId });
 * await bot.sendDocument(new InputFile(buffer, 'report.pdf'), { chatId });
 */
export class InputFile {
	readonly filename: string;
	readonly #source: InputFileSource;

	static {
		sourceOf = (file) => file.#source;
	}

	/**
	 * @param source local path (string or file: URL), binary data, Blob or async iterable stream
	 * @param filename name shown to users, defaults to the path basename
	 */
	constructor(source: InputFileSource, filename?: string) {
		this.#source = source;
		this.filename = filename ?? InputFile.#defaultFilename(source);
	}

	async toBlob(): Promise<Blob> {
		const data = await readInputFile(this);

		return data instanceof Blob ? data : new Blob([new Uint8Array(data)]);
	}

	static #defaultFilename(source: InputFileSource): string {
		if (typeof source === 'string') return basename(source);
		if (source instanceof URL) return basename(fileURLToPath(source));
		if (source instanceof File) return source.name;
		return 'file';
	}
}

export async function readInputFile(
	file: InputFile,
): Promise<Uint8Array | Blob> {
	const source = sourceOf(file);

	if (typeof source === 'string' || source instanceof URL) {
		return openAsBlob(source);
	}
	if (source instanceof Uint8Array || source instanceof Blob) return source;

	const chunks: Uint8Array[] = [];

	for await (const chunk of source) chunks.push(chunk);

	return Buffer.concat(chunks);
}
