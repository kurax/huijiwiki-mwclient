declare const TOKEN_TYPE_ALL = '*';
declare const TOKEN_TYPE_CREATE_ACCOUNT = 'createaccount';
declare const TOKEN_TYPE_CSRF = 'csrf';
declare const TOKEN_TYPE_DELETE_GLOBAL_ACCOUNT = 'deleteglobalaccount';
declare const TOKEN_TYPE_LOGIN = 'login';
declare const TOKEN_TYPE_PATROL = 'patrol';
declare const TOKEN_TYPE_ROLLBACK = 'rollback';
declare const TOKEN_TYPE_SET_GLOBAL_ACCOUNT_STATUS = 'setglobalaccountstatus';
declare const TOKEN_TYPE_USER_RIGHTS = 'userrights';
declare const TOKEN_TYPE_WATCH = 'watch';

export type TokenType =
    | typeof TOKEN_TYPE_ALL
    | typeof TOKEN_TYPE_CREATE_ACCOUNT
    | typeof TOKEN_TYPE_CSRF
    | typeof TOKEN_TYPE_DELETE_GLOBAL_ACCOUNT
    | typeof TOKEN_TYPE_LOGIN
    | typeof TOKEN_TYPE_PATROL
    | typeof TOKEN_TYPE_ROLLBACK
    | typeof TOKEN_TYPE_SET_GLOBAL_ACCOUNT_STATUS
    | typeof TOKEN_TYPE_USER_RIGHTS
    | typeof TOKEN_TYPE_WATCH;
