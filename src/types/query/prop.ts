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

type SubPropsFileUsage = 'pageid' | 'title' | 'redirect';

type SubPropsImageInfo =
    | 'archivename'
    | 'badfile'
    | 'bitdepth'
    | 'canonicaltitle'
    | 'comment'
    | 'commonmetadata'
    | 'dimensions'
    | 'extmetadata'
    | 'mediatype'
    | 'metadata'
    | 'mime'
    | 'parsedcomment'
    | 'sha1'
    | 'size'
    | 'thumbmime'
    | 'timestamp'
    | 'uploadwarning'
    | 'url'
    | 'user'
    | 'userid';

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

type SubPropsIWLinks = 'url';

type SubPropsLinksHere = 'pageid' | 'title' | 'redirect';

type SubPropsRedirects = 'pageid' | 'title' | 'fragment';

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

type SubPropsTranscludedIn = 'pageid' | 'title' | 'redirect';

export type QueryPropSubProps<T extends QueryProp> = T extends 'categories'
    ? SubPropsCategories
    : T extends 'fileusage'
    ? SubPropsFileUsage
    : T extends 'imageinfo'
    ? SubPropsImageInfo
    : T extends 'info'
    ? SubPropsInfo
    : T extends 'iwlinks'
    ? SubPropsIWLinks
    : T extends 'linkshere'
    ? SubPropsLinksHere
    : T extends 'revisions'
    ? SubPropsRevisions
    : T extends 'transcludedin'
    ? SubPropsTranscludedIn
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

type ParamsContributorsGroup =
    | 'accountcreator'
    | 'autopatrolled'
    | 'bot'
    | 'bureaucrat'
    | 'checkuser'
    | 'confirmed'
    | 'flow-bot'
    | 'import'
    | 'interface-admin'
    | 'ipblock-exempt'
    | 'no-ipinfo'
    | 'push-subscription-manager'
    | 'steward'
    | 'suppress'
    | 'sysop'
    | 'translationadmin'
    | 'transwiki'
    | 'uploader';

type ParamsContributorsRights =
    | 'abusefilter-hidden-log'
    | 'abusefilter-hide-log'
    | 'abusefilter-log'
    | 'abusefilter-log-detail'
    | 'abusefilter-log-private'
    | 'abusefilter-modify'
    | 'abusefilter-modify-global'
    | 'abusefilter-modify-restricted'
    | 'abusefilter-privatedetails'
    | 'abusefilter-privatedetails-log'
    | 'abusefilter-revert'
    | 'abusefilter-view'
    | 'abusefilter-view-private'
    | 'apihighlimits'
    | 'applychangetags'
    | 'autoconfirmed'
    | 'autocreateaccount'
    | 'autopatrol'
    | 'autoreview'
    | 'autoreviewrestore'
    | 'bigdelete'
    | 'block'
    | 'blockemail'
    | 'bot'
    | 'browsearchive'
    | 'centralauth-createlocal'
    | 'centralauth-lock'
    | 'centralauth-merge'
    | 'centralauth-rename'
    | 'centralauth-suppress'
    | 'centralauth-unmerge'
    | 'changetags'
    | 'checkuser'
    | 'checkuser-log'
    | 'collectionsaveascommunitypage'
    | 'collectionsaveasuserpage'
    | 'createaccount'
    | 'createpage'
    | 'createtalk'
    | 'delete'
    | 'delete-redirect'
    | 'deletechangetags'
    | 'deletedhistory'
    | 'deletedtext'
    | 'deletelogentry'
    | 'deleterevision'
    | 'edit'
    | 'editautopatrolprotected'
    | 'editautoreviewprotected'
    | 'editcontentmodel'
    | 'editeditorprotected'
    | 'editextendedsemiprotected'
    | 'editinterface'
    | 'editmyoptions'
    | 'editmyprivateinfo'
    | 'editmyusercss'
    | 'editmyuserjs'
    | 'editmyuserjson'
    | 'editmyuserjsredirect'
    | 'editmywatchlist'
    | 'editprotected'
    | 'editsemiprotected'
    | 'editsitecss'
    | 'editsitejs'
    | 'editsitejson'
    | 'edittrustedprotected'
    | 'editusercss'
    | 'edituserjs'
    | 'edituserjson'
    | 'enrollasmentor'
    | 'extendedconfirmed'
    | 'flow-create-board'
    | 'flow-delete'
    | 'flow-edit-post'
    | 'flow-hide'
    | 'flow-lock'
    | 'flow-suppress'
    | 'gadgets-definition-edit'
    | 'gadgets-edit'
    | 'globalblock'
    | 'globalblock-exempt'
    | 'globalblock-whitelist'
    | 'globalgroupmembership'
    | 'globalgrouppermissions'
    | 'gwtoolset'
    | 'hideuser'
    | 'import'
    | 'importupload'
    | 'ipblock-exempt'
    | 'ipinfo'
    | 'ipinfo-view-basic'
    | 'ipinfo-view-full'
    | 'ipinfo-view-log'
    | 'lqt-merge'
    | 'lqt-react'
    | 'lqt-split'
    | 'manage-all-push-subscriptions'
    | 'managechangetags'
    | 'managementors'
    | 'markbotedits'
    | 'massmessage'
    | 'mergehistory'
    | 'minoredit'
    | 'move'
    | 'move-categorypages'
    | 'move-rootuserpages'
    | 'move-subpages'
    | 'movefile'
    | 'movestable'
    | 'mwoauthmanageconsumer'
    | 'mwoauthmanagemygrants'
    | 'mwoauthproposeconsumer'
    | 'mwoauthsuppress'
    | 'mwoauthupdateownconsumer'
    | 'mwoauthviewprivate'
    | 'mwoauthviewsuppressed'
    | 'newsletter-create'
    | 'newsletter-delete'
    | 'newsletter-manage'
    | 'newsletter-restore'
    | 'nominornewtalk'
    | 'noratelimit'
    | 'nuke'
    | 'oathauth-api-all'
    | 'oathauth-disable-for-user'
    | 'oathauth-enable'
    | 'oathauth-verify-user'
    | 'oathauth-view-log'
    | 'override-antispoof'
    | 'override-export-depth'
    | 'pagelang'
    | 'pagetranslation'
    | 'patrol'
    | 'patrolmarks'
    | 'protect'
    | 'purge'
    | 'read'
    | 'renameuser'
    | 'reupload'
    | 'reupload-own'
    | 'reupload-shared'
    | 'review'
    | 'rollback'
    | 'sboverride'
    | 'securepoll-create-poll'
    | 'securepoll-view-voter-pii'
    | 'sendemail'
    | 'setmentor'
    | 'siteadmin'
    | 'skipcaptcha'
    | 'spamblacklistlog'
    | 'stablesettings'
    | 'suppressionlog'
    | 'suppressredirect'
    | 'suppressrevision'
    | 'tboverride'
    | 'tboverride-account'
    | 'templateeditor'
    | 'titleblacklistlog'
    | 'torunblocked'
    | 'transcode-reset'
    | 'transcode-status'
    | 'translate'
    | 'translate-groupreview'
    | 'translate-import'
    | 'translate-manage'
    | 'translate-messagereview'
    | 'unblockself'
    | 'undelete'
    | 'unreviewedpages'
    | 'unwatchedpages'
    | 'upload'
    | 'upload_by_url'
    | 'urlshortener-create-url'
    | 'urlshortener-manage-url'
    | 'urlshortener-view-log'
    | 'userrights'
    | 'userrights-interwiki'
    | 'validate'
    | 'viewdeletedfile'
    | 'viewmyprivateinfo'
    | 'viewmywatchlist'
    | 'viewsuppressed'
    | 'vipsscaler-test'
    | 'writeapi';

