import assert from 'node:assert';

import { EditParams, EditResult } from './types/edit.js';
import { QueryProp, QueryPropPageResult, QueryPropParams, QueryPropSubProps } from './types/query/prop.js';
import { HttpClient, Multi } from './HttpClient.js';

type IDType = {
    title: string;
    pageid: number;
};

interface QueryCategoriesOptions {
    props?: Multi<QueryPropSubProps<'categories'>>;
    show?: 'hidden' | '!hidden';
    limit?: number | 'max';
    categories?: Multi<string>;
    dir?: 'ascending' | 'descending';
}

interface QueryContributorsOptions {
    limit?: number | 'max';
}

interface QueryInfoOptions {
    props?: Multi<QueryPropSubProps<'info'>>;
    linkContext?: string;
    testActions?: Multi<string>;
    testActionsDetail?: 'boolean' | 'full' | 'quick';
}

interface QueryLinksOptions {
    namespace?: number | '*';
    titles?: Multi<string>;
    dir?: 'ascending' | 'descending';
    limit?: number | 'max';
}

interface QueryRevisionsOptions {
    props?: Multi<QueryPropSubProps<'revisions'>>;
    slots?: 'main';
    limit?: number | 'max';
    startId?: number;
    endId?: number;
    start?: Date;
    end?: Date;
    dir?: 'newer' | 'older';
    user?: string;
    excludeUser?: string;
    tag?: string;
}

interface EditOptions {
    summary?: string;
    minor?: boolean;
    notMinor?: boolean;
    bot?: boolean;
    recreate?: boolean;
    createOnly?: boolean;
    noCreate?: boolean;
}

export class Page<T extends keyof IDType> {
    private readonly httpClient: HttpClient;
    private readonly idParams: Partial<Record<keyof IDType, string>>;
    private csrfToken: string | undefined;

    constructor(httpClient: HttpClient, id: IDType[T], type: T) {
        this.httpClient = httpClient;
        this.idParams = { [type]: String(id) };
    }

    private async getToken() {
        this.csrfToken = this.csrfToken ?? (await this.httpClient.queryMeta('tokens', { type: 'csrf' })).csrftoken;
        assert(this.csrfToken != null, 'Failed to get csrf token');
        return this.csrfToken;
    }

    private async queryProp<T extends QueryProp>(prop: T, params: QueryPropParams<T>) {
        const { pages } = await this.httpClient.queryProp(prop, {
            titles: this.idParams.title,
            pageids: this.idParams.pageid,
            ...params
        });
        return pages?.find((page: any) => page.pageid === this.idParams.pageid || page.title === this.idParams.title) ?? pages?.[0];
    }

    private async editPage(params: Record<string, any>, options?: EditOptions) {
        return (
            await this.httpClient.post<EditParams, EditResult>({
                action: 'edit',
                ...this.idParams,
                ...params,
                summary: options?.summary,
                minor: options?.minor,
                notminor: options?.notMinor,
                bot: options?.bot,
                recreate: options?.recreate,
                createonly: options?.createOnly,
                nocreate: options?.noCreate,
                token: await this.getToken()
            })
        ).edit;
    }

    queryCategories(options?: QueryCategoriesOptions): Promise<QueryPropPageResult<'categories'>> {
        return this.queryProp('categories', {
            clprop: options?.props,
            clshow: options?.show,
            cllimit: options?.limit ?? 'max',
            clcategories: options?.categories,
            cldir: options?.dir
        });
    }

    queryContributors(options?: QueryContributorsOptions): Promise<QueryPropPageResult<'contributors'>> {
        return this.queryProp('contributors', { pclimit: options?.limit ?? 'max' });
    }

    queryInfo(options?: QueryInfoOptions): Promise<QueryPropPageResult<'info'>> {
        return this.queryProp('info', {
            inprop: options?.props,
            inlinkcontext: options?.linkContext,
            intestactions: options?.testActions,
            intestactionsdetail: options?.testActionsDetail
        });
    }

    queryLinks(options?: QueryLinksOptions): Promise<QueryPropPageResult<'links'>> {
        return this.queryProp('links', {
            plnamespace: options?.namespace ?? '*',
            pltitles: options?.titles,
            pldir: options?.dir,
            pllimit: options?.limit ?? 'max'
        });
    }

    queryRevisions(options?: QueryRevisionsOptions): Promise<QueryPropPageResult<'revisions'>> {
        return this.queryProp('revisions', {
            rvprop: options?.props,
            rvslots: options?.slots,
            rvlimit: options?.limit ?? 'max',
            rvstartid: options?.startId,
            rvendid: options?.endId,
            rvstart: options?.start,
            rvend: options?.end,
            rvdir: options?.dir,
            rvuser: options?.user,
            rvexcludeuser: options?.excludeUser,
            rvtag: options?.tag
        });
    }

    edit(text: string, options?: EditOptions) {
        return this.editPage({ text }, options);
    }

    undo(from: number, to?: number, options?: EditOptions) {
        const revisions = typeof to !== 'number' ? { undo: from } : { undoafter: from, undo: to };
        return this.editPage(revisions, options);
    }
}
