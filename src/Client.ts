import assert from 'node:assert';

import { EditParams, EditResult } from './types/edit.js';
import { LoginParams, LoginResult } from './types/login.js';
import { QueryMeta, QueryMetaParams, QueryMetaResult } from './types/query/meta.js';
import { TokenType } from './types/query/meta/tokens.js';
import { HttpClient } from './HttpClient.js';

type Multi<T, A = T> = T | A[];

export interface ClientOptions {
    host: string;
    protocol?: 'http' | 'https';
    apiPath?: string;
    // restApi?: {
    //     path?: string;
    //     version?: 'v1';
    // };
}

export interface EditPageOptions {
    summary?: string;
    minor?: boolean;
    notMinor?: boolean;
    bot?: boolean;
    recreate?: boolean;
    createOnly?: boolean;
    noCreate?: boolean;
}

export class Client {
    private readonly httpClient: HttpClient;
    private editToken: string | undefined;

    constructor(readonly options: ClientOptions) {
        const protocol = options.protocol === 'http' ? 'http' : 'https';
        const siteUrl = `${protocol}://${options.host}`;
        this.httpClient = new HttpClient(new URL(options.apiPath ?? '/w/api.php', siteUrl));
    }

    private async queryMeta<T extends QueryMeta>(meta: T, params: QueryMetaParams[T]): Promise<QueryMetaResult[T]> {
        return (await this.httpClient.query<any>({ ...params, meta }))[meta];
    }

    async requestToken(type: Multi<TokenType, Exclude<TokenType, '*'>>) {
        return await this.queryMeta('tokens', { type });
    }

    async login(name: string, password: string, domain?: string): Promise<{ id: number; name: string }> {
        const token = (await this.requestToken('login')).logintoken;
        assert(token != null, 'Failed to get login token');

        const result = (
            await this.httpClient.post<LoginParams, LoginResult>({
                action: 'login',
                lgname: name,
                lgpassword: password,
                lgdomain: domain,
                lgtoken: token
            })
        ).login;
        assert(result != null, 'Failed to login');

        if (result.result === 'Success') return { id: result.lguserid, name: result.lgusername };
        if (result.reason != null) throw new Error(result.reason.text ?? '');
        throw new Error(result.result);
    }

    async logout() {
        const token = (await this.requestToken('csrf')).csrftoken;
        assert(token != null, 'Failed to get csrf token');
        await this.httpClient.post({ action: 'logout', token });
        this.editToken = undefined;
    }

    async editPage(page: string | number, text: string, options?: EditPageOptions): Promise<EditResult['edit']> {
        this.editToken = this.editToken ?? (await this.requestToken('csrf')).csrftoken;
        assert(this.editToken != null, 'Failed to get csrf token');

        const title = typeof page === 'string' ? { title: page } : { pageid: page };
        return (
            await this.httpClient.post<EditParams, EditResult>({
                action: 'edit',
                ...title,
                text,
                summary: options?.summary,
                minor: options?.minor,
                notminor: options?.notMinor,
                bot: options?.bot,
                recreate: options?.recreate,
                createonly: options?.createOnly,
                nocreate: options?.noCreate,
                token: this.editToken
            })
        ).edit;
    }
}
