const state = {
    title: '',
    msg: '',
    wid: 0,
    time: 0
};

const mutations = {
    setInfo(state, payload) {
        Object.assign(state, payload)
    }
};

export default {
    namespaced: true,
    state,
    mutations
};