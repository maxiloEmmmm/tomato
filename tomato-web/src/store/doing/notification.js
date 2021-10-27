const state = {
    ws: [],
    sid: 0,
    cid: 0,
};

const mutations = {
    setInfo(state, payload) {
        if(payload.ws !== undefined) {
            state.ws = (state.ws || [])
            state.ws.push(payload.ws)
        }
        if(payload.sid !== undefined) {
            state.sid = payload.sid
        }
        if(payload.cid !== undefined) {
            state.cid = payload.cid
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations
};