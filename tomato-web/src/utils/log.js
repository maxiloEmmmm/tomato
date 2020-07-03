import maxiloVue from 'maxilo-vue'
import message from 'ant-design-vue/lib/message';

const path = window.require('path')
const fs = window.require("fs")
const {remote} = window.require("electron")
const utils = maxiloVue.make("utils")
const log = function(type){
    this.type = type
    this.cpath = remote.app.isPackaged ? remote.app.getPath('userData') : "./"
    this.file = this.type + '.log'
    this.add = function(msg){
        fs.writeFile(path.resolve(this.cpath, this.file), msg + '\r\n', {flag: 'a'}, err => {
            if(err) {
                message.error('日志保存出错哦.')
            }
        })
    }
    let _p = path.resolve(this.cpath, this.file)
    if(!fs.existsSync(_p)) {
        fs.writeFile(_p, "", err => {
            if(err) {
                message.error('日志保存出错哦.')
            }
        })
    }
}

utils.add('log', log)