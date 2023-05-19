import { HttpClient } from './HttpClient.js';

export class Category {
    private readonly httpClient: HttpClient;
    private readonly name: string;

    constructor(httpClient: HttpClient, name: string) {
        this.httpClient = httpClient;
        this.name = name;
    }
}
