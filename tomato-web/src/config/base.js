import maxiloVue from 'maxilo-vue';
const config = maxiloVue.make("config")
const utils = maxiloVue.make("utils")
const configs = {
    debug: process.env.VUE_APP_DEBUG,
    locale: 'zh_cn',
    baseURL: process.env.VUE_APP_SERVER,
    storeKey: 'hBCVcLsFDCk1Ygo3',
};

config.merge(configs)
export default config.cs;