type ParamsContributors = ParamsCommon & {
    pcgroup?: Multi<ParamsContributorsGroup>;
    pcexcludegroup?: Multi<ParamsContributorsGroup>;
    pcrights?: Multi<ParamsContributorsRights>;
    pcexcluderights?: Multi<ParamsContributorsRights>;
    pclimit?: number | 'max';
    pccontinue?: MediaWikiContinue;
};

type ParamsFileUsage = ParamsCommon & {
    fuprop?: Multi<SubPropsFileUsage>;
    funamespace?: number | '*';
    fushow?: 'redirect' | '!redirect';
    fulimit?: number | 'max';
    fucontinue?: MediaWikiContinue;
};

type ParamsImages = ParamsCommon & {
    imimages?: Multi<string>;
    imdir?: 'ascending' | 'descending';
    imlimit?: number | 'max';
    imcontinue?: MediaWikiContinue;
};

type ParamsImageInfo = ParamsCommon & {
    iiprop?: Multi<SubPropsImageInfo>;
    iistart?: Date;
    iiend?: Date;
    iiurlwidth?: number;
    iiurlheight?: number;
    iiurlparam?: string;
    iimetadataversion?: number | 'latest';
    iiextmetadatalanguage?: string;
    iiextmetadatamultilang?: boolean;
    iiextmetadatafilter?: Multi<string>;
    iibadfilecontexttitle?: string;
    iilocalonly?: boolean;
    iilimit?: number | 'max';
    iicontinue?: MediaWikiContinue;
};

type ParamsInfo = ParamsCommon & {
    inprop?: Multi<SubPropsInfo>;
    inlinkcontext?: string;
    intestactions?: Multi<string>;
    intestactionsdetail?: 'boolean' | 'full' | 'quick';
    incontinue?: MediaWikiContinue;
};

type ParamsIWLinks = ParamsCommon & {
    iwprop?: Multi<SubPropsIWLinks>;
    iwprefix?: string;
    iwtitle?: string;
    iwdir?: 'ascending' | 'descending';
    iwlimit?: number | 'max';
    iwcontinue?: MediaWikiContinue;
};

type ParamsLinks = ParamsCommon & {
    plnamespace?: number | '*';
    pltitles?: Multi<string>;
    pldir?: 'ascending' | 'descending';
    pllimit?: number | 'max';
    plcontinue?: MediaWikiContinue;
};

