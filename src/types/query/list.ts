import { Multi } from '../../HttpClient.js';

export type QueryList =
    | 'abusefilters'
    | 'abuselog'
    | 'allcategories'
    | 'alldeletedrevisions'
    | 'allfileusages'
    | 'allimages'
    | 'alllinks'
    | 'allpages'
    | 'allredirects'
    | 'allrevisions'
    | 'alltransclusions'
    | 'allusers'
    | 'backlinks'
    | 'betafeatures'
    | 'blocks'
    | 'categorymembers'
    | 'centralnoticeactivecampaigns'
    | 'centralnoticelogs'
    | 'checkuser'
    | 'checkuserlog'
    | 'embeddedin'
    | 'extdistrepos'
    | 'exturlusage'
    | 'filearchive'
    | 'gadgetcategories'
    | 'gadgets'
    | 'globalallusers'
    | 'globalblocks'
    | 'globalgroups'
    | 'imageusage'
    | 'iwbacklinks'
    | 'langbacklinks'
    | 'linterrors'
    | 'logevents'
    | 'messagecollection'
    | 'mostviewed'
    | 'mystashedfiles'
    | 'pagepropnames'
    | 'pageswithprop'
    | 'prefixsearch'
    | 'protectedtitles'
    | 'querypage'
    | 'random'
    | 'recentchanges'
    | 'search'
    | 'tags'
    | 'threads'
    | 'usercontribs'
    | 'users'
    | 'watchlist'
    | 'watchlistraw'
    | 'wblistentityusage'
    | 'wikisets';

// --- Params -------------------------

type ParamsAllCategories = {
    acfrom?: string;
    acto?: string;
    acprefix?: string;
    acdir?: 'ascending' | 'descending';
    acmin?: number;
    acmax?: number;
    aclimit?: number | 'max';
    acprop?: Multi<'size' | 'hidden'>;
};

export type QueryListParams<T extends QueryList> = T extends 'allcategories' ? ParamsAllCategories : any;

// --- Result -------------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type QueryListResult<T extends QueryList> = any;
