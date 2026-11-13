export type CamelCase<S extends string> =
	S extends `${infer Head}_${infer Tail}`
		? `${Head}${Capitalize<CamelCase<Tail>>}`
		: S;

export const toCamel = <S extends string>(key: S) =>
	key.replace(/_([a-z0-9])/g, (_, char: string) =>
		char.toUpperCase(),
	) as CamelCase<S>;

const toSnake = (key: string) =>
	key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);

const MAX_CACHED_KEYS = 2048;
const camelCache = new Map<string, string>();
const snakeCache = new Map<string, string>();

function cachedKey(
	cache: Map<string, string>,
	key: string,
	convert: (key: string) => string,
): string {
	let result = cache.get(key);

	if (result === undefined) {
		result = convert(key);
		if (cache.size < MAX_CACHED_KEYS) cache.set(key, result);
	}

	return result;
}

export const camelKey = (key: string): string =>
	key.includes('_') ? cachedKey(camelCache, key, toCamel) : key;

export const snakeKey = (key: string): string =>
	/[A-Z]/.test(key) ? cachedKey(snakeCache, key, toSnake) : key;

export function isPlainObject(
	value: unknown,
): value is Record<string, unknown> {
	if (typeof value !== 'object' || value === null) return false;

	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
}

function camelValue(value: unknown): unknown {
	if (typeof value !== 'object' || value === null) return value;

	if (Array.isArray(value)) {
		const result = new Array<unknown>(value.length);

		for (let i = 0; i < value.length; i++) {
			result[i] = camelValue(value[i]);
		}

		return result;
	}

	if (!isPlainObject(value)) return value;

	const result: Record<string, unknown> = {};

	for (const key in value) {
		result[camelKey(key)] = camelValue(value[key]);
	}

	return result;
}

export function camelKeys<T>(value: unknown): T {
	return camelValue(value) as T;
}
