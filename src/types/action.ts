declare const ACTION_ABUSE_FILTER_CHECK_MATCH = 'abusefiltercheckmatch';
declare const ACTION_ABUSE_FILTER_CHECK_SYNTAX = 'abusefilterchecksyntax';
declare const ACTION_ABUSE_FILTER_EVAL_EXPRESSION = 'abusefilterevalexpression';
declare const ACTION_ABUSE_FILTER_UNBLOCK_AUTOPROMOTE = 'abusefilterunblockautopromote';
declare const ACTION_ABUSE_LOG_PRIVATE_DETAILS = 'abuselogprivatedetails';
declare const ACTION_AGGREGATE_GROUPS = 'aggregategroups';
declare const ACTION_ANTI_SPOOF = 'antispoof';
declare const ACTION_BLOCK = 'block';
declare const ACTION_CENTRAL_AUTH_TOKEN = 'centralauthtoken';
declare const ACTION_CENTRAL_NOTICE_CDN_CACHE_UPDATE_BANNER = 'centralnoticecdncacheupdatebanner';
declare const ACTION_CENTRAL_NOTICE_CHOICE_DATA = 'centralnoticechoicedata';
declare const ACTION_CENTRAL_NOTICE_QUERY_CAMPAIGN = 'centralnoticequerycampaign';
declare const ACTION_CHANGEAUTHENTICATIONDATA = 'changeauthenticationdata';
declare const ACTION_CHANG_CONTENT_MODEL = 'changecontentmodel';
declare const ACTION_CHECK_TOKEN = 'checktoken';
declare const ACTION_CIRRUS_CONFIG_DUMP = 'cirrus-config-dump';
declare const ACTION_CIRRUS_MAPPING_DUMP = 'cirrus-mapping-dump';
declare const ACTION_CIRRUS_PROFILES_DUMP = 'cirrus-profiles-dump';
declare const ACTION_CIRRUS_SETTINGS_DUMP = 'cirrus-settings-dump';
declare const ACTION_CLEAR_HAS_MSG = 'clearhasmsg';
declare const ACTION_CLIENT_LOGIN = 'clientlogin';
declare const ACTION_COMPARE = 'compare';
declare const ACTION_CREATE_ACCOUNT = 'createaccount';
declare const ACTION_CREATE_LOCAL_ACCOUNT = 'createlocalaccount';
declare const ACTION_DELETE = 'delete';
declare const ACTION_DELETE_GLOBA_ACCOUNT = 'deleteglobalaccount';
declare const ACTION_ECHO_MARK_READ = 'echomarkread';
declare const ACTION_ECHO_MARK_SEEN = 'echomarkseen';
declare const ACTION_ECHO_MUTE = 'echomute';
declare const ACTION_EDIT = 'edit';
declare const ACTION_EDIT_MASS_MESSAGE_LIST = 'editmassmessagelist';
declare const ACTION_EMAIL_USER = 'emailuser';
declare const ACTION_EXPAND_TEMPLATES = 'expandtemplates';
declare const ACTION_FANCY_CAPTCHA_RELOAD = 'fancycaptchareload';
declare const ACTION_FEATURED_FEED = 'featuredfeed';
declare const ACTION_FEED_CONTRIBUTIONS = 'feedcontributions';
declare const ACTION_FEED_RECENT_CHANGES = 'feedrecentchanges';
declare const ACTION_FEED_HREADS = 'feedthreads';
declare const ACTION_FEED_WATCHLIST = 'feedwatchlist';
declare const ACTION_FILE_REVERT = 'filerevert';
declare const ACTION_FLOW_PARSOID_UTILS = 'flow-parsoid-utils';
declare const ACTION_FLOW = 'flow';
declare const ACTION_FLOW_THANK = 'flowthank';
declare const ACTION_GLOBAL_BLOCK = 'globalblock';
declare const ACTION_GLOBAL_PREFERENCE_OVERRIDES = 'globalpreferenceoverrides';
declare const ACTION_GLOBAL_PREFERENCES = 'globalpreferences';
declare const ACTION_GLOBAL_USER_RIGHTS = 'globaluserrights';
declare const ACTION_GRAPH = 'graph';
declare const ACTION_GROUP_REVIEW = 'groupreview';
declare const ACTION_HELP = 'help';
declare const ACTION_IMAGE_ROTATE = 'imagerotate';
declare const ACTION_IMPORT = 'import';
declare const ACTION_JSON_CONFIG = 'jsonconfig';
declare const ACTION_LANGUAGE_SEARCH = 'languagesearch';
declare const ACTION_LINK_ACCOUNT = 'linkaccount';
declare const ACTION_LOGIN = 'login';
declare const ACTION_LOGOUT = 'logout';
declare const ACTION_MANAGE_TAGS = 'managetags';
declare const ACTION_MASS_MESSAGE = 'massmessage';
declare const ACTION_MERGE_HISTORY = 'mergehistory';
declare const ACTION_MOVE = 'move';
declare const ACTION_NEWSLETTER_SUBSCRIBE = 'newslettersubscribe';
declare const ACTION_OPEN_SEARCH = 'opensearch';
declare const ACTION_OPTIONS = 'options';
declare const ACTION_PARAM_INFO = 'paraminfo';
declare const ACTION_PARSE = 'parse';
declare const ACTION_PATROL = 'patrol';
declare const ACTION_PROTECT = 'protect';
declare const ACTION_PURGE = 'purge';
declare const ACTION_QUERY = 'query';
declare const ACTION_REMOVE_AUTHENTICATION_DATA = 'removeauthenticationdata';
declare const ACTION_RESET_PASSWORD = 'resetpassword';
declare const ACTION_REVISION_DELETE = 'revisiondelete';
declare const ACTION_ROLLBACK = 'rollback';
declare const ACTION_RSD = 'rsd';
declare const ACTION_SEARCH_TRANSLATIONS = 'searchtranslations';
declare const ACTION_SET_GLOBAL_ACCOUNT_STATUS = 'setglobalaccountstatus';
declare const ACTION_SET_NOTIFICATION_TIMESTAMP = 'setnotificationtimestamp';
declare const ACTION_SET_PAGE_LANGUAGE = 'setpagelanguage';
declare const ACTION_SHORTEN_URL = 'shortenurl';
declare const ACTION_SITE_MATRIX = 'sitematrix';
declare const ACTION_SPAM_BLACKLIST = 'spamblacklist';
declare const ACTION_STREAM_CONFIGS = 'streamconfigs';
declare const ACTION_STRIKE_VOTE = 'strikevote';
declare const ACTION_TAG = 'tag';
declare const ACTION_TEMPLATE_DATA = 'templatedata';
declare const ACTION_THANK = 'thank';
declare const ACTION_THREAD_ACTION = 'threadaction';
declare const ACTION_TITLE_BLACKLIST = 'titleblacklist';
declare const ACTION_TOR_BLOCK = 'torblock';
declare const ACTION_TRANSCODE_RESET = 'transcodereset';
declare const ACTION_TRANSLATION_AIDS = 'translationaids';
declare const ACTION_TRANSLATION_REVIEW = 'translationreview';
declare const ACTION_TRANSLATION_STATS = 'translationstats';
declare const ACTION_TTM_SERVER = 'ttmserver';
declare const ACTION_UNBLOCK = 'unblock';
declare const ACTION_UNDELETE = 'undelete';
declare const ACTION_UNLINK_ACCOUNT = 'unlinkaccount';
declare const ACTION_UPLOAD = 'upload';
declare const ACTION_USER_RIGHTS = 'userrights';
declare const ACTION_VALIDATE_PASSWORD = 'validatepassword';
declare const ACTION_WATCH = 'watch';
declare const ACTION_WEBAPP_MANIFEST = 'webapp-manifest';
declare const ACTION_WEB_AUTHN = 'webauthn';
declare const ACTION_WIKI_LOVE = 'wikilove';

