function p(u = '', pre = '/draft'){
    return pre + u;
}
export const SAVE = p('/save');
export const SHOW = p();

export default {
    SAVE,
    SHOW
}