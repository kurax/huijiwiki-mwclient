import { MediaWikiRequestParams, MediaWikiResponseBody } from '../HttpClient.js';

export interface LogoutParams extends MediaWikiRequestParams {
    action: 'logout';
    token: string;
}

export interface LogoutResult extends MediaWikiResponseBody {
    logout: Record<string, never>;
}
