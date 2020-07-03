export default function (store, to, from, next) {
    if (!store.getters['testAuth/login']) {
        next('/platform/login');
        return false;
    }
    return true;
}