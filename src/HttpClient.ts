import got, { Got } from 'got';
import fs from 'node:fs';
import { CookieJar } from 'tough-cookie';

import { Action } from './types/action.js';
import { getRelativePath } from './utils.js';

type Primitive = string | number | boolean | null | undefined;

export interface MediaWikiError {
    code: string;
    text: string;
    module: string;
}

export interface MediaWikiRequestParams {
    action: Action;
    format?: never;
    formatversion?: never;
    errorformat?: never;
    [key: string]: Primitive | Primitive[];
}

export interface MediaWikiResponseBody {
    warnings?: MediaWikiError[];
    errors?: MediaWikiError[];
    docref?: string;
}

interface QueryResponseBody<T> extends MediaWikiResponseBody {
    batchcomplete: boolean | string;
    query: T;
}

export class HttpClient {
    private readonly client: Got;

    constructor(readonly endpoint: URL) {
        this.client = got.extend({
            cookieJar: new CookieJar(),
            headers: { 'User-Agent': this.getUserAgent() }
        });
    }

    private getUserAgent() {
        let userAgent = 'HuijiMWClient/Unknown';
        const path = getRelativePath('../package.json', import.meta.url);
        if (fs.existsSync(path)) {
            const packageJson = JSON.parse(fs.readFileSync(path).toString());
            userAgent = `HuijiMWClient/${packageJson.version} Got/${packageJson.dependencies.got.replace('^', '')}`;
        }
        return userAgent;
    }

    private toValues<T>(values: T | T[]) {
        if (Array.isArray(values)) {
            const strings = values.map(String);
            if (strings.some(value => value.includes('|'))) return '\x1f'.concat(strings.join('\x1f'));
            return strings.join('|');
        }
        const value = String(values);
        if (value.includes('|')) return '\x1f'.concat(value);
        return value;
    }

    private createSearchParams(params: MediaWikiRequestParams) {
        const search = new URLSearchParams();
        for (const key in params) {
            const value = params[key];
            if (value != null && !(typeof value === 'boolean' && value === false)) search.set(key, this.toValues(value));
        }
        search.set('format', 'json');
        search.set('formatversion', '2');
        search.set('errorformat', 'plaintext');
        return search;
    }

    private checkErrors(errors?: MediaWikiError[]) {
        if (errors == null) return;
        const message = (Array.isArray(errors) ? errors : [errors]).map(err => `[${err.module}] ${err.code}: ${err.text}`).join('\n');
        throw new Error(message);
    }

    async get<T extends MediaWikiRequestParams = MediaWikiRequestParams, R extends MediaWikiResponseBody = MediaWikiResponseBody>(params: T): Promise<R> {
        const result = await this.client.get(this.endpoint, { searchParams: this.createSearchParams(params) }).json<R>();
        this.checkErrors(result.errors);
        return result;
    }

    async post<T extends MediaWikiRequestParams = MediaWikiRequestParams, R extends MediaWikiResponseBody = MediaWikiResponseBody>(params: T): Promise<R> {
        const result = await this.client.post(this.endpoint, { form: Object.fromEntries(this.createSearchParams(params).entries()) }).json<R>();
        this.checkErrors(result.errors);
        return result;
    }

    async query<T>(params: MediaWikiRequestParams): Promise<T> {
        const result = await this.get<MediaWikiRequestParams, QueryResponseBody<T>>({ ...params, action: 'query' });
        return result.query;
    }
}
