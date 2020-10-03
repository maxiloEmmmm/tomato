import maxiloVue from "maxilo-vue"
import * as logType from "config/log"
function log() {
    this.RestTime = async () => {
        let db = await maxiloVue.make("db")
        return db.iquery(`
            select 
                t1.value as time,
                count(1) as total
            from 
                log as s 
                left join log_info as t1 on s.id = t1.log_id and t1.key = "current"
            where
                action="${logType.RestEnd}"
            group by t1.value
        `)
    }

    this.TomatoTime = async () => {
        let db = await maxiloVue.make("db")
        return db.iquery(`
            select 
                t1.value as time,
                count(1) as total
            from 
                log as s 
                left join log_info as t1 on s.id = t1.log_id and t1.key = "current"
            where
                action="${logType.TomatoEnd}"
            group by t1.value
        `)
    }

    this.Count = async () => {
        let db = await maxiloVue.make("db")
        return db.iquery(`
            select 
                action,
                count(1) as count
            from 
                log 
            group by action
        `)
    }
}

export default log