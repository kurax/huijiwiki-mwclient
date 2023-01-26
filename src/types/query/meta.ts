import { Multi } from '../../HttpClient.js';

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

// --- Params -------------------------

type ParamsTokens = {
    type: Multi<'*' | 'createaccount' | 'csrf' | 'deleteglobalaccount' | 'login' | 'patrol' | 'rollback' | 'setglobalaccountstatus' | 'userrights' | 'watch'>;
};

export type QueryMetaParams<T extends QueryMeta> = T extends 'tokens' ? ParamsTokens : any;

// --- Result -------------------------

type QueryTokens = {
    tokens: {
        createaccounttoken?: string;
        csrftoken?: string;
        logintoken?: string;
        patroltoken?: string;
        rollbacktoken?: string;
        userrightstoken?: string;
        watchtoken?: string;
    };
};

export type QueryMetaResult<T extends QueryMeta> = T extends 'tokens' ? QueryTokens : any;
