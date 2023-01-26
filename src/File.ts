import { FormData } from 'formdata-node';
import { fileFromPath } from 'formdata-node/file-from-path';

import { ImageInfo, QueryProp, QueryPropParams, QueryPropSubProps } from './types/query/prop.js';
import { HttpClient, MediaWikiResponseBody, Multi } from './HttpClient.js';

interface QueryImageInfoOptions {
    props?: Multi<QueryPropSubProps<'imageinfo'>>;
}

interface UploadOptions {
    comment?: string;
    text?: string;
}

interface UploadResult extends MediaWikiResponseBody {
    upload: {
        result: 'Success';
        filename: string;
        imageinfo: ImageInfo;
    };
}

interface QueryFileUsageOptions {
    props?: Multi<QueryPropSubProps<'fileusage'>>;
    namespace?: number | '*';
    show?: 'redirect' | '!redirect';
    limit?: number | 'max';
}

export class File {
    private readonly httpClient: HttpClient;
    private readonly filename: string;
    private readonly title: string;

    constructor(httpClient: HttpClient, filename: string) {
        this.httpClient = httpClient;
        this.filename = filename;
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

    async upload(path: string, options?: UploadOptions) {
        const file = await fileFromPath(path);
        const form = new FormData();
        form.set('action', 'upload');
        form.set('filename', this.filename);
        form.set('file', file);
        form.set('filesize', file.size);
        form.set('async', '1');
        form.set('ignorewarnings', '1');
        if (options?.comment) form.set('comment', options.comment);
        if (options?.text) form.set('text', options.text);
        form.set('token', await this.httpClient.getToken());
        return (await this.httpClient.postFormData<UploadResult>(form)).upload;
    }
}
