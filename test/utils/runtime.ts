import { describe, it } from 'node:test';

export const onNode = !('Bun' in globalThis) && !('Deno' in globalThis);

export const nodeIt = onNode ? it : it.skip;

export const nodeDescribe = onNode ? describe : describe.skip;

export const fetchRuntimeIt = onNode ? it.skip : it;
