import { EditParams, EditResult } from './types/edit.js';
import { QueryProp, QueryPropParams, QueryPropSubProps } from './types/query/prop.js';
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
    group?: QueryPropParams<'contributors'>['pcgroup'];
    excludeGroup?: QueryPropParams<'contributors'>['pcgroup'];
    rights?: QueryPropParams<'contributors'>['pcrights'];
    excludeRights?: QueryPropParams<'contributors'>['pcrights'];
    limit?: number | 'max';
}

interface QueryImagesOptions {
    images?: Multi<string>;
    dir?: 'ascending' | 'descending';
    limit?: number | 'max';
}

interface QueryInfoOptions {
    props?: Multi<QueryPropSubProps<'info'>>;
    linkContext?: string;
    testActions?: Multi<string>;
    testActionsDetail?: 'boolean' | 'full' | 'quick';
}

interface QueryIWLinksOptions {
    props?: Multi<QueryPropSubProps<'iwlinks'>>;
    prefix?: string;
    title?: string;
    dir?: 'ascending' | 'descending';
    limit?: number | 'max';
}

interface QueryLinksOptions {
    namespace?: number | '*';
    titles?: Multi<string>;
    dir?: 'ascending' | 'descending';
    limit?: number | 'max';
}

interface QueryLinksHereOptions {
    props?: Multi<QueryPropSubProps<'linkshere'>>;
    namespace?: number | '*';
    show?: 'redirect' | '!redirect';
    limit?: number | 'max';
}

interface QueryRedirectsOptions {
    props?: Multi<QueryPropSubProps<'redirects'>>;
    namespace?: number | '*';
    show?: 'fragment' | '!fragment';
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

interface QueryTemplatesOptions {
    namespace?: number | '*';
    templates?: Multi<string>;
    dir?: 'ascending' | 'descending';
    limit?: number | 'max';
}

interface QueryTranscludedInOptions {
    props?: Multi<QueryPropSubProps<'transcludedin'>>;
    namespace?: number | '*';
    show?: 'redirect' | '!redirect';
    limit?: number | 'max';
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

    constructor(httpClient: HttpClient, id: IDType[T], type: T) {
        this.httpClient = httpClient;
        this.idParams = { [type]: String(id) };
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
                token: await this.httpClient.getToken()
            })
        ).edit;
    }

    #text: string | null | undefined;
    async text() {
        if (typeof this.#text !== 'undefined') return this.#text;
        const result = await this.httpClient.parse({ page: this.idParams.title, prop: 'text' });
        this.#text = result?.text ?? null;
        return this.#text;
    }

    #wikitext: string | null | undefined;
    async wikitext() {
        if (typeof this.#wikitext !== 'undefined') return this.#wikitext;
        const result = await this.httpClient.parse({ page: this.idParams.title, prop: 'wikitext' });
        this.#wikitext = result?.wikitext ?? null;
        return this.#wikitext;
    }

    queryCategories(options?: QueryCategoriesOptions) {
        return this.queryProp('categories', {
            clprop: options?.props,
            clshow: options?.show,
            cllimit: options?.limit ?? 'max',
            clcategories: options?.categories,
            cldir: options?.dir
        });
    }

    queryContributors(options?: QueryContributorsOptions) {
        return this.queryProp('contributors', {
            pcgroup: options?.group,
            pcexcludegroup: options?.excludeGroup,
            pcrights: options?.rights,
            pcexcluderights: options?.excludeRights,
            pclimit: options?.limit ?? 'max'
        });
    }

    queryImages(options?: QueryImagesOptions) {
        return this.queryProp('images', {
            imimages: options?.images,
            imdir: options?.dir,
            imlimit: options?.limit ?? 'max'
        });
    }

    queryInfo(options?: QueryInfoOptions) {
        return this.queryProp('info', {
            inprop: options?.props,
            inlinkcontext: options?.linkContext,
            intestactions: options?.testActions,
            intestactionsdetail: options?.testActionsDetail
        });
    }

    queryIWLinks(options?: QueryIWLinksOptions) {
        return this.queryProp('iwlinks', {
            iwprop: options?.props,
            iwprefix: options?.prefix,
            iwtitle: options?.title,
            iwdir: options?.dir,
            iwlimit: options?.limit ?? 'max'
        });
    }

    queryLinks(options?: QueryLinksOptions) {
        return this.queryProp('links', {
            plnamespace: options?.namespace ?? '*',
            pltitles: options?.titles,
            pldir: options?.dir,
            pllimit: options?.limit ?? 'max'
        });
    }

    queryLinksHere(options?: QueryLinksHereOptions) {
        return this.queryProp('linkshere', {
            lhprop: options?.props,
            lhnamespace: options?.namespace ?? '*',
            lhshow: options?.show,
            lhlimit: options?.limit ?? 'max'
        });
    }

    queryRedirects(options?: QueryRedirectsOptions) {
        return this.queryProp('redirects', {
            rdprop: options?.props,
            rdnamespace: options?.namespace ?? '*',
            rdshow: options?.show,
            rdlimit: options?.limit ?? 'max'
        });
    }

    queryRevisions(options?: QueryRevisionsOptions) {
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

    queryTemplates(options?: QueryTemplatesOptions) {
        return this.queryProp('templates', {
            tlnamespace: options?.namespace ?? '*',
            tltemplates: options?.templates,
            tldir: options?.dir,
            tllimit: options?.limit ?? 'max'
        });
    }

    queryTranscludedIn(options?: QueryTranscludedInOptions) {
        return this.queryProp('transcludedin', {
            tiprop: options?.props,
            tinamespace: options?.namespace ?? '*',
            tishow: options?.show,
            tilimit: options?.limit ?? 'max'
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