type ParamsLinksHere = ParamsCommon & {
    lhprop?: Multi<SubPropsLinksHere>;
    lhnamespace?: number | '*';
    lhshow?: 'redirect' | '!redirect';
    lhlimit?: number | 'max';
    lhcontinue?: MediaWikiContinue;
};

type ParamsRedirects = ParamsCommon & {
    rdprop?: Multi<SubPropsRedirects>;
    rdnamespace?: number | '*';
    rdshow?: 'fragment' | '!fragment';
    rdlimit?: number | 'max';
    rdcontinue?: MediaWikiContinue;
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

type ParamsTemplates = ParamsCommon & {
    tlnamespace?: number | '*';
    tltemplates?: Multi<string>;
    tldir?: 'ascending' | 'descending';
    tllimit?: number | 'max';
    tlcontinue?: MediaWikiContinue;
};

type ParamsTranscludedIn = ParamsCommon & {
    tiprop?: Multi<SubPropsTranscludedIn>;
    tinamespace?: number | '*';
    tishow?: 'redirect' | '!redirect';
    tilimit?: number | 'max';
    ticontinue?: MediaWikiContinue;
};

export type QueryPropParams<T extends QueryProp> = T extends 'categories'
    ? ParamsCategories
    : T extends 'contributors'
    ? ParamsContributors
    : T extends 'fileusage'
    ? ParamsFileUsage
    : T extends 'images'
    ? ParamsImages
    : T extends 'imageinfo'
    ? ParamsImageInfo
    : T extends 'info'
    ? ParamsInfo
    : T extends 'iwlinks'
    ? ParamsIWLinks
    : T extends 'links'
    ? ParamsLinks
    : T extends 'linkshere'
    ? ParamsLinksHere
    : T extends 'redirects'
    ? ParamsRedirects
    : T extends 'revisions'
    ? ParamsRevisions
    : T extends 'templates'
    ? ParamsTemplates
    : T extends 'transcludedin'
    ? ParamsTranscludedIn
    : any;

// --- Result -------------------------

type QueryPage = {
    pageid: number;
    ns: number;
    title: string;
};

type QueryCategories = QueryPage & {
    categories: Omit<QueryPage, 'pageid'>[];
};

type QueryContributors = QueryPage & {
    anoncontributors: number;
    contributors: Array<{ userid: number; name: string }>;
};

type QueryFileUsage = QueryPage & {
    fileusage: (QueryPage & { redirect: boolean })[];
};

type QueryImages = QueryPage & {
    images: Omit<QueryPage, 'pageid'>[];
};

export interface ImageInfo {
    timestamp?: string;
    user?: string;
    userid?: number;
    size?: number;
    width?: number;
    height?: number;
    sha1?: string;
    canonicaltitle?: string;
    url?: string;
    descriptionurl?: string;
    descriptionshorturl?: string;
    bitdepth?: number;
    comment?: string;
    parsedcomment?: string;
    html?: string;
    mime?: string;
    thumbmime?: string;
    mediatype?: string;
    metadata?: Array<{ name: string; value: any }>;
    commonmetadata?: Array<{ name: string; value: any }>;
    extmetadata?: Record<string, { value: string; source: string; hidden: string }>;
}

type QueryImageInfo = QueryPage & {
    missing?: boolean;
    imagerepository: string;
    imageinfo: ImageInfo[];
};

type QueryInfo = QueryPage & {
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

type QueryLinks = QueryPage & {
    links: Omit<QueryPage, 'pageid'>[];
};

type QueryIWLinks = QueryPage & {
    iwlinks: { prefix: string; title: string; url?: string }[];
};

type QueryLinksHere = QueryPage & {
    linkshere: (QueryPage & { redirect: boolean })[];
};

type QueryRedirects = QueryPage & {
    redirects: QueryPage[];
};

type QueryRevisions = QueryPage & {
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

type QueryTemplates = QueryPage & {
    templates: Omit<QueryPage, 'pageid'>[];
};

type QueryTranscludedIn = QueryPage & {
    transcludedin: (QueryPage & { redirect: boolean })[];
};

export type QueryPropResult<T extends QueryProp> = {
    normalized?: Array<{ fromencoded?: boolean; from: string; to: string }>;
    pages: Array<
        T extends 'categories'
            ? QueryCategories
            : T extends 'contributors'
            ? QueryContributors
            : T extends 'fileusage'
            ? QueryFileUsage
            : T extends 'images'
            ? QueryImages
            : T extends 'imageinfo'
            ? QueryImageInfo
            : T extends 'info'
            ? QueryInfo
            : T extends 'iwlinks'
            ? QueryIWLinks
            : T extends 'links'
            ? QueryLinks
            : T extends 'linkshere'
            ? QueryLinksHere
            : T extends 'redirects'
            ? QueryRedirects
            : T extends 'revisions'
            ? QueryRevisions
            : T extends 'templates'
            ? QueryTemplates
            : T extends 'transcludedin'
            ? QueryTranscludedIn
            : any
    >;
};

export type QueryPropPageResult<T extends QueryProp> = QueryPropResult<T>['pages'][number];
