import { MediaWikiRequestParams, MediaWikiResponseBody } from '../HttpClient.js';

export interface EditParams extends MediaWikiRequestParams {
    action: 'edit';
    token: string;
    title?: string;
    pageid?: number | string;
    section?: number | 'new';
    sectiontitle?: string;
    text?: string;
    summary?: string;
    tags?: string | string[];
    minor?: boolean;
    notminor?: boolean;
    bot?: boolean;
    baserevid?: number;
    basetimestamp?: Date;
    starttimestamp?: Date;
    recreate?: boolean;
    createonly?: boolean;
    nocreate?: boolean;
    watchlist?: 'watch' | 'unwatch' | 'preferences' | 'nochange';
    watchlistexpiry?: string | Date;
    md5?: string;
    prependtext?: string;
    appendtext?: string;
    undo?: number;
    undoafter?: number;
    redirect?: boolean;
    contentformat?:
        | 'application/json'
        | 'application/octet-stream'
        | 'application/unknown'
        | 'application/x-binary'
        | 'text/css'
        | 'text/javascript'
        | 'text/plain'
        | 'text/unknown'
        | 'text/x-wiki'
        | 'unknown/unknown';
    contentmodel?:
        | 'GadgetDefinition'
        | 'Json.JsonConfig'
        | 'JsonSchema'
        | 'Map.JsonConfig'
        | 'MassMessageListContent'
        | 'NewsletterContent'
        | 'Scribunto'
        | 'SecurePoll'
        | 'Tabular.JsonConfig'
        | 'css'
        | 'flow-board'
        | 'javascript'
        | 'json'
        | 'sanitized-css'
        | 'text'
        | 'translate-messagebundle'
        | 'unknown'
        | 'wikitext';
}

export interface EditResult extends MediaWikiResponseBody {
    edit: {
        result: 'Success' | 'Failed';
        pageid: number;
        title: string;
        contentmodel: string;
        new?: true;
        nochange?: true;
        watched?: true;
        oldrevid?: number;
        newrevid?: number;
        newtimestamp?: string;
    };
}
