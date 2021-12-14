import { fileURLToPath } from 'node:url';

export const getRelativePath = (path: string, baseUrl?: string) => fileURLToPath(new URL(path, baseUrl ?? import.meta.url));
