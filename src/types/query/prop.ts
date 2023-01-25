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

type SPCategories = 'sortkey' | 'timestamp' | 'hidden';

type SPInfo =
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

type SPRevisions =
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

export type QueryPropSubProps<T extends QueryProp> = T extends 'info' ? SPInfo : T extends 'revisions' ? SPRevisions : Multi<string>;

// --- Params -------------------------

type PCommon = {
    titles?: Multi<string>;
    pageids?: Multi<string | number>;
};

type PCategories = PCommon & {
    clprop?: Multi<SPCategories>;
    clshow?: 'hidden' | '!hidden';
    clcategories?: Multi<string>;
    cldir?: 'ascending' | 'descending';
    cllimit?: number;
    clcontinue?: MediaWikiContinue;
};

type PInfo = PCommon & {
    inprop?: Multi<SPInfo>;
    inlinkcontext?: string;
    intestactions?: Multi<string>;
    intestactionsdetail?: 'boolean' | 'full' | 'quick';
    incontinue?: MediaWikiContinue;
};

type PRevisions = PCommon & {
    rvprop?: Multi<SPRevisions>;
    rvslots?: 'main';
    rvstartid?: number;
    rvendid?: number;
    rvstart?: Date;
    rvend?: Date;
    rvdir?: 'newer' | 'older';
    rvuser?: string;
    rvexcludeuser?: string;
    rvtag?: string;
    rvlimit?: number;
    rvcontinue?: MediaWikiContinue;
};

export type QueryPropParams<T extends QueryProp> = T extends 'categories' ? PCategories : T extends 'info' ? PInfo : T extends 'revisions' ? PRevisions : any;

// --- Result -------------------------

type RCommon = {
    pageid?: number;
    ns?: number;
    title?: string;
};

type RCategories = RCommon & {
    categories: Array<{ ns: number; title: string }>;
};

type RInfo = RCommon & {
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

type RRevisions = RCommon & {
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
    pages: Array<T extends 'categories' ? RCategories : T extends 'info' ? RInfo : T extends 'revisions' ? RRevisions : any>;
};

export type QueryPropPageResult<T extends QueryProp> = QueryPropResult<T>['pages'][number];
