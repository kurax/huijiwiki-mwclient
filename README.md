# @huijiwiki/mwclient

An opinionated Node.js wrapper for MediaWiki APIs.

Currently under alpha development.

**This library is built for ESM only.**

## Requirements

-   Node.js 16.3+

## Installation

```
npm install @huijiwiki/mwclient
```

or if you use yarn

```
yarn add @huijiwiki/mwclient
```

## Features

-   Everyday actions for your bots, with optional advanced options.
-   Promise-based API.
-   TypeScript is supported.

## Usage

-   The names of functions (actions) are kind of self-descriptive.
-   Critical or commonly used parameters will be function arguments; \
    With an optional object as the last argument, which contains other parameters that make sense for the action.
-   Consult the MediaWiki API documentation for explainations of the parameters.
-   This library is aiming to work with the latest MediaWiki LTS version, older versions may have compatibility issues.

### Creating a client instance

```ts
import { Client } from '@huijiwiki/mwclient';

const client = new Client({
    host: 'en.wikipedia.org', // Required. Site host name, do not include protocol
    protocol: 'https', // Optional. Defaults to 'https'
    apiPath: '/w/api.php' // Optional. Defaults to '/w/api.php'
});
```

### Login <font size="2">[[Details]](https://www.mediawiki.org/wiki/API:Login)</font>

```ts
await client.login('User', 'Password');
```

### Creating/Editing a page <font size="2">[[Details]](https://www.mediawiki.org/wiki/API:Edit)</font>

```ts
await client.editPage('Page', 'Content', { summary: 'Some changes' });
```

More APIs are on the way...

## Error handling

The MediaWiki API returns errors as `200 OK` but this lib will parse it and throw an `Error`, so remember to use `try/catch` when calling an API.

## Contribution

This lib developed and is being internally used by [HuijiWiki](https://www.huijiwiki.com), a wiki farm in Chinese.

The code is too simple to accept help, mostly we will expand it based on our own demands. But you're welcome to make any suggestion.
