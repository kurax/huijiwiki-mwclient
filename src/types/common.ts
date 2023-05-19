export type Multi<T> = T | T[];
export type ItemOfMulti<T> = T extends Array<infer P> ? P : T;
export type Nullable<T> = T | undefined;

export interface APIParameters {
    /** Which action to perform. */
    action: string;
    /**
     * Maximum lag can be used when MediaWiki is installed on a database replicated cluster.
     * To save actions causing any more site replication lag, this parameter can make the client wait until the replication lag is less than the specified value.
     * In case of excessive lag, error code `maxlag` is returned with a message like `Waiting for $host: $lag seconds` lagged.
     */
    maxlag?: number;
    /** Set the `s-maxage` HTTP cache control header to this many seconds. Errors are never cached. */
    smaxage?: number;
    /** Set the `max-age` HTTP cache control header to this many seconds. Errors are never cached. */
    maxage?: number;
    /** Verify that the user is logged in if set to `user`, not logged in if set to `anon`, or has the bot user right if `bot`. */
    assert?: 'anon' | 'bot' | 'user';
    /** Verify the current user is the named user. */
    assertuser?: string;
    /** Any value given here will be included in the response. May be used to distinguish requests. */
    requestid?: string;
    /** Include the hostname that served the request in the results. */
    servedby?: true;
    /** Include the current timestamp in the result. */
    curtimestamp?: true;
    /** Include the languages used for uselang and errorlang in the result. */
    responselanginfo?: true;
    /**
     * When accessing the API using a cross-domain AJAX request (CORS), set this to the originating domain.
     * This must be included in any pre-flight request, and therefore must be part of the request URI (not the POST body).
     *
     * For authenticated requests, this must match one of the origins in the `Origin` header exactly, so it has to be set to something like https://en.wikipedia.org or https://meta.wikimedia.org.
     * If this parameter does not match the `Origin` header, a 403 response will be returned.
     * If this parameter matches the `Origin` header and the origin is allowed, the `Access-Control-Allow-Origin` and `Access-Control-Allow-Credentials` headers will be set.
     *
     * For non-authenticated requests, specify the value *.
     * This will cause the `Access-Control-Allow-Origin` header to be set, but `Access-Control-Allow-Credentials` will be `false` and all user-specific data will be restricted.
     */
    origin?: string;
    /**
     * Language to use for message translations.
     * `action=query&meta=siteinfo` with `siprop=languages` returns a list of language codes, or specify `user` to use the current user's language preference, or specify `content` to use this wiki's content language.
     */
    uselang?: string;
    /** Variant of the language. Only works if the base language supports variant conversion. */
    variant?: string;
    /** Format to use for warning and error text output */
    errorformat?: 'plaintext' | 'wikitext' | 'html' | 'raw' | 'none' | 'bc';
    /**
     * Language to use for warnings and errors.
     * `action=query&meta=siteinfo` with `siprop=languages` returns a list of language codes, or specify `content` to use this wiki's content language, or specify `uselang` to use the same value as the _uselang_ parameter.
     */
    errorlang?: string;
    /** If given, error texts will use locally-customized messages from the MediaWiki namespace. */
    errorsuselocal?: true;
    /** Encodes most (but not all) non-ASCII characters as UTF-8 instead of replacing them with hexadecimal escape sequences. */
    utf8?: true;
    /** Encodes all non-ASCII characters using hexadecimal escape sequences. */
    ascii?: true;
    /**
     * The function in which the result will be wrapped. For safety, all user-specific data will be restricted. A number of things are disabled for security:
     * * Tokens cannot be obtained so state-changing actions aren't possible.
     * * The client is treated as an anonymous user (i.e. not logged in) for all purposes, even after logging in through `action=login`. This means that modules which require additional rights won't work unless anonymous users are allowed to use them.
     */
    callback?: string;
}

export declare interface ErrorData {
    code: string;
    text: string;
    module: string;
}

export interface APIResponse {
    warnings?: ErrorData[];
    errors?: ErrorData[];
    docref?: string;
}
