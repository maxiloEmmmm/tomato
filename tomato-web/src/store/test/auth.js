import types from './mutations-type';
import maxiloVue from 'maxilo-vue';
import { TEST } from '../../api/test';
const state = {
    userinfo: {}
};

const getters = {
    userinfo: state => state.userinfo,
    login: state => Object.keys(state.userinfo).length,
};

const actions = {
    login({ commit }, userinfo) {
        return new Promise(async (resolve, reject) => {
            let response = await maxiloVue.http.instance.post(TEST.LOGIN, userinfo);
            try {
                if (response.data.appcode === security.loginStatus.success) {
                    commit(types.USER.SET_USER, response.data.data);
                    resolve(response);
                } else {
                    reject(response);
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    loginOut({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await maxiloVue.http.instance.post(TEST.LOGIN_OUT);
                if (response.data.appcode === security.loginStatus.success) {
                    commit(types.USER.SET_DESTORY);
                    resolve(response);
                } else {
                    reject(response);
                }
            } catch (error) {
                reject(error.response)
            }
        });
    },
    test({commit}, u) {
        commit(types.USER.SET_USER, u);
    }
};

const mutations = {
    [types.USER.SET_DESTORY](state) {
        state.userinfo = {};
    },
    [types.USER.SET_USER](state, userData) {
        state.userinfo = userData;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};