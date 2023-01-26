import chalk from 'chalk';
import { FormData } from 'formdata-node';
import got, { Got } from 'got';
import fs from 'node:fs';
import { CookieJar } from 'tough-cookie';

import { Action } from './types/action.js';
import { QueryGenerator } from './types/query/generator.js';
import { QueryList } from './types/query/list.js';
import { QueryMeta, QueryMetaParams, QueryMetaResult } from './types/query/meta.js';
import { QueryProp, QueryPropParams, QueryPropResult } from './types/query/prop.js';
import { getRelativePath } from './utils.js';

export type ParamValue = string | number | boolean | Date | MediaWikiContinue | null | undefined;
export type Multi<T1, T2 = T1> = T1 | T2[];
// type RemoveIndex<T> = { [P in keyof T as string extends P ? never : number extends P ? never : P]: T[P] };

export interface MediaWikiError {
    code: string;
    text: string;
    module: string;
}

export interface MediaWikiContinue {
    continue: string;
    [key: string]: string;
}

export interface MediaWikiRequestParams extends Record<string, ParamValue | ParamValue[]> {
    action: Action;
    format?: never;
    formatversion?: never;
    errorformat?: never;
}

export interface MediaWikiResponseBody {
    warnings?: MediaWikiError[];
    errors?: MediaWikiError[];
    docref?: string;
}

export interface QueryRequestParams extends MediaWikiRequestParams {
    action: 'query';
    prop?: QueryProp;
    list?: QueryList;
    meta?: QueryMeta;
    generator?: QueryGenerator;
    titles?: string | string[];
    pageids?: number | number[];
    revids?: number | number[];
    indexpageids?: boolean;
    export?: boolean;
    exportnowrap?: boolean;
    exportschema?: '0.10' | '0.11';
    iwurl?: boolean;
    continue?: MediaWikiContinue;
    rawcontinue?: boolean;
    redirects?: boolean;
    converttitles?: boolean;
}

export interface QueryResponseBody<T> extends MediaWikiResponseBody {
    batchcomplete: boolean | string;
    continue?: MediaWikiContinue;
    query: T;
}

export class HttpClient {
    private readonly client: Got;
    private token: string | undefined;
    private tokenTime: number | undefined;

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

    private createSearchParams(params: Record<string, ParamValue | ParamValue[]>) {
        const search = new URLSearchParams();
        const convert = (value: ParamValue) => {
            if (typeof value === 'boolean') return '';
            if (value instanceof Date) return value.toISOString();
            return String(value);
        };
        for (const key in params) {
            const value = params[key];
            if (value == null || (typeof value === 'boolean' && value === false)) continue;
            if (typeof value === 'object' && 'continue' in value) {
                for (const key in value) search.set(key, this.toValues(convert(value[key])));
                continue;
            }
            search.set(key, this.toValues(Array.isArray(value) ? value.map(convert) : convert(value)));
        }
        search.set('format', 'json');
        search.set('formatversion', '2');
        search.set('errorformat', 'plaintext');
        return search;
    }

    private checkWarnings(warnings?: MediaWikiError[]) {
        if (warnings == null) return;
        for (const warning of warnings) console.warn(chalk.yellow(`[${warning.module}] ${warning.code}: ${warning.text}`));
    }

    private checkErrors(errors?: MediaWikiError[]) {
        if (errors == null) return;
        const message = (Array.isArray(errors) ? errors : [errors]).map(err => `[${err.module}] ${err.code}: ${err.text}`).join('\n');
        throw new Error(message);
    }

    async get<T extends MediaWikiRequestParams = MediaWikiRequestParams, R extends MediaWikiResponseBody = MediaWikiResponseBody>(params: T): Promise<R> {
        const result = await this.client.get(this.endpoint, { searchParams: this.createSearchParams(params) }).json<R>();
        this.checkWarnings(result.warnings);
        this.checkErrors(result.errors);
        return result;
    }

    async post<T extends MediaWikiRequestParams = MediaWikiRequestParams, R extends MediaWikiResponseBody = MediaWikiResponseBody>(params: T): Promise<R> {
        const result = await this.client.post(this.endpoint, { form: Object.fromEntries(this.createSearchParams(params).entries()) }).json<R>();
        this.checkWarnings(result.warnings);
        this.checkErrors(result.errors);
        return result;
    }

    async postFormData<R extends MediaWikiResponseBody = MediaWikiResponseBody>(body: FormData): Promise<R> {
        body.set('format', 'json');
        body.set('formatversion', '2');
        body.set('errorformat', 'plaintext');
        const result = await this.client.post(this.endpoint, { body }).json<R>();
        this.checkWarnings(result.warnings);
        this.checkErrors(result.errors);
        return result;
    }

    async query<T>(params: Omit<QueryRequestParams, 'action'>, continueProp?: string): Promise<T> {
        const result = await this.get<QueryRequestParams, QueryResponseBody<T>>({ ...params, action: 'query' });
        while (continueProp != null && result.continue != null) {
            // TODO: Implement continue
            break;
        }
        return result.query;
    }

    async queryProp<T extends QueryProp>(prop: T, params: QueryPropParams<T>) {
        return await this.query<QueryPropResult<T>>({ ...params, prop });
    }

    async queryMeta<T extends QueryMeta>(meta: T, params: QueryMetaParams<T>) {
        return (await this.query<QueryMetaResult<T>>({ ...params, meta }))[meta];
    }

    async getToken() {
        if (this.token == null || Date.now() - (this.tokenTime ?? 0) >= 1000 * 60 * 5) {
            this.token = (await this.queryMeta('tokens', { type: 'csrf' })).csrftoken;
            this.tokenTime = Date.now();
        }
        return this.token as string;
    }
}
