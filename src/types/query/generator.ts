export type QueryGenerator =
    | 'allcategories'
    | 'alldeletedrevisions'
    | 'allfileusages'
    | 'allimages'
    | 'alllinks'
    | 'allpages'
    | 'allredirects'
    | 'allrevisions'
    | 'alltransclusions'
    | 'backlinks'
    | 'categories'
    | 'categorymembers'
    | 'deletedrevisions'
    | 'duplicatefiles'
    | 'embeddedin'
    | 'exturlusage'
    | 'fileusage'
    | 'images'
    | 'imageusage'
    | 'iwbacklinks'
    | 'langbacklinks'
    | 'links'
    | 'linkshere'
    | 'messagecollection'
    | 'mostviewed'
    | 'pageswithprop'
    | 'prefixsearch'
    | 'protectedtitles'
    | 'querypage'
    | 'random'
    | 'recentchanges'
    | 'redirects'
    | 'revisions'
    | 'search'
    | 'templates'
    | 'transcludedin'
    | 'watchlist'
    | 'watchlistraw'
    | 'wblistentityusage';

// --- Params -------------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type QueryGeneratorParams<T extends QueryGenerator> = any;

// --- Result -------------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type QueryGeneratorResult<T extends QueryGenerator> = any;
