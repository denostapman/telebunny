type KeyMapper = (key: string) => string;

export type CamelCase<S extends string> =
	S extends `${infer Head}_${infer Tail}`
		? `${Head}${Capitalize<CamelCase<Tail>>}`
		: S;

export const toCamel = <S extends string>(key: S) =>
	key.replace(/_([a-z0-9])/g, (_, char: string) =>
		char.toUpperCase(),
	) as CamelCase<S>;

const toSnake: KeyMapper = (key) =>
	key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);

export function isPlainObject(
	value: unknown,
): value is Record<string, unknown> {
	if (typeof value !== 'object' || value === null) return false;

	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
}

function convertKeys(value: unknown, mapKey: KeyMapper): unknown {
	if (Array.isArray(value)) {
		return value.map((item) => convertKeys(item, mapKey));
	}
	if (!isPlainObject(value)) return value;

	return Object.fromEntries(
		Object.entries(value).map(([key, item]) => [
			mapKey(key),
			convertKeys(item, mapKey),
		]),
	);
}

export function snakeKeys(value: unknown): unknown {
	return convertKeys(value, toSnake);
}

export function camelKeys<T>(value: unknown): T {
	return convertKeys(value, toCamel) as T;
}
