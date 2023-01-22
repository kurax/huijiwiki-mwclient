import { TokenType } from './meta/tokens.js';

export type QueryMeta =
    | 'allmessages'
    | 'authmanagerinfo'
    | 'babel'
    | 'featureusage'
    | 'filerepoinfo'
    | 'globalpreferences'
    | 'globalrenamestatus'
    | 'globaluserinfo'
    | 'languageinfo'
    | 'languagestats'
    | 'linterstats'
    | 'managemessagegroups'
    | 'messagegroups'
    | 'messagegroupstats'
    | 'messagetranslations'
    | 'notifications'
    | 'siteinfo'
    | 'siteviews'
    | 'tokens'
    | 'unreadnotificationpages'
    | 'userinfo'
    | 'wikibase';

export type QueryMetaParams = {
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

export type QueryMetaResult = {
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
