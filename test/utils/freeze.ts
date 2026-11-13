export function deepFreeze<T>(value: T): T {
	if (typeof value === 'object' && value !== null) {
		for (const item of Object.values(value)) deepFreeze(item);
		Object.freeze(value);
	}

	return value;
}
