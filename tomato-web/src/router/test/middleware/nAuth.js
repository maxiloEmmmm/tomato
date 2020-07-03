export default function (store, to, from, next) {
    if (store.getters['testAuth/login']) {
        next('/platform/index');
        return false;
    }
    return true;
}