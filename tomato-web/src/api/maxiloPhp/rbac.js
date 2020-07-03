import restful from 'test/restful';
export const TEST = {
    LOGIN: '/test/auth/login',
    LOGIN_OUT: '/test/auth/out',
    MOCK: '/mock/test'
};

export const ROLE_GROUP = restful('/rbac/roleGroup', {
    EXIST: '/exist',
});
export const ROLE = restful('/rbac/role', {
    EXIST: '',
});

export default {
    TEST,
    ROLE_GROUP,
    ROLE
};