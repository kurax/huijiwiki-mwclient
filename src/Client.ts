import assert from 'node:assert';

import { LoginParams, LoginResult } from './types/login.js';
import { HttpClient } from './HttpClient.js';
import { Page } from './Page.js';

export interface ClientOptions {
    host: string;
    protocol?: 'http' | 'https';
    apiPath?: string;
    // restApi?: {
    //     path?: string;
    //     version?: 'v1';
    // };
}

export class Client {
    private readonly httpClient: HttpClient;

    constructor(options: ClientOptions) {
        const protocol = options.protocol === 'http' ? 'http' : 'https';
        const siteUrl = `${protocol}://${options.host}`;
        this.httpClient = new HttpClient(new URL(options.apiPath ?? '/w/api.php', siteUrl));
    }

    async login(name: string, password: string): Promise<{ id: number; name: string }> {
        const token = (await this.httpClient.queryMeta('tokens', { type: 'login' })).logintoken;
        assert(token != null, 'Failed to get login token');

        const result = (await this.httpClient.post<LoginParams, LoginResult>({ action: 'login', lgname: name, lgpassword: password, lgtoken: token })).login;
        assert(result != null, 'Failed to login');

        if (result.result === 'Success') return { id: result.lguserid, name: result.lgusername };
        if (result.reason != null) throw new Error(result.reason.text ?? '');
        throw new Error(result.result);
    }

    async logout() {
        const token = (await this.httpClient.queryMeta('tokens', { type: 'csrf' })).csrftoken;
        assert(token != null, 'Failed to get csrf token');
        await this.httpClient.post({ action: 'logout', token });
    }

    page(title: string | number) {
        return typeof title === 'number' ? new Page(this.httpClient, title, 'pageid') : new Page(this.httpClient, String(title), 'title');
    }
}
