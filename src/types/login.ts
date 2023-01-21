import { MediaWikiError, MediaWikiRequestParams, MediaWikiResponseBody } from '../HttpClient.js';

export interface LoginParams extends MediaWikiRequestParams {
    action: 'login';
    lgname: string;
    lgpassword: string;
    lgtoken: string;
    lgdomain?: string;
}

export interface LoginResult extends MediaWikiResponseBody {
    login: {
        result: 'Success' | 'Failed' | 'WrongToken' | 'NeedToken' | 'Aborted';
        lguserid: number;
        lgusername: string;
        reason: Omit<MediaWikiError, 'module'>;
    };
}
