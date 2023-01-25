import { MediaWikiContinue, Multi } from '../../HttpClient.js';

export type QueryProp =
    | 'categories'
    | 'categoryinfo'
    | 'cirrusbuilddoc'
    | 'cirruscompsuggestbuilddoc'
    | 'cirrusdoc'
    | 'contributors'
    | 'deletedrevisions'
    | 'duplicatefiles'
    | 'extlinks'
    | 'extracts'
    | 'fileusage'
    | 'globalusage'
    | 'imageinfo'
    | 'images'
    | 'info'
    | 'iwlinks'
    | 'langlinks'
    | 'links'
    | 'linkshere'
    | 'mmcontent'
    | 'pageimages'
    | 'pageprops'
    | 'pageterms'
    | 'pageviews'
    | 'redirects'
    | 'revisions'
    | 'stashimageinfo'
    | 'templates'
    | 'transcludedin'
    | 'transcodestatus'
    | 'videoinfo'
    | 'wbentityusage';

// --- Sub-props ----------------------

type SubPropsCategories = 'sortkey' | 'timestamp' | 'hidden';

type SubPropsInfo =
    | 'associatedpage'
    | 'displaytitle'
    | 'protection'
    | 'talkid'
    | 'watched'
    | 'watchers'
    | 'visitingwatchers'
    | 'notificationtimestamp'
    | 'subjectid'
    | 'url'
    | 'preload'
    | 'varianttitles'
    | 'linkclasses';

type SubPropsRevisions =
    | 'ids'
    | 'flags'
    | 'timestamp'
    | 'user'
    | 'userid'
    | 'size'
    | 'slotsize'
    | 'sha1'
    | 'slotsha1'
    | 'contentmodel'
    | 'comment'
    | 'parsedcomment'
    | 'content'
    | 'tags'
    | 'roles';

export type QueryPropSubProps<T extends QueryProp> = T extends 'categories'
    ? SubPropsCategories
    : T extends 'info'
    ? SubPropsInfo
    : T extends 'revisions'
    ? SubPropsRevisions
    : never;

// --- Params -------------------------

type ParamsCommon = {
    titles?: Multi<string>;
    pageids?: Multi<string | number>;
};

type ParamsCategories = ParamsCommon & {
    clprop?: Multi<SubPropsCategories>;
    clshow?: 'hidden' | '!hidden';
    clcategories?: Multi<string>;
    cldir?: 'ascending' | 'descending';
    cllimit?: number | 'max';
    clcontinue?: MediaWikiContinue;
};

type ParamsContributors = ParamsCommon & {
    pclimit?: number | 'max';
    pccontinue?: MediaWikiContinue;
};

type ParamsInfo = ParamsCommon & {
    inprop?: Multi<SubPropsInfo>;
    inlinkcontext?: string;
    intestactions?: Multi<string>;
    intestactionsdetail?: 'boolean' | 'full' | 'quick';
    incontinue?: MediaWikiContinue;
};

type ParamsLinks = ParamsCommon & {
    plnamespace?: number | '*';
    pltitles?: Multi<string>;
    pldir?: 'ascending' | 'descending';
    pllimit?: number | 'max';
    plcontinue?: MediaWikiContinue;
};

type ParamsRevisions = ParamsCommon & {
    rvprop?: Multi<SubPropsRevisions>;
    rvslots?: 'main';
    rvstartid?: number;
    rvendid?: number;
    rvstart?: Date;
    rvend?: Date;
    rvdir?: 'newer' | 'older';
    rvuser?: string;
    rvexcludeuser?: string;
    rvtag?: string;
    rvlimit?: number | 'max';
    rvcontinue?: MediaWikiContinue;
};

export type QueryPropParams<T extends QueryProp> = T extends 'categories'
    ? ParamsCategories
    : T extends 'contributors'
    ? ParamsContributors
    : T extends 'info'
    ? ParamsInfo
    : T extends 'links'
    ? ParamsLinks
    : T extends 'revisions'
    ? ParamsRevisions
    : any;

// --- Result -------------------------

type QueryCommon = {
    pageid?: number;
    ns?: number;
    title?: string;
};

type QueryCategories = QueryCommon & {
    categories: Array<{ ns: number; title: string }>;
};

type QueryContributors = QueryCommon & {
    anoncontributors: number;
    contributors: Array<{ userid: number; name: string }>;
};

type QueryInfo = QueryCommon & {
    contentmodel?: string;
    pagelanguage?: string;
    pagelanguagehtmlcode?: string;
    pagelanguagedir?: string;
    touched?: string;
    lastrevid?: number;
    length?: number;
    special?: boolean;
    associatedpage?: string;
    displaytitle?: string;
    restrictiontypes?: string[];
    protection?: { type: string; level: string; expiry: string }[];
    preload?: string;
    subjectid?: number;
    talkid?: number;
    fullurl?: string;
    editurl?: string;
    canonicalurl?: string;
    notificationtimestamp?: string;
    varianttitles?: Record<string, string>;
    visitingwatchers?: number;
    watched?: boolean;
    watchers?: number;
};

type QueryLinks = QueryCommon & {
    links: Array<{ ns: number; title: string }>;
};

type QueryRevisions = QueryCommon & {
    revisions: Array<{
        revid?: number;
        parentid?: number;
        minor?: boolean;
        user?: string;
        timestamp?: string;
        contentformat?: string;
        contentmodel?: string;
        content?: string;
        comment?: string;
        parsedcomment?: string;
        roles?: string[];
        sha1?: string;
        size?: number;
        tags?: string[];
    }>;
};

export type QueryPropResult<T extends QueryProp> = {
    normalized?: Array<{ fromencoded?: boolean; from: string; to: string }>;
    pages: Array<
        T extends 'categories'
            ? QueryCategories
            : T extends 'contributors'
            ? QueryContributors
            : T extends 'info'
            ? QueryInfo
            : T extends 'links'
            ? QueryLinks
            : T extends 'revisions'
            ? QueryRevisions
            : any
    >;
};

export type QueryPropPageResult<T extends QueryProp> = QueryPropResult<T>['pages'][number];
