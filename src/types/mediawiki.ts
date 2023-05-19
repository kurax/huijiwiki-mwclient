import { APIResponse, ErrorData, ItemOfMulti, Multi } from './common.js';

// type MediaWikiGetAction =
//     | 'checktoken'
//     | 'compare'
//     | 'expandtemplates'
//     | 'feedcontributions'
//     | 'feedrecentchanges'
//     | 'feedwatchlist'
//     | 'opensearch'
//     | 'parse'
//     | 'query';

// type MediaWikiPostAction =
//     | 'block'
//     | 'changeauthenticationdata'
//     | 'changecontentmodel'
//     | 'clearhasmsg'
//     | 'clientlogin'
//     | 'createaccount'
//     | 'delete'
//     | 'edit'
//     | 'emailuser'
//     | 'filerevert'
//     | 'import'
//     | 'linkaccount'
//     | 'login'
//     | 'logout'
//     | 'managetags'
//     | 'mergehistory'
//     | 'move'
//     | 'options'
//     | 'patrol'
//     | 'protect'
//     | 'purge'
//     | 'removeauthenticationdata'
//     | 'resetpassword'
//     | 'revisiondelete'
//     | 'rollback'
//     | 'setnotificationtimestamp'
//     | 'setpagelanguage'
//     | 'tag'
//     | 'unblock'
//     | 'undelete'
//     | 'unlinkaccount'
//     | 'upload'
//     | 'userrights'
//     | 'validatepassword'
//     | 'watch';

type Page = { ns: number; pageid?: number; title: string; missing?: true };
type Category = { hidden?: boolean; size?: number; pages?: number; files?: number; subcats?: number };

export interface LoginParameters {
    /** Username. */
    lgname: string;
    /** Password. */
    lgpassword: string;
    /** Domain (optional). */
    lgdomain?: string;
    /** A "login" token retrieved from action=query&meta=tokens */
    lgtoken: string;
}

export interface LoginResponse extends APIResponse {
    login: {
        result: 'Success' | 'Failed' | 'WrongToken' | 'NeedToken' | 'Aborted';
        lguserid: number;
        lgusername: string;
        reason: Omit<ErrorData, 'module'>;
    };
}

export declare interface QueryParameters {
    /** Include an additional pageids section listing all returned page IDs. */
    indexpageids?: true;
    /** Export the current revisions of all given or generated pages. */
    export?: true;
    /** Return the export XML without wrapping it in an XML result (same format as Special:Export). Can only be used with query+export. */
    exportnowrap?: true;
    /** Target the given version of the XML dump format when exporting. Can only be used with query+export. */
    exportschema?: '0.10' | '0.11';
    /** Whether to get the full URL if the title is an interwiki link. */
    iwurl?: true;
    // /** When more results are available, use this to continue. */
    // continue?: MediaWikiContinue;
    /** Return raw `query-continue` data for continuation. */
    // rawcontinue?: true;
    /** A list of titles to work on. */
    titles?: Multi<string>;
    /** A list of page IDs to work on. */
    pageids?: Multi<number>;
    /**
     * A list of revision IDs to work on.
     * Note that almost all query modules will convert revision IDs to the corresponding page ID and work on the latest revision instead.
     * Only `prop=revisions` uses exact revisions for its response.
     */
    revids?: Multi<number>;
    /** Automatically resolve redirects in query+titles, query+pageids, and query+revids, and in pages returned by query+generator. */
    redirects?: true;
    /**
     * Convert titles to other variants if necessary.
     * Only works if the wiki's content language supports variant conversion.
     * Languages that support variant conversion include ban, en, crh, gan, iu, kk, ku, sh, shi, sr, tg, tly, uz and zh.
     */
    converttitles?: true;
}

export interface QueryResponse<T> extends APIResponse {
    batchcomplete?: boolean;
    limits?: { [key: string]: number };
    continue?: { [key: string]: string; continue: string };
    query: T;
}

