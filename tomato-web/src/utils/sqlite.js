import maxiloVue from 'maxilo-vue'
const utils = maxiloVue.make("utils")
const sqlite = function(){
    console.log(utils.getStorePath('db'))
}

utils.add('sqlite', sqlite)