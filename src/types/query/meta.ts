import { TokenType } from './meta/tokens.js';

declare const QUERY_META_ALL_MESSAGES = 'allmessages';
declare const QUERY_META_AUTH_MANAGER_INFO = 'authmanagerinfo';
declare const QUERY_META_BABEL = 'babel';
declare const QUERY_META_FEATURE_USAGE = 'featureusage';
declare const QUERY_META_FILE_REPO_INFO = 'filerepoinfo';
declare const QUERY_META_GLOBAL_PREFERENCES = 'globalpreferences';
declare const QUERY_META_GLOBAL_RENAME_STATUS = 'globalrenamestatus';
declare const QUERY_META_GLOBAL_USER_INFO = 'globaluserinfo';
declare const QUERY_META_LANGUAGE_INFO = 'languageinfo';
declare const QUERY_META_LANGUAGE_STATS = 'languagestats';
declare const QUERY_META_LINTER_STATS = 'linterstats';
declare const QUERY_META_MANAGE_MESSAGE_GROUPS = 'managemessagegroups';
declare const QUERY_META_MESSAGE_GROUPS = 'messagegroups';
declare const QUERY_META_MESSAGE_GROUP_STATS = 'messagegroupstats';
declare const QUERY_META_MESSAGE_TRANSLATIONS = 'messagetranslations';
declare const QUERY_META_NOTIFICATIONS = 'notifications';
declare const QUERY_META_SITE_INFO = 'siteinfo';
declare const QUERY_META_SITE_VIEWS = 'siteviews';
declare const QUERY_META_TOKENS = 'tokens';
declare const QUERY_META_UNREAD_NOTIFICATION_PAGES = 'unreadnotificationpages';
declare const QUERY_META_USER_INFO = 'userinfo';
declare const QUERY_META_WIKIBASE = 'wikibase';

declare const QueryMetaParams: {
    allmessages: any;
    authmanagerinfo: any;
    babel: any;
    featureusage: any;
    filerepoinfo: any;
    globalpreferences: any;
    globalrenamestatus: any;
    globaluserinfo: any;
    languageinfo: any;
    languagestats: any;
    linterstats: any;
    managemessagegroups: any;
    messagegroups: any;
    messagegroupstats: any;
    messagetranslations: any;
    notifications: any;
    siteinfo: any;
    siteviews: any;
    tokens: { type: TokenType | TokenType[] };
    unreadnotificationpages: any;
    userinfo: any;
    wikibase: any;
};

declare const QueryMetaResult: {
    allmessages: any;
    authmanagerinfo: any;
    babel: any;
    featureusage: any;
    filerepoinfo: any;
    globalpreferences: any;
    globalrenamestatus: any;
    globaluserinfo: any;
    languageinfo: any;
    languagestats: any;
    linterstats: any;
    managemessagegroups: any;
    messagegroups: any;
    messagegroupstats: any;
    messagetranslations: any;
    notifications: any;
    siteinfo: any;
    siteviews: any;
    tokens: {
        createaccounttoken?: string;
        csrftoken?: string;
        logintoken?: string;
        patroltoken?: string;
        rollbacktoken?: string;
        userrightstoken?: string;
        watchtoken?: string;
    };
    unreadnotificationpages: any;
    userinfo: any;
    wikibase: any;
};

export type QueryMeta =
    | typeof QUERY_META_ALL_MESSAGES
    | typeof QUERY_META_AUTH_MANAGER_INFO
    | typeof QUERY_META_BABEL
    | typeof QUERY_META_FEATURE_USAGE
    | typeof QUERY_META_FILE_REPO_INFO
    | typeof QUERY_META_GLOBAL_PREFERENCES
    | typeof QUERY_META_GLOBAL_RENAME_STATUS
    | typeof QUERY_META_GLOBAL_USER_INFO
    | typeof QUERY_META_LANGUAGE_INFO
    | typeof QUERY_META_LANGUAGE_STATS
    | typeof QUERY_META_LINTER_STATS
    | typeof QUERY_META_MANAGE_MESSAGE_GROUPS
    | typeof QUERY_META_MESSAGE_GROUPS
    | typeof QUERY_META_MESSAGE_GROUP_STATS
    | typeof QUERY_META_MESSAGE_TRANSLATIONS
    | typeof QUERY_META_NOTIFICATIONS
    | typeof QUERY_META_SITE_INFO
    | typeof QUERY_META_SITE_VIEWS
    | typeof QUERY_META_TOKENS
    | typeof QUERY_META_UNREAD_NOTIFICATION_PAGES
    | typeof QUERY_META_USER_INFO
    | typeof QUERY_META_WIKIBASE;
export type QueryMetaParams = typeof QueryMetaParams;
export type QueryMetaResult = typeof QueryMetaResult;
