import restful from 'test/restful';
export const MENU = restful('/menus');
export const USER = restful('/users');

export const CURD = restful('/curd', {
    ROLE: '/role',
    PRIV: '/priv'
});
export const USER_GROUP = restful('/user_groups',{
    USER: '/user'
});
export const ROLE = restful('/rbac/role', {
    USER: '/user',
    USER_GROUP: '/user_group'
});

export const FIELD_ACTION = restful('/field_action', {
    PERMISSION_TABLE: '/schema/table',
    PERMISSION_TABLE_GENERAL: '/schema/table',
    PERMISSION_TABLE_STORE: '/schema/table'
});

export const SCHEMA = {
    FIELD: '/schema/table'
};

export const POST = restful('/post');
export default {
    MENU,
    USER,
    USER_GROUP,
    ROLE,
    FIELD_ACTION,
    POST,
    CURD,
    SCHEMA
};