// const Prefix = {
//     allcategories: 'ac' as const,
//     alldeletedrevisions: 'adr' as const,
//     allmessages: 'am' as const,
//     authmanagerinfo: 'ami' as const,
//     categories: 'cl' as const,
//     filerepoinfo: 'fri' as const,
//     languageinfo: 'li' as const,
//     siteinfo: 'si' as const,
//     tokens: '' as const,
//     userinfo: 'ui' as const
// } satisfies Record<QueryMeta | QueryProp | QueryList | QueryGenerator, string>;

// export type Prefix = typeof Prefix;

// #region Query Meta

declare enum QueryMetaEnum {
    allmessages,
    authmanagerinfo,
    //babel,
    //featureusage,
    filerepoinfo,
    //globalpreferences,
    //globalrenamestatus,
    //globaluserinfo,
    languageinfo,
    //languagestats,
    //linterstats,
    //managemessagegroups,
    //messagegroups,
    //messagegroupstats,
    //messagetranslations,
    //notifications,
    siteinfo,
    //siteviews,
    tokens,
    //unreadnotificationpages,
    userinfo
    //wikibase,
}

export type QueryMeta = keyof typeof QueryMetaEnum;

export type QueryMetaProps<T extends QueryMeta> = Multi<
    T extends 'allmessages'
        ? 'default'
        : T extends 'filerepoinfo'
        ?
              | 'canUpload'
              | 'descBaseUrl'
              | 'descriptionCacheExpiry'
              | 'displayname'
              | 'favicon'
              | 'fetchDescription'
              | 'initialCapital'
              | 'local'
              | 'name'
              | 'rootUrl'
              | 'scriptDirUrl'
              | 'thumbUrl'
              | 'url'
        : T extends 'siteinfo'
        ?
              | 'autocreatetempuser'
              | 'dbrepllag'
              | 'defaultoptions'
              | 'extensions'
              | 'extensiontags'
              | 'fileextensions'
              | 'functionhooks'
              | 'general'
              | 'interwikimap'
              | 'languages'
              | 'languagevariants'
              | 'libraries'
              | 'magicwords'
              | 'namespacealiases'
              | 'namespaces'
              | 'protocols'
              | 'restrictions'
              | 'rightsinfo'
              | 'showhooks'
              | 'skins'
              | 'specialpagealiases'
              | 'statistics'
              | 'uploaddialog'
              | 'usergroups'
              | 'variables'
        : T extends 'languageinfo'
        ? 'autonym' | 'bcp47' | 'code' | 'dir' | 'fallbacks' | 'name' | 'variantnames' | 'variants'
        : T extends 'tokens'
        ? 'createaccount' | 'csrf' | 'login' | 'patrol' | 'rollback' | 'userrights' | 'watch'
        : T extends 'userinfo'
        ?
              | 'acceptlang'
              | 'blockinfo'
              | 'cancreateaccount'
              | 'centralids'
              | 'changeablegroups'
              | 'editcount'
              | 'email'
              | 'groupmemberships'
              | 'groups'
              | 'hasmsg'
              | 'implicitgroups'
              | 'latestcontrib'
              | 'options'
              | 'ratelimits'
              | 'realname'
              | 'registrationdate'
              | 'rights'
              | 'theoreticalratelimits'
              | 'unreadcount'
        : never
>;

