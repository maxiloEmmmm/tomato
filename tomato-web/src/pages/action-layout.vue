<template>
    <div style="min-height: 100vh; display:flex;flex-direction: column;">
        <div v-if="_isNotBegin" style="text-align:center;flex: 0 0 auto;">
            <div class="nav-wrap"><a-icon type="left-square" @click="back" /></div>
            <a-icon style="cursor:pointer" type="setting" @click="onSetting"/>
            <a-divider type="vertical" />
            <a-icon style="cursor:pointer" type="bar-chart" @click="onChart"/>
        </div>
        <router-view @hide-app="hideApp" @show-app="showApp" @notification="notification" @play="doPlay" @touch="hookChromeAutoPlay" slot="top" style="flex: 1 0 auto" @navInfo="doNav"></router-view>
        <a-rate style="flex: 0 0 auto" class="rate" v-model="volume" :count="6"><a-icon slot="character" type="sound" /></a-rate>
        <audio ref="music" muted :src="pathtomusic"></audio>
    </div>
</template>

<style lang="scss" scoped>
    .rate {display: flex; justify-content: space-around; width: 100%; height:44px;border-top: 1px dashed;}
    .nav-wrap {
        text-align: center; width:100%; position: relative;
        & > i {font-size: 50px; color: pink; cursor: pointer;
            &:hover {font-size: 55px; transition: all 0.2s; }
            transition: all 1s;
        }
    }
</style>

<script>
let crn = (vm, to) => {
    vm.currentRouteName = !["action-start", "action-confirm", "action-rest"].includes(to.name) 
        ? to.name
        : ''
}
let vtor = (volume) => {
    return (volume - 1) * 0.2
}
const time_ready_music = require('assets/media/time-ready.mp3')
const end_music = require('assets/media/end.mp3')
const tip_music = require('assets/media/tip.mp3')
import { mapMutations, mapState } from 'vuex'
const {remote, ipcRenderer} = window.require("electron")
const ico = require("../../../common/favicon.ico")
import maxiloVue from "maxilo-vue"
ipcRenderer.on('refresh-config', (e, msg) => {
    maxiloVue.make("utils").app.refreshConfig(msg)
});
export default {
    data(){return {pathtomusic: time_ready_music, rate: 2, currentRouteName: '', routerMeta: {args: {}, name: {}}}},
    methods: {
        ...mapMutations('notification', ['setInfo']),
        hookChromeAutoPlay(){this.$refs.music.muted = false },
        doPlay(payload){
            this.pathtomusic = {
                tomato_end: time_ready_music,
                rest_end: end_music
            }[payload.key]
            this.$nextTick(() => this.playMusic(payload.end, payload.callback))
        },
        playMusic( end = 0, end_func = null ){
            end = parseFloat(end)
            this.$refs.music.play()
            this.$refs.music.currentTime = 0
            this.$refs.music.loop = false
            if(end !== 0) {
                setTimeout(() => {
                    this.$refs.music.pause()
                    end_func && end_func()
                }, 1000 * end)
            }else {
                let cb = () => {  
                    this.$refs.music.removeEventListener(cb)
                    end_func && end_func()
                }
                this.$refs.music.addEventListener('ended', cb, false);
            }
        },
        back(){this.$router.push({name: this.routerMeta.name, params: this.routerMeta.args})},
        doNav(meta){Object.assign(this.routerMeta, meta)},
        onSetting(){
            let settingWin = new remote.BrowserWindow({
                frame: false, show: true, icon: ico
            })
            settingWin.loadURL(this.$utils.href('/setting'))
            this.setInfo({
                sid: settingWin.id,
            })
        },
        onChart(){
            let chartWin = new remote.BrowserWindow({
                frame: true, show: true, icon: ico, height: 600,
            })
            chartWin.loadURL(this.$utils.href('/chart'))
            this.setInfo({
                cid: chartWin.id,
            })
            chartWin.openDevTools()
        },
        notification(payload){
            let notificationWin = new remote.BrowserWindow({
                frame: false, show: false, title: '提醒', icon: ico,
                width: 350,
                height: 90,
                x: 0,
                y: 0
            })
            this.setInfo({
                title: payload.title,
                msg: payload.msg,
                wid: notificationWin.id,
                time: !!payload.win_time ? payload.win_time : 0,
            })
            notificationWin.loadURL(this.$utils.href('/notification'))
            
            if(payload.focus) {
                notificationWin.show()
            }else {
                notificationWin.showInactive()
            }
            notificationWin.moveTop()
            notificationWin.setAlwaysOnTop(true)
            notificationWin.openDevTools()
        },
        showApp(){
            let win = this.getApp()
            win.moveTop()
            win.setAlwaysOnTop(true)
            if(this.$store.state.config.showAppMissFocus) {
                win.show()
            }else {
                win.showInactive()
            }
        },
        hideApp(){this.getApp().hide()},
        getApp(){
            return remote.BrowserWindow.getAllWindows().find(v => {
                return v.getTitle() == "番茄钟"
            })
        }
    },
    mounted(){
        this.$refs.music.volume = vtor(this.volume)
    },
    computed: {
        _isNotBegin(){return !!this.currentRouteName},
        volume: {
            get(){
                return this.$store.state.config.volume
            },
            set(volume){
                this.$store.commit("config/setConfig", {volume})
                this.$refs.music.volume = vtor(volume)
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => crn(vm, to))
    },
    beforeRouteUpdate(to, from, next){
        crn(this, to)
        next()
    },
}
</script>