export type Action =
    | typeof ACTION_ABUSE_FILTER_CHECK_MATCH
    | typeof ACTION_ABUSE_FILTER_CHECK_SYNTAX
    | typeof ACTION_ABUSE_FILTER_EVAL_EXPRESSION
    | typeof ACTION_ABUSE_FILTER_UNBLOCK_AUTOPROMOTE
    | typeof ACTION_ABUSE_LOG_PRIVATE_DETAILS
    | typeof ACTION_AGGREGATE_GROUPS
    | typeof ACTION_ANTI_SPOOF
    | typeof ACTION_BLOCK
    | typeof ACTION_CENTRAL_AUTH_TOKEN
    | typeof ACTION_CENTRAL_NOTICE_CDN_CACHE_UPDATE_BANNER
    | typeof ACTION_CENTRAL_NOTICE_CHOICE_DATA
    | typeof ACTION_CENTRAL_NOTICE_QUERY_CAMPAIGN
    | typeof ACTION_CHANGEAUTHENTICATIONDATA
    | typeof ACTION_CHANG_CONTENT_MODEL
    | typeof ACTION_CHECK_TOKEN
    | typeof ACTION_CIRRUS_CONFIG_DUMP
    | typeof ACTION_CIRRUS_MAPPING_DUMP
    | typeof ACTION_CIRRUS_PROFILES_DUMP
    | typeof ACTION_CIRRUS_SETTINGS_DUMP
    | typeof ACTION_CLEAR_HAS_MSG
    | typeof ACTION_CLIENT_LOGIN
    | typeof ACTION_COMPARE
    | typeof ACTION_CREATE_ACCOUNT
    | typeof ACTION_CREATE_LOCAL_ACCOUNT
    | typeof ACTION_DELETE
    | typeof ACTION_DELETE_GLOBA_ACCOUNT
    | typeof ACTION_ECHO_MARK_READ
    | typeof ACTION_ECHO_MARK_SEEN
    | typeof ACTION_ECHO_MUTE
    | typeof ACTION_EDIT
    | typeof ACTION_EDIT_MASS_MESSAGE_LIST
    | typeof ACTION_EMAIL_USER
    | typeof ACTION_EXPAND_TEMPLATES
    | typeof ACTION_FANCY_CAPTCHA_RELOAD
    | typeof ACTION_FEATURED_FEED
    | typeof ACTION_FEED_CONTRIBUTIONS
    | typeof ACTION_FEED_RECENT_CHANGES
    | typeof ACTION_FEED_HREADS
    | typeof ACTION_FEED_WATCHLIST
    | typeof ACTION_FILE_REVERT
    | typeof ACTION_FLOW_PARSOID_UTILS
    | typeof ACTION_FLOW
    | typeof ACTION_FLOW_THANK
    | typeof ACTION_GLOBAL_BLOCK
    | typeof ACTION_GLOBAL_PREFERENCE_OVERRIDES
    | typeof ACTION_GLOBAL_PREFERENCES
    | typeof ACTION_GLOBAL_USER_RIGHTS
    | typeof ACTION_GRAPH
    | typeof ACTION_GROUP_REVIEW
    | typeof ACTION_HELP
    | typeof ACTION_IMAGE_ROTATE
    | typeof ACTION_IMPORT
    | typeof ACTION_JSON_CONFIG
    | typeof ACTION_LANGUAGE_SEARCH
    | typeof ACTION_LINK_ACCOUNT
    | typeof ACTION_LOGIN
    | typeof ACTION_LOGOUT
    | typeof ACTION_MANAGE_TAGS
    | typeof ACTION_MASS_MESSAGE
    | typeof ACTION_MERGE_HISTORY
    | typeof ACTION_MOVE
    | typeof ACTION_NEWSLETTER_SUBSCRIBE
    | typeof ACTION_OPEN_SEARCH
    | typeof ACTION_OPTIONS
    | typeof ACTION_PARAM_INFO
    | typeof ACTION_PARSE
    | typeof ACTION_PATROL
    | typeof ACTION_PROTECT
    | typeof ACTION_PURGE
    | typeof ACTION_QUERY
    | typeof ACTION_REMOVE_AUTHENTICATION_DATA
    | typeof ACTION_RESET_PASSWORD
    | typeof ACTION_REVISION_DELETE
    | typeof ACTION_ROLLBACK
    | typeof ACTION_RSD
    | typeof ACTION_SEARCH_TRANSLATIONS
    | typeof ACTION_SET_GLOBAL_ACCOUNT_STATUS
    | typeof ACTION_SET_NOTIFICATION_TIMESTAMP
    | typeof ACTION_SET_PAGE_LANGUAGE
    | typeof ACTION_SHORTEN_URL
    | typeof ACTION_SITE_MATRIX
    | typeof ACTION_SPAM_BLACKLIST
    | typeof ACTION_STREAM_CONFIGS
    | typeof ACTION_STRIKE_VOTE
    | typeof ACTION_TAG
    | typeof ACTION_TEMPLATE_DATA
    | typeof ACTION_THANK
    | typeof ACTION_THREAD_ACTION
    | typeof ACTION_TITLE_BLACKLIST
    | typeof ACTION_TOR_BLOCK
    | typeof ACTION_TRANSCODE_RESET
    | typeof ACTION_TRANSLATION_AIDS
    | typeof ACTION_TRANSLATION_REVIEW
    | typeof ACTION_TRANSLATION_STATS
    | typeof ACTION_TTM_SERVER
    | typeof ACTION_UNBLOCK
    | typeof ACTION_UNDELETE
    | typeof ACTION_UNLINK_ACCOUNT
    | typeof ACTION_UPLOAD
    | typeof ACTION_USER_RIGHTS
    | typeof ACTION_VALIDATE_PASSWORD
    | typeof ACTION_WATCH
    | typeof ACTION_WEBAPP_MANIFEST
    | typeof ACTION_WEB_AUTHN
    | typeof ACTION_WIKI_LOVE;
