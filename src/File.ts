import { QueryProp, QueryPropParams, QueryPropSubProps } from './types/query/prop.js';
import { HttpClient, Multi } from './HttpClient.js';

interface QueryImageInfoOptions {
    props?: Multi<QueryPropSubProps<'imageinfo'>>;
}

interface QueryFileUsageOptions {
    props?: Multi<QueryPropSubProps<'fileusage'>>;
    namespace?: number | '*';
    show?: 'redirect' | '!redirect';
    limit?: number | 'max';
}

export class File {
    private readonly httpClient: HttpClient;
    private readonly title: string;

    constructor(httpClient: HttpClient, filename: string) {
        this.httpClient = httpClient;
        this.title = `File:${filename}`;
    }

    private async queryProp<T extends QueryProp>(prop: T, params: QueryPropParams<T>) {
        const { pages } = await this.httpClient.queryProp(prop, {
            titles: this.title,
            ...params
        });
        return pages?.find((page: any) => page.title === this.title) ?? pages?.[0];
    }

    queryImageInfo(options?: QueryImageInfoOptions) {
        return this.queryProp('imageinfo', {
            iiprop: options?.props
        });
    }

    queryFileUsage(options?: QueryFileUsageOptions) {
        return this.queryProp('fileusage', {
            fuprop: options?.props,
            funamespace: options?.namespace ?? '*',
            fushow: options?.show,
            fulimit: options?.limit ?? 'max'
        });
    }
}
