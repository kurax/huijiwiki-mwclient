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

### Creating a client instance

```ts
import { Client } from '@huijiwiki/mwclient';

const client = new Client({
    host: 'en.wikipedia.org', // Required. Site host name, do not include protocol
    protocol: 'https', // Optional. Defaults to 'https'
    apiPath: '/w/api.php' // Optional. Defaults to '/w/api.php'
});
```

### Login

_[MediaWiki API Doc](https://www.mediawiki.org/w/api.php?action=help&modules=login)_

```ts
await client.login('User', 'Password');
```

### Creating/Editing a page

_[MediaWiki API Doc](https://www.mediawiki.org/w/api.php?action=help&modules=edit)_

```ts
await client.editPage('Page', 'Content', { summary: 'Some changes' });
```

More APIs are on the way...

## Error handling

The MediaWiki API returns errors as `200 OK` but this lib will parse it and throw an `Error`, so remember to use `try/catch` when calling an API.

## Contribution

This lib developed and is being internally used by [HuijiWiki](https://www.huijiwiki.com), a wiki farm in Chinese.

The code is too simple to accept help, mostly we will expand it based on our own demands. But you're welcome to make any suggestion.
