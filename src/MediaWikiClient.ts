import { pino } from 'pino';

import { APIParameters, Multi, Nullable } from './types/common.js';
import { HttpClient } from './HttpClient.js';

import type {
    LoginParameters,
    LoginResponse,
    QueryGenerator,
    QueryGeneratorParameters,
    QueryGeneratorParams,
    QueryGeneratorProps,
    QueryGeneratorResponse,
    QueryList,
    QueryListParameters,
    QueryListParams,
    QueryListProps,
    QueryListResponse,
    QueryMeta,
    QueryMetaParameters,
    QueryMetaParams,
    QueryMetaProps,
    QueryMetaResponse,
    QueryParameters,
    QueryProp,
    QueryPropParameters,
    QueryPropParams,
    QueryPropProps,
    QueryPropResponse,
    QueryResponse
} from './types/mediawiki.js';

type QueryRequestFunc = <T, R>(params: T) => Promise<QueryResponse<R>>;
type Pages = Multi<string> | Multi<number>;

const parsePages = (pages?: Pages) => {
    if (typeof pages === 'string') return { titles: pages };
    if (typeof pages === 'number') return { pageids: pages };
    if (Array.isArray(pages) && pages.length > 0) {
        if (typeof pages[0] === 'string') return { titles: (pages as string[]).filter(p => typeof p === 'string') };
        if (typeof pages[0] === 'number') return { pageids: (pages as number[]).filter(p => typeof p === 'number') };
    }
    return {};
};

class MediaWikiQueryMetaClient {
    readonly #request: QueryRequestFunc;

    constructor(request: QueryRequestFunc) {
        this.#request = request;
    }

    #call = <T extends QueryMeta>(meta: T, params?: QueryMetaParams<T>) =>
        this.#request<QueryMetaParameters<T>, QueryMetaResponse<T, QueryMetaProps<T>>>(Object.assign({}, params, { meta }));

    /** Return messages from this site. */
    allMessages = (params?: QueryMetaParams<'allmessages'>) => this.#call('allmessages', params);

    /** Retrieve information about the current authentication status. */
    authManagerInfo = (params?: QueryMetaParams<'authmanagerinfo'>) => this.#call('authmanagerinfo', params);

    /** Return meta information about image repositories configured on the wiki. */
    fileRepoInfo = (prop: QueryMetaProps<'filerepoinfo'>) => this.#call('filerepoinfo', { friprop: prop });

    /** Return information about available languages. */
    languageInfo = (prop: QueryMetaProps<'languageinfo'>, params?: Omit<QueryMetaParams<'languageinfo'>, 'liprop'>) =>
        this.#call('languageinfo', { ...params, liprop: prop });

    /** Return general information about the site. */
    siteInfo = (prop: QueryMetaProps<'siteinfo'>, params?: Omit<QueryMetaParams<'siteinfo'>, 'siprop'>) => this.#call('siteinfo', { ...params, siprop: prop });

    /** Gets tokens for data-modifying actions. */
    tokens = (type: QueryMetaProps<'tokens'>) => this.#call('tokens', { type });

    /** Get information about the current user. */
    userInfo = (prop: QueryMetaProps<'userinfo'>, params?: Omit<QueryMetaParams<'userinfo'>, 'uiprop'>) => this.#call('userinfo', { ...params, uiprop: prop });
}

class MediaWikiQueryPropClient {
    readonly #request: QueryRequestFunc;

    constructor(request: QueryRequestFunc) {
        this.#request = request;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    #call = <T extends QueryProp, P extends QueryPropProps<T>>(prop: T, pages?: Pages, params?: QueryPropParams<T>, _prop?: P) =>
        this.#request<QueryPropParameters<T>, QueryPropResponse<T, P>>(Object.assign({}, params, { prop }, parsePages(pages)));

    /** List all categories the pages belong to. */
    categories = <P extends QueryPropProps<'categories'>>(pages: Pages, prop?: P, params?: Omit<QueryPropParams<'categories'>, 'clprop'>) =>
        this.#call('categories', pages, { ...params, clprop: prop }, prop);

    /** Returns information about the given categories. */
    categoryInfo = (pages: Pages) => this.#call('categoryinfo', pages);

    /** Get the list of logged-in contributors and the count of anonymous contributors to a page. */
    contributors = (pages: Pages, params?: QueryPropParams<'contributors'>) => this.#call('contributors', pages, params);

    /** Get deleted revision information. */
    deletedRevisions = <P extends QueryPropProps<'deletedrevisions'>>(pages: Pages, prop?: P, params?: Omit<QueryPropParams<'deletedrevisions'>, 'drvprop'>) =>
        this.#call('deletedrevisions', pages, { ...params, drvprop: prop }, prop);

    /** List all files that are duplicates of the given files based on hash values. */
    duplicateFiles = (pages: Pages, params?: QueryPropParams<'duplicatefiles'>) => this.#call('duplicatefiles', pages, params);

    /** Returns all external URLs (not interwikis) from the given pages. */
    externalLinks = (pages: Pages, params?: QueryPropParams<'extlinks'>) => this.#call('extlinks', pages, params);

    /** Returns plain-text or limited HTML extracts of the given pages. */
    extracts = (pages: Pages, params?: QueryPropParams<'extracts'>) => this.#call('extracts', pages, params);

    /** Find all pages that use the given files. */
    fileUsage = <P extends QueryPropProps<'fileusage'>>(pages: Pages, prop?: P, params?: Omit<QueryPropParams<'fileusage'>, 'fuprop'>) =>
        this.#call('fileusage', pages, { ...params, fuprop: prop }, prop);

    /** Returns file information and upload history. */
    imageInfo = <P extends QueryPropProps<'imageinfo'>>(pages: Pages, prop?: P, params?: Omit<QueryPropParams<'imageinfo'>, 'iiprop'>) =>
        this.#call('imageinfo', pages, { ...params, iiprop: prop }, prop);
}

type IMediaWikiQueryListClient = { [P in QueryList]: (params?: QueryListParams<P>) => Promise<QueryResponse<QueryListResponse<P, QueryListProps<P>>>> };
class MediaWikiQueryListClient implements IMediaWikiQueryListClient {
    readonly #request: QueryRequestFunc;