export type QueryMetaParams<T extends QueryMeta> = T extends 'allmessages'
    ? {
          /** Which messages to output. * (default) means all messages. */
          ammessages?: Multi<string>;
          /** Which properties to get. */
          amprop?: QueryMetaProps<'allmessages'>;
          /** Set to enable parser, will preprocess the wikitext of message (substitute magic words, handle templates, etc.). */
          amenableparser?: true;
          /** If set, do not include the content of the messages in the output. */
          amnocontent?: true;
          /**
           * Also include local messages, i.e. messages that don't exist in the software but do exist as in the MediaWiki namespace.
           * This lists all MediaWiki-namespace pages, so it will also list those that aren't really messages such as Common.js.
           */
          amincludelocal?: true;
          /** Arguments to be substituted into message. */
          amargs?: Multi<string>;
          /** Return only messages with names that contain this string. */
          amfilter?: string;
          /** Return only messages in this customisation state. */
          amcustomised?: 'all' | 'modified' | 'unmodified';
          /** Return messages in this language. */
          amlang?: string;
          /** Return messages starting at this message. */
          amfrom?: string;
          /** Return messages ending at this message. */
          amto?: string;
          /** Page name to use as context when parsing message (for amenableparser option). */
          amtitle?: string;
          /** Return messages with this prefix. */
          amprefix?: string;
      }
    : T extends 'authmanagerinfo'
    ? {
          /** Test whether the user's current authentication status is sufficient for the specified security-sensitive operation. */
          amisecuritysensitiveoperation?: string;
          /** Fetch information about the authentication requests needed for the specified authentication action. */
          amirequestsfor?: 'change' | 'create' | 'create-continue' | 'link' | 'link-continue' | 'login' | 'login-continue' | 'remove' | 'unlink';
          /** Merge field information for all authentication requests into one array. */
          amimergerequestfields?: true;
          /** Format to use for returning messages. */
          amimessageformat?: 'html' | 'none' | 'raw' | 'wikitext';
      }
    : T extends 'filerepoinfo'
    ? {
          /** Which repository properties to get (properties available may vary on other wikis). */
          friprop: QueryMetaProps<'filerepoinfo'>;
      }
    : T extends 'languageinfo'
    ? {
          /** Which information to get for each language. */
          liprop: QueryMetaProps<'languageinfo'>;
          /** Language codes of the languages that should be returned, or * for all languages. */
          licode?: string;
          /** When more results are available, use this to continue. */
          licontinue?: string;
      }
    : T extends 'siteinfo'
    ? {
          /** Which information to get */
          siprop: QueryMetaProps<'siteinfo'>;
          /** Return only local or only nonlocal entries of the interwiki map. */
          sifilteriw?: '!local' | 'local';
          /** List all database servers, not just the one lagging the most. */
          sishowalldb?: true;
          /** Lists the number of users in user groups. */
          sinumberingroup?: true;
          /** Language code for localised language names (best effort) and skin names. */
          siinlanguagecode?: string;
      }
    : T extends 'tokens'
    ? {
          /** Types of token to request. */
          type: QueryMetaProps<'tokens'>;
      }
    : T extends 'userinfo'
    ? {
          /** Which pieces of information to include */
          uiprop: QueryMetaProps<'userinfo'>;
          /** With `uiprop=centralids`, indicate whether the user is attached with the wiki identified by this ID. */
          uiattachedwiki?: string;
      }
    : never;

export type QueryMetaParameters<T extends QueryMeta> = { meta: T } & QueryMetaParams<T>;

type QueryMetaFieldResult<T extends QueryMeta, V = any> = { [P in T]: V };
type QueryMetaPropFieldResult<T extends QueryMeta, P extends QueryMetaProps<T>, V = any> = { [Property in ItemOfMulti<P>]: V };
type QueryMetaTokensResult<T extends 'tokens', P extends QueryMetaProps<T>> = { tokens: { [Property in ItemOfMulti<P> as `${Property}token`]: string } };
export type QueryMetaResponse<T extends QueryMeta, P extends QueryMetaProps<T> = never> = T extends 'allmessages'
    ? QueryMetaFieldResult<T, Array<{ name: string; normalizedname: string; content: string }>>
    : T extends 'authmanagerinfo'
    ? { authmanagerinfo: { canauthenticatenow: boolean; cancreateaccounts: boolean; canlinkaccounts: boolean; [key: string]: any } }
    : T extends 'filerepoinfo'
    ? { repos: Array<Partial<QueryMetaPropFieldResult<T, P, boolean | string>>> }
    : T extends 'languageinfo'
    ? { languageinfo: Record<string, QueryMetaPropFieldResult<T, P>> }
    : T extends 'siteinfo'
    ? QueryMetaPropFieldResult<T, P>
    : T extends 'tokens'
    ? QueryMetaTokensResult<T, P>
    : T extends 'userinfo'
    ? { userinfo: { id: number; name: string; anon?: true } & Partial<QueryMetaPropFieldResult<T, P, boolean | string | number>> }
    : QueryMetaFieldResult<T>;

