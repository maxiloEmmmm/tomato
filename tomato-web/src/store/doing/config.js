import configDefault from "config/tomato"
import maxiloVue from "maxilo-vue"

const state = Object.assign({}, configDefault)

export const configToDB = (config) => {
    Object.keys(config).forEach(k => {
        switch(k) {
            case "volume":
            case "defaultWorkTime":
            case "defaultRestTime":
            case "workTipTime":
            case "waitTipInterval":
            case "maxWaitTime":
                config[k] = `${parseInt(maxiloVue.make("utils").tool.number(config[k]))}`
                break
            case "blinkTomatoPercent":
                config[k] = `${parseFloat(maxiloVue.make("utils").tool.number(config[k]))}`
                break
            case "confirmTipMissFocus":
            case "workEndMusicEnable":
            case "restEndMusicEnable":
            case "showAppMissFocus":
            case "blinkEnable":
            case "restConfirmGoTomato":
                config[k] = config[k] ? "1" : "0"
                break
            default:
                break
        }
    })
    return config
}

export const dbToStore = (config) => {
    Object.keys(config).forEach(k => {
        if(config[k] !== "") {
            switch(k) {
                case "volume":
                    let volume = parseInt(maxiloVue.make("utils").tool.number(config[k]))
                    if(volume < 1 || volume > 6) {
                        volume = configDefault.volume
                    }
                    config[k] = volume
                case "defaultWorkTime":
                case "waitTipInterval":
                case "defaultRestTime":
                case "workTipTime":
                case "maxWaitTime":
                    config[k] = parseInt(maxiloVue.make("utils").tool.number(config[k]))
                    break
                case "confirmTipMissFocus":
                case "workEndMusicEnable":
                case "restEndMusicEnable":
                case "blinkEnable":
                case "showAppMissFocus":
                case "restConfirmGoTomato":
                    config[k] = config[k] == "1"
                    break
                case "blinkTomatoPercent":
                    config[k] = parseFloat(maxiloVue.make("utils").tool.number(config[k]))
                    break
                default:
                    break
            }
        }else {
            config[k] = configDefault[k]
        }
    })
    return config
}

const mutations = {
    setConfig(state, payload) {
        Object.assign(state, payload)
        let transfer = configToDB({...payload})
        Object.keys(transfer).forEach(p => {
            maxiloVue.make("utils").app.config(p, transfer[p])
        })
    },
    setDBConfig(state, payload){
        Object.assign(state, dbToStore(payload))
    }
}

export default {
    namespaced: true,
    state,
    mutations
};