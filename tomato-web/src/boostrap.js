import maxiloVue from 'maxilo-vue';
import configDefault from "config/tomato"
import {configToDB} from 'store/doing/config'
maxiloVue.register({
    register(app){
        
    },
    async boot(app){
        let db = await app.make("db")
        let utils = app.make("utils")
        let store = app.make("store").instance
        let existKeys = {}
        let cs = utils.tool.makeKey(db.iquery("select * from config"), "key")
        Object.keys(cs).forEach(c => {
            existKeys[c] = cs[c].value
        })
        utils.add("app.refreshConfig", (tmp) => {
            store.commit("config/setDBConfig", tmp)
        })
        utils.add("app.config", (k, v) => {
            if(k === undefined) {
                return utils.tool.makeKey(db.iquery("select * from config"), "key")
            }
            if(v === undefined) {
                return db.iquery_one(db.iquery(`select value from config where key="${k}"`), "value")
            }

            db.iexec(`update config set value="${v}" where key="${k}"`)
        })

        utils.add("app.log", (action, obj) => {
            let id = utils.uuid()
            db.iexec(`insert into log(id, action, created_at) values("${id}", "${action}", "${utils.time()}")`)
            Object.keys(obj).forEach(k => {
                db.iexec(`insert into log_info(log_id, key, value) values("${id}", "${k}", "${obj[k]}")`)
            })
        })

        let appendConfigKeys = Object.keys(configDefault).filter(c => existKeys[c] === undefined)
        if(appendConfigKeys.length != 0) {
            let configInitSql = "insert into `config`(`key`, `value`) values"
            appendConfigKeys.forEach(c => {
                configInitSql += `("${c}", "${configToDB({[c]: configDefault[c]})[c]}"),`
            })
            db.iexec(configInitSql.slice(0, -1))
        }

        let dbConfig = utils.tool.makeKey(db.iquery("select * from config"), "key")
        let dc = {}
        Object.keys(dbConfig).forEach(c => {
            dc[c] = dbConfig[c].value
        })
        store.commit("config/setDBConfig", dc)
    }
})