//#endregion

// #region Query Prop

declare enum QueryPropEnum {
    categories,
    categoryinfo,
    // cirrusbuilddoc,
    // cirruscompsuggestbuilddoc,
    // cirrusdoc,
    contributors,
    deletedrevisions,
    duplicatefiles,
    extlinks,
    extracts,
    fileusage,
    // globalusage,
    imageinfo,
    images,
    info,
    iwlinks,
    langlinks,
    links,
    linkshere,
    // mmcontent,
    pageimages,
    pageprops,
    // pageterms,
    // pageviews,
    redirects,
    revisions,
    stashimageinfo,
    templates,
    transcludedin,
    transcodestatus,
    videoinfo
    // wbentityusage
}

export type QueryProp = keyof typeof QueryPropEnum;

export type QueryPropProps<T extends QueryProp> = Multi<
    T extends 'categories'
        ? 'hidden' | 'sortkey' | 'timestamp'
        : T extends 'deletedrevisions'
        ?
              | 'comment'
              | 'content'
              | 'contentmodel'
              | 'flags'
              | 'ids'
              | 'parsedcomment'
              | 'roles'
              | 'sha1'
              | 'size'
              | 'slotsha1'
              | 'slotsize'
              | 'tags'
              | 'timestamp'
              | 'user'
              | 'userid'
        : T extends 'fileusage'
        ? 'pageid' | 'redirect' | 'title'
        : T extends 'imageinfo'
        ?
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
              | 'userid'
        : T extends 'info'
        ?
              | 'associatedpage'
              | 'displaytitle'
              | 'editintro'
              | 'linkclasses'
              | 'notificationtimestamp'
              | 'preloadcontent'
              | 'protection'
              | 'subjectid'
              | 'talkid'
              | 'url'
              | 'varianttitles'
              | 'visitingwatchers'
              | 'watched'
              | 'watchers'
        : T extends 'iwlinks'
        ? 'url'
        : T extends 'langlinks'
        ? 'autonym' | 'langname' | 'url'
        : T extends 'linkshere'
        ? 'pageid' | 'redirect' | 'title'
        : T extends 'pageimages'
        ? 'name' | 'original' | 'thumbnail'
        : T extends 'redirects'
        ? 'fragment' | 'pageid' | 'title'
        : T extends 'revisions'
        ?
              | 'comment'
              | 'content'
              | 'contentmodel'
              | 'flags'
              | 'ids'
              | 'parsedcomment'
              | 'roles'
              | 'sha1'
              | 'size'
              | 'slotsha1'
              | 'slotsize'
              | 'tags'
              | 'timestamp'
              | 'user'
              | 'userid'
        : T extends 'stashimageinfo'
        ?
              | 'badfile'
              | 'bitdepth'
              | 'canonicaltitle'
              | 'commonmetadata'
              | 'dimensions'
              | 'extmetadata'
              | 'metadata'
              | 'mime'
              | 'sha1'
              | 'size'
              | 'thumbmime'
              | 'timestamp'
              | 'url'
        : T extends 'transcludedin'
        ? 'pageid' | 'redirect' | 'title'
        : T extends 'videoinfo'
        ?
              | 'archivename'
              | 'badfile'
              | 'bitdepth'
              | 'canonicaltitle'
              | 'comment'
              | 'commonmetadata'
              | 'derivatives'
              | 'dimensions'
              | 'extmetadata'
              | 'mediatype'
              | 'metadata'
              | 'mime'
              | 'parsedcomment'
              | 'sha1'
              | 'size'
              | 'thumbmime'
              | 'timedtext'
              | 'timestamp'
              | 'uploadwarning'
              | 'url'
              | 'user'
              | 'userid'
        : never
