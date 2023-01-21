import { MediaWikiResponseBody } from '../HttpClient.js';

export interface QueryResult<T> extends MediaWikiResponseBody {
    batchcomplete?: string | boolean;
    query: T;
}
