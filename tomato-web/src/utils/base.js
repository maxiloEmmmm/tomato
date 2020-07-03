import maxiloVue from 'maxilo-vue'
const path = window.require('path')
const {remote} = window.require("electron")
const utils = maxiloVue.make("utils")
utils.add('href', (v) => {
    let href = window.location.href;
    let i = href.indexOf('#');
    let base = i >= 0 ? href.slice(0, i) : href;
    return base + '#' + v
})

utils.add('getStorePath', function(name){
    return path.resolve(remote.app.isPackaged ? remote.app.getPath('userData') : "./", name)
})