>;

export type QueryPropParams<T extends QueryProp> = T extends 'categories'
    ? {
          /** Which additional properties to get for each category */
          clprop?: QueryPropProps<'categories'>;
          /** Which kind of categories to show. */
          clshow?: 'hidden' | '!hidden';
          /** How many categories to return. */
          cllimit?: number | 'max';
          // /** When more results are available, use this to continue. */
          // clcontinue?: Record<string, string>;
          /** Only list these categories. Useful for checking whether a certain page is in a certain category. */
          clcategories?: Multi<string>;
          /** The direction in which to list. */
          cldir?: 'ascending' | 'descending';
      }
    : T extends 'contributors'
    ? {
          /** Only include users in the given groups. Does not include implicit or auto-promoted groups like *, user, or autoconfirmed. */
          pcgroup?: Multi<string>;
          /** Exclude users in the given groups. Does not include implicit or auto-promoted groups like *, user, or autoconfirmed. */
          pcexcludegroup?: Multi<string>;
          /** Only include users having the given rights. Does not include rights granted by implicit or auto-promoted groups like *, user, or autoconfirmed. */
          pcrights?: Multi<string>;
          /** Exclude users having the given rights. Does not include rights granted by implicit or auto-promoted groups like *, user, or autoconfirmed. */
          pcexcluderights?: Multi<string>;
          /** How many contributors to return. */
          pclimit?: number | 'max';
      }
    : T extends 'deletedrevisions'
    ? {
          /** Which properties to get for each revision */
          drvprop?: QueryPropProps<'deletedrevisions'>;
          /**
           * Which revision slots to return data for, when slot-related properties are included in `drvprops`.
           * If omitted, data from the `main` slot will be returned in a backwards-compatible format.
           */
          drvslots?: 'main' | '*';
          /** Only retrieve the content of the section with this identifier. */
          drvsection?: string;
          /** The timestamp to start enumerating from. Ignored when processing a list of revision IDs. */
          drvstart?: Date;
          /** The timestamp to stop enumerating at. Ignored when processing a list of revision IDs. */
          drvend?: Date;
          /** In which direction to enumerate */
          drvdir?: 'newer' | 'older';
          /** Only list revisions tagged with this tag. */
          drvtag?: string;
          /** Only list revisions by this user. */
          drvuser?: string;
          /** Don't list revisions by this user. */
          drvexcludeuser?: string;
          /** Limit how many revisions will be returned. */
          drvlimit?: number | 'max';
      }
    : T extends 'duplicatefiles'
    ? {
          dfdir?: 'ascending' | 'descending';
          dflocalonly?: true;
          dflimit?: number | 'max';
      }
    : T extends 'extlinks'
    ? {
          elquery?: string;
          elprotocol?:
              | 'bitcoin'
              | 'ftp'
              | 'ftps'
              | 'geo'
              | 'git'
              | 'gopher'
              | 'http'
              | 'https'
              | 'irc'
              | 'ircs'
              | 'magnet'
              | 'mailto'
              | 'matrix'
              | 'mms'
              | 'news'
              | 'nntp'
              | 'redis'
              | 'sftp'
              | 'sip'
              | 'sips'
              | 'sms'
              | 'ssh'
              | 'svn'
              | 'tel'
              | 'telnet'
              | 'urn'
              | 'worldwind'
              | 'xmpp';
          ellimit?: number | 'max';
      }
    : T extends 'extracts'
    ? {
          exchars?: number;
          exsentences?: number;
          exintro?: true;
          explaintext?: true;
          exsectionformat?: 'wiki' | 'plain' | 'raw';
          exlimit?: number | 'max';
      }
    : T extends 'fileusage'
    ? {
          fuprop?: QueryPropProps<'fileusage'>;
          funamespace?: number | '*';
          fushow?: 'redirect' | '!redirect';
          fulimit?: number | 'max';
      }
    : T extends 'imageinfo'
    ? {
          iiprop?: QueryPropProps<'imageinfo'>;
          iilimit?: number | 'max';
          iistart?: Date;
          iiend?: Date;
          iiurlwidth?: number;
          iiurlheight?: number;
          iimetadataversion?: number;
          iiextmetadatalanguage?: string;
          iiextmetadatamultilang?: true;
          iiextmetadatafilter?: Multi<string>;
          iiurlparam?: string;
          iibadfilecontexttitle?: string;
          iilocalonly?: true;
      }
    : T extends 'images'
    ? {
          imlimit?: number | 'max';
          imimages?: Multi<string>;
          imdir?: 'ascending' | 'descending';
      }
    : T extends 'info'
    ? {
          inprop?: QueryPropProps<'info'>;
          inlinkcontext?: string;
          intestactions?: Multi<string>;
          intestactionsdetail?: 'boolean' | 'full' | 'quick';
          intestactionsautocreate?: true;
          inpreloadcustom?: string;
          inpreloadparams?: Multi<string>;
          inpreloadnewsection?: true;
          ineditintrostyle?: 'lessframes' | 'moreframes';
          ineditintroskip?: Multi<string>;
          ineditintrocustom?: string;
      }
    : T extends 'iwlinks'
    ? {
          iwprop?: QueryPropProps<'iwlinks'>;
          iwprefix?: string;
          iwtitle?: string;
          iwdir?: 'ascending' | 'descending';
      }
    : T extends 'langlinks'
    ? {
          llprop?: QueryPropProps<'langlinks'>;
          lllang?: string;
          lltitle?: string;
          lldir?: 'ascending' | 'descending';
          llinlanguagecode?: string;
          lllimit?: number | 'max';
      }
    : T extends 'links'
    ? {
          plnamespace?: number | '*';
          pllimit?: number | 'max';
          pltitles?: Multi<string>;
          pldir?: 'ascending' | 'descending';
      }
    : T extends 'linkshere'
    ? {
          lhprop?: QueryPropProps<'linkshere'>;
          lhnamespace?: number | '*';
          lhshow?: 'redirect' | '!redirect';
          lhlimit?: number | 'max';
      }
    : T extends 'pageimages'
    ? {
          piprop?: QueryPropProps<'pageimages'>;
          pithumbsize?: number;
          pilimit?: number | 'max';
          pilicense?: 'any' | 'free';
          pilangcode?: string;
      }
    : T extends 'pageprops'
    ? { ppprop?: Multi<string> }
    : T extends 'redirects'
    ? {
          rdprop?: QueryPropProps<'redirects'>;
          rdnamespace?: number | '*';
          rdshow?: 'fragment' | '!fragment';
          rdlimit?: number | 'max';
      }
    : T extends 'revisions'
    ? {
          rvprop?: QueryPropProps<'revisions'>;
          rvslots?: 'main' | '*';
          rvlimit?: number | 'max';
          rvsection?: string;
          rvstartid?: number;
          rvendid?: number;
          rvstart?: Date;
          rvend?: Date;
          rvdir?: 'newer' | 'older';
          rvuser?: string;
          rvexcludeuser?: string;
          rvtag?: string;
      }
    : T extends 'stashimageinfo'
    ? {
          siiprop?: QueryPropProps<'stashimageinfo'>;
          siifilekey?: Multi<string>;
          siiurlwidth?: number;
          siiurlheight?: number;
          siiurlparam?: string;
      }
    : T extends 'templates'
    ? {
          tlnamespace?: number | '*';
          tllimit?: number | 'max';
          tltemplates?: Multi<string>;
          tldir?: 'ascending' | 'descending';
      }
    : T extends 'transcludedin'
    ? {
          tiprop?: QueryPropProps<'transcludedin'>;
          tinamespace?: number | '*';
          tishow?: 'redirect' | '!redirect';
          tilimit?: number | 'max';
      }
    : T extends 'videoinfo'
    ? {
          viprop?: QueryPropProps<'videoinfo'>;
          vilimit?: number | 'max';
          vistart?: Date;
          viend?: Date;
          viurlwidth?: number;
          viurlheight?: number;
          vimetadataversion?: number;
          viextmetadatalanguage?: string;
          viextmetadatamultilang?: true;
          viextmetadatafilter?: Multi<string>;
          viurlparam?: string;
          vibadfilecontexttitle?: string;
          vilocalonly?: true;
      }
    : object;