    constructor(request: QueryRequestFunc) {
        this.#request = request;
    }

    async #call<T extends QueryList>(list: T, params?: QueryListParams<T>) {
        const result = await this.#request<QueryListParameters<T>, QueryListResponse<T, QueryListProps<T>>>(Object.assign({}, params, { list }));
        result.query.continue = async () => {
            if (typeof result.continue?.continue !== 'string') return null;
            const continueResult = await this.#call(list, Object.assign({}, params, result.continue));
            return continueResult.query;
        };
        return result;
    }

    /** Enumerate all categories. */
    allcategories = (params?: QueryListParams<'allcategories'>) => this.#call('allcategories', params);
    /** List all deleted revisions by a user or in a namespace. */
    alldeletedrevisions = (params?: QueryListParams<'alldeletedrevisions'>) => this.#call('alldeletedrevisions', params);
}

class MediaWikiQueryGeneratorClient {
    readonly #request: QueryRequestFunc;

    constructor(request: QueryRequestFunc) {
        this.#request = request;
    }

    #call = <T extends QueryGenerator, P extends QueryProp>(generator: T, pages?: Pages, params?: QueryGeneratorParams<T, P>) =>
        this.#request<QueryGeneratorParameters<T, P>, QueryGeneratorResponse<T, QueryGeneratorProps<T>>>(
            Object.assign({}, params, { generator }, parsePages(pages))
        );

    /** List all categories the pages belong to. */
    categories = <P extends Nullable<QueryProp> = undefined>(
        pages: Pages,
        prop?: QueryPropProps<'categories'>,
        params?: Omit<QueryGeneratorParams<'categories', P>, 'gclprop'>
    ) => this.#call('categories', pages, { ...params, gclprop: prop });

    /** Enumerate all categories. */
    allcategories = <P extends Nullable<QueryProp> = undefined>(params?: QueryGeneratorParams<'allcategories', P>) =>
        this.#call('allcategories', undefined, params);
}

class MediaWikiQueryClient {
    readonly #request: QueryRequestFunc;
    #params: QueryParameters = {};
    #meta: MediaWikiQueryMetaClient | undefined;
    #prop: MediaWikiQueryPropClient | undefined;
    #list: MediaWikiQueryListClient | undefined;
    #generator: MediaWikiQueryGeneratorClient | undefined;

    constructor(mediaWikiClient: MediaWikiClient) {
        this.#request = <T, R>(params: T) =>
            mediaWikiClient.httpClient.request<APIParameters, QueryResponse<R>>('GET', Object.assign({ action: 'query' }, params, this.#params));
        this.#request = this.#request.bind(this);
    }

    get params() {
        return this.#params;
    }

    get meta() {
        return this.#meta ?? (this.#meta = new MediaWikiQueryMetaClient(this.#request));
    }

    get prop() {
        return this.#prop ?? (this.#prop = new MediaWikiQueryPropClient(this.#request));
    }

    get list() {
        return this.#list ?? (this.#list = new MediaWikiQueryListClient(this.#request));
    }

    get generator() {
        return this.#generator ?? (this.#generator = new MediaWikiQueryGeneratorClient(this.#request));
    }
}

declare interface MediaWikiClientOptions {
    host: string;
    protocol?: 'http' | 'https';
    apiPath?: string;
    params?: Omit<APIParameters, 'action'>;
}

export class MediaWikiClient {
    #query: MediaWikiQueryClient | undefined;

    readonly logger: pino.Logger;
    readonly httpClient: HttpClient;

    constructor(options: MediaWikiClientOptions) {
        const protocol = options.protocol === 'http' ? 'http' : 'https';
        const siteUrl = `${protocol}://${options.host}`;
        this.logger = pino({ name: 'MediaWikiClient', redact: ['lgpassword'], transport: { target: 'pino-pretty', options: { colorize: true } } });
        this.httpClient = new HttpClient(new URL(options.apiPath ?? '/w/api.php', siteUrl), { logger: this.logger, params: options.params });
    }

    get query() {
        return this.#query ?? (this.#query = new MediaWikiQueryClient(this));
    }

    /** Log in and get authentication cookies. */
    async login(name: string, password: string, params?: Pick<LoginParameters, 'lgdomain'>) {
        const token = (await this.query.meta.tokens('login')).query.tokens.logintoken;
        const loginParams = { ...params, action: 'login', lgname: name, lgpassword: password, lgtoken: token };
        const result = await this.httpClient.request<APIParameters, LoginResponse>('POST', loginParams);
        if (result.login.result === 'Success') return true;
        this.logger.error(result.login.reason, result.login.reason.text);
        return false;
    }

    /** Log out and clear session data. */
    async logout() {
        const token = (await this.query.meta.tokens('csrf')).query.tokens.csrftoken;
        await this.httpClient.request('POST', { action: 'logout', token });
    }
}
