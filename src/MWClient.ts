import got from 'got';
import fs from 'node:fs';

import { getRelativePath } from './utils.js';

export interface ClientOptions {
    host: string;
    protocol?: 'http' | 'https';
    apiPath?: string;
    restApi?: {
        path?: string;
        version?: 'v1';
    };
}

export class MWClient {
    private readonly userAgent: string;
    private readonly siteUrl: URL;
    private readonly apiEp: URL;
    private readonly restEp: URL | undefined;

    constructor(readonly options: ClientOptions) {
        const protocol = options.protocol === 'http' ? 'http' : 'https';
        this.siteUrl = new URL(`${protocol}://${options.host}`);
        this.apiEp = new URL(options.apiPath ?? '/w/api.php', this.siteUrl);
        if (options.restApi != null) this.restEp = new URL(`${options.restApi.path ?? '/w/rest.php'}/${options.restApi.version ?? 'v1'}`, this.siteUrl);

        this.userAgent = 'HuijiMWClient/Unknown';
        for (let i = 1; i <= 2; i++) {
            const path = getRelativePath(`${'../'.repeat(i)}package.json`, import.meta.url);
            if (fs.existsSync(path)) {
                const packageJson = JSON.parse(fs.readFileSync(path).toString());
                this.userAgent = `HuijiMWClient/${packageJson.version} Got/${packageJson.dependencies.got.replace('^', '')}`;
                break;
            }
        }
    }
}