export type QueryPropParameters<T extends QueryProp> = { prop: T; titles?: Multi<string>; pageids?: Multi<number> } & QueryPropParams<T>;

type QueryPropCategoriesResult<P> = Page &
    (P extends undefined
        ? object
        : (Extract<P, 'hidden'> extends never ? unknown : { hidden: boolean }) &
              (Extract<P, 'timestamp'> extends never ? unknown : { timestamp: string }) &
              (Extract<P, 'sortkey'> extends never ? unknown : { sortkey: string; sortkeyprefix: string }));
export type QueryPropResponse<T extends QueryProp, P extends QueryPropProps<T>> = {
    pages: Array<
        Page &
            (T extends 'categories'
                ? { categories: Array<QueryPropCategoriesResult<ItemOfMulti<P>>> }
                : T extends 'categoryinfo'
                ? { categoryinfo: Required<Category> }
                : T extends 'contributors'
                ? { anoncontributors: number; contributors: Array<{ userid: number; name: string }> }
                : object)
    >;
};

// #endregion

// #region Query List

declare enum QueryListEnum {
    // abusefilters,
    // abuselog,
    allcategories,
    alldeletedrevisions
    // allfileusages,
    // allimages,
    // alllinks,
    // allpages,
    // allredirects,
    // allrevisions,
    // alltransclusions,
    // allusers,
    // backlinks,
    // betafeatures,
    // blocks,
    // categorymembers,
    // centralnoticeactivecampaigns,
    // centralnoticelogs,
    // checkuser,
    // checkuserlog,
    // embeddedin,
    // extdistrepos,
    // exturlusage,
    // filearchive,
    // gadgetcategories,
    // gadgets,
    // globalallusers,
    // globalblocks,
    // globalgroups,
    // imageusage,
    // iwbacklinks,
    // langbacklinks,
    // linterrors,
    // logevents,
    // messagecollection,
    // mostviewed,
    // mystashedfiles,
    // pagepropnames,
    // pageswithprop,
    // prefixsearch,
    // protectedtitles,
    // querypage,
    // random,
    // recentchanges,
    // search,
    // tags,
    // threads,
    // usercontribs,
    // users,
    // watchlist,
    // watchlistraw,
    // wblistentityusage,
    // wikisets,
}

