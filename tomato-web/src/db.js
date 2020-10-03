import * as initSqlJs from 'sql.js/dist/sql-asm'
import maxiloVue from 'maxilo-vue';
var fs = window.require("fs")
maxiloVue.register({
    register(app){
        app.bind("db", async app => {
            let dbFile = 'db.sqlite'
            dbFile = maxiloVue.make("utils").getStorePath(dbFile)
            let dbExist = fs.existsSync(dbFile)
            let sql = await initSqlJs()
            var db = new sql.Database(dbExist ? fs.readFileSync(dbFile) : null)
            if(!dbExist) {
                db.run(`
                    create table config(key text, value text); 
                    create table log(id, action text, created_at text);
                    create table log_info(log_id, key text, value text); 
                `)
            }

            db.iquery = function(){
                let result = db.exec(...arguments)[0]
                if(!result) {
                    return []
                }
                let tmp = []
                let vLen = result.values.length
                for(let i = 0; i < vLen; i++) {
                    let t = {}
                    for(let j = 0; j < result.columns.length; j++) {
                        t[result.columns[j]] = result.values[i][j]
                    }
                    tmp.push(t)
                }
                return tmp
            }

            db.iquery_one = function(sql, k){
                let result = db.exec(sql)[0]
                if(!result) {
                    return null
                }
                let tmp = {}
                for(let j = 0; j < result.columns.length; j++) {
                    tmp[result.columns[j]] = result.values[0][j]
                }

                return k !== undefined ? tmp[k] : tmp
            }

            db.iexec = function(){
                let result = db.run(...arguments)
                fs.writeFileSync(dbFile, Buffer.from(db.export()))
                return result
            }

            return db
        })
    },
    boot(app){}
})