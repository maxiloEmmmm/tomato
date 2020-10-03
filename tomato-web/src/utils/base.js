import maxiloVue from 'maxilo-vue'
const path = window.require('path')
const {remote} = window.require("electron")
const utils = maxiloVue.make("utils")
import moment from "moment"
utils.add('href', (v) => {
    let href = window.location.href;
    let i = href.indexOf('#');
    let base = i >= 0 ? href.slice(0, i) : href;
    return base + '#' + v
})

utils.add('getStorePath', function(name){
    return path.resolve(remote.app.isPackaged ? remote.app.getPath('userData') : "./", name)
})

utils.add("time", function () {
    return moment().format("YYYY-MM-DD HH:mm:ss")
})

utils.add("uuid", function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
})