export type QueryList = keyof typeof QueryListEnum;

export type QueryListProps<T extends QueryList> = Multi<
    T extends 'allcategories'
        ? 'hidden' | 'size'
        : T extends 'alldeletedrevisions'
        ?
              | 'comment'
              | 'content'
              | 'contentmodel'
              | 'flags'
              | 'ids'
              | 'parsedcomment'
              | 'roles'
              | 'sha1'
              | 'size'
              | 'slotsha1'
              | 'slotsize'
              | 'tags'
              | 'timestamp'
              | 'user'
              | 'userid'
        : never
>;

export type QueryListParams<T extends QueryList> = T extends 'allcategories'
    ? {
          /** Which properties to get */
          acprop?: QueryListProps<'allcategories'>;
          /** The category to start enumerating from. */
          acfrom?: string;
          /** The category to stop enumerating at. */
          acto?: string;
          /** Search for all category titles that begin with this value. */
          acprefix?: string;
          /** Only return categories with at least this many members. */
          acmin?: number;
          /** Only return categories with at most this many members. */
          acmax?: number;
          /** How many categories to return. */
          aclimit?: number | 'max';
          /** When more results are available, use this to continue. */
          accontinue?: Record<string, string>;
          /** Direction to sort in. */
          acdir?: 'ascending' | 'descending';
      }
    : T extends 'alldeletedrevisions'
    ? {
          /** Which properties to get for each revision */
          adrprop?: QueryListProps<'alldeletedrevisions'>;
          /** Which revision slots to return data for, when slot-related properties are included in adrprops. If omitted, data from the main slot will be returned in a backwards-compatible format. */
          adrslots?: 'main' | '*';
          /** Only retrieve the content of the section with this identifier. */
          adrsection?: string;
          /** Only list revisions by this user. */
          adruser?: string;
          /** Only list pages in this namespace. */
          adrnamespace?: number | '*';
          /**
           * The timestamp to start enumerating from.
           *
           * May only be used with _adruser_.
           */
          adrstart?: Date;
          /**
           * The timestamp to stop enumerating at.
           *
           * May only be used with _adruser_.
           */
          adrend?: Date;
          /**
           * Start listing at this title.
           *
           * Cannot be used with _adruser_.
           */
          adrfrom?: string;
          /**
           * Stop listing at this title.
           *
           * Cannot be used with _adruser_.
           */
          adrto?: string;
          /**
           * Search for all page titles that begin with this value.
           *
           * Cannot be used with _adruser_.
           */
          adrprefix?: string;
          /**
           * Don't list revisions by this user.
           *
           * Cannot be used with _adruser_.
           */
          adrexcludeuser?: string;
          /** Only list revisions tagged with this tag. */
          adrtag?: string;
          /** When being used as a generator, generate titles rather than revision IDs. */
          adrgeneratetitles?: true;
          /** Limit how many revisions will be returned. */
          adrlimit?: number | 'max';
          /** When more results are available, use this to continue. */
          adrcontinue?: Record<string, string>;
          /**
           * In which direction to enumerate:
           * * __newer__: List oldest first. Note: adrstart has to be before adrend.
           * * __older__: List newest first (default). Note: adrstart has to be later than adrend.
           */
          adrdir?: 'newer' | 'older';
      }
    : never;

