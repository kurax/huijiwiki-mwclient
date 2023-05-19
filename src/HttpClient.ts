import { FormData } from 'formdata-node';
import got, { Got } from 'got';
import fs from 'node:fs';
import { pino } from 'pino';
import { CookieJar } from 'tough-cookie';

import { Action } from './types/action.js';
import { APIResponse, ErrorData } from './types/common.js';
import { ParseProp } from './types/parse/prop.js';
import { QueryGenerator } from './types/query/generator.js';
import { QueryList, QueryListParams, QueryListResult } from './types/query/list.js';
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
    warnings?: ErrorData[];
    errors?: ErrorData[];
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

export interface ParseRequestParams extends MediaWikiRequestParams {
    action: 'parse';
    page?: string;
    pageid?: number;
    oldid?: number;
    revid?: number;
    redirects?: boolean;
    prop?: Multi<ParseProp>;
    wrapoutputclass?: string;
    parsoid?: boolean;
    pst?: boolean;
    onlypst?: boolean;
    section?: number | 'new';
    sectiontitle?: string;
    disablelimitreport?: boolean;
    disableeditsection?: boolean;
    disablestylededuplication?: boolean;
    disabletoc?: boolean;
    mobileformat?: boolean;
    showstrategykeys?: boolean;
    preview?: boolean;
    sectionpreview?: boolean;
}

export interface ParseResponseBody extends MediaWikiResponseBody {
    parse: {
        title: string;
        pageid: number;
    } & Partial<Record<ParseProp, any>>;
}

interface HttpClientOptions {
    logger?: pino.Logger;
    params?: Record<string, any>;
}

export class HttpClient {
    private readonly client: Got;
    private readonly logger: pino.Logger | undefined;
    private token: string | undefined;
    private tokenTime: number | undefined;

    constructor(readonly endpoint: URL, readonly options?: HttpClientOptions) {
        this.logger = options?.logger;
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
            userAgent = `HuijiClient/${packageJson.version} Got/${packageJson.dependencies.got.replace('^', '')}`;
        }
        return userAgent;
    }

    private createSearchParams(params: Record<string, any>) {
        const search = new URLSearchParams();
        const setValue = (key: string, value: any) => {
            const x1f = '\x1f';
            const escapeString = (str: string) => (str.includes('|') ? x1f.concat(str) : str);
            if (value == null) return;
            if (value instanceof Date) search.set(key, value.toISOString());
            else if (Array.isArray(value)) {
                const values = value.map(String);
                if (values.length > 0) search.set(key, values.some(v => v.includes('|')) ? x1f.concat(values.join(x1f)) : values.join('|'));
            } else
                switch (typeof value) {
                    case 'boolean':
                        if (value === true) search.set(key, '');
                        return;
                    case 'string':
                        search.set(key, key === 'continue' ? value : escapeString(value));
                        return;
                    case 'bigint':
                    case 'number':
                        search.set(key, String(value));
                        return;
                }
        };
        if (this.options?.params != null) for (const key in this.options.params) setValue(key, this.options.params[key]);
        for (const key in params) setValue(key, params[key]);
        search.set('format', 'json');
        search.set('formatversion', '2');
        search.set('errorformat', 'plaintext');
        if (!search.has('utf8') && !search.has('ascii')) search.set('utf8', '');
        if (!search.has('uselang')) search.set('uselang', 'en');
        return search;
    }

    private checkWarnings(warnings?: ErrorData[]) {
        if (warnings == null) return;
        for (const warning of warnings) this.logger?.warn(`[${warning.module}] ${warning.code}: ${warning.text}`);
    }

    private checkErrors(errors?: ErrorData[]) {
        if (errors == null) return;
        const message = (Array.isArray(errors) ? errors : [errors]).map(err => `[${err.module}] ${err.code}: ${err.text}`).join('\n');
        this.logger?.error(message);
        throw new Error(message);
    }

    async request<P extends Record<string, any>, R extends APIResponse>(method: 'GET' | 'POST', params?: P): Promise<R> {
        const data = this.createSearchParams(params ?? {});
        if (method === 'GET') this.logger?.info(`${method} ${this.endpoint.toString()}?${data.toString()}`);
        else if (method === 'POST') {
            const body = new URLSearchParams(data);
            for (const key of body.keys()) if (key.toLowerCase().includes('password')) body.set(key, '****');
            this.logger?.info({ body: body.toString() }, `${method} ${this.endpoint.toString()}`);
        }
        const result =
            method === 'GET'
                ? await this.client.get(this.endpoint, { searchParams: data }).json<R>()
                : await this.client.post(this.endpoint, { form: Object.fromEntries(data.entries()) }).json<R>();
        this.checkWarnings(result.warnings);
        this.checkErrors(result.errors);
        return result;
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

    async parse(params: Omit<ParseRequestParams, 'action'>): Promise<ParseResponseBody['parse']> {
        const result = await this.get<ParseRequestParams, ParseResponseBody>({ ...params, action: 'parse' });
        return result.parse;
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

    async queryList<T extends QueryList>(list: T, params: QueryListParams<T>) {
        return await this.query<QueryListResult<T>>({ ...params, list });
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
