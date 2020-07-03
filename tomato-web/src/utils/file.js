import maxiloVue from 'maxilo-vue'
const fs = window.require("fs")
const utils = maxiloVue.make("utils")
const file = function(name){
    let cpath = utils.getStorePath(name)

    this.read = function(d){
        if(!fs.existsSync(cpath)) {
            this.write(d)
            return d
        }else {
            return JSON.parse(fs.readFileSync(cpath))
        }
    }

    this.write = function(d){
        return !fs.writeFileSync(cpath, d)
    }
}

utils.add('file', file)