export type QueryListParameters<T extends QueryList> = { list: T } & QueryListParams<T>;

type QueryListFieldResult<T extends QueryList, V> = { [P in T]: Array<V> };
export type QueryListResponse<T extends QueryList, P extends QueryListProps<T> = never> = {
    continue: () => Promise<QueryListResponse<T, P> | null>;
} & (T extends 'allcategories' ? QueryListFieldResult<T, { category: string } & Category> : QueryListFieldResult<T, unknown>);

//#endregion

// #region Query Generator

export type QueryGenerator = QueryProp | QueryList;

export type QueryGeneratorProps<T extends QueryGenerator> = Multi<
    T extends 'categories' ? QueryPropProps<'categories'> : T extends 'allcategories' ? QueryListProps<'allcategories'> : never
>;

type GeneratorPrefix<T extends object> = { [K in keyof T as `g${K extends string ? K : never}`]: T[K] };
export type QueryGeneratorParams<T extends QueryGenerator, P extends QueryProp | undefined = undefined> = (P extends undefined
    ? object
    : QueryPropParams<NonNullable<P>>) & {
    prop?: P;
} & GeneratorPrefix<T extends QueryProp ? QueryPropParams<T> : T extends QueryList ? QueryListParams<T> : object>;

export type QueryGeneratorParameters<T extends QueryGenerator, P extends QueryProp> = {
    generator: T;
    titles?: Multi<string>;
    pageids?: Multi<number>;
} & QueryGeneratorParams<T, P>;

export type QueryGeneratorResponse<T extends QueryGenerator, P extends QueryGeneratorProps<T> = never> = {
    // continue: () => Promise<QueryPropResponse<T, P> | null>;
    pages: Array<Page & (T extends 'categories' ? object : never)>;
};

//#endregion
