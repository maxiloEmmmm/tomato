import maxiloVue from "maxilo-vue"
import * as logType from "config/log"
function log() {
    this.RestTime = async () => {
        let db = await maxiloVue.make("db")
        return db.iquery(`
            select 
                case when ceil(t1.value / 60) == 0 then 1 else ceil(t1.value / 60) end  AS time,
                count(1) as total
            from 
                log as s 
                left join log_info as t1 on s.id = t1.log_id and t1.key = 'current'
            where
                action='${logType.RestEnd}'
            group by time
        `)
    }

    this.TomatoTime = async () => {
        let db = await maxiloVue.make("db")
        return db.iquery(`
            SELECT
                case when ceil(t1.value / 60) == 0 then 1 else ceil(t1.value / 60) end AS time,
                count( 1 ) AS total 
            FROM
                log AS s
                LEFT JOIN log_info AS t1 ON s.id = t1.log_id AND t1.KEY = 'current' 
            WHERE
                ACTION = '${logType.TomatoEnd}' 
            GROUP BY
                time
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