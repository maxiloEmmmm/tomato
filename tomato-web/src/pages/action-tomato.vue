<template>
    <div style="padding:4px; flex-direction: column; display: flex;">
        <div class="goes-list">
            <a-progress :percent="_percent" type="circle">
                <div slot="format" style="font-size: 18px">
                    {{Math.floor(current / 60)}}分{{current % 60}}秒 / {{time}}分`
                </div>
            </a-progress>
        </div>
        <ysz-list :group="4" :row="true" :no-line="true" style="align-items:center;flex-wrap:nowrap!important">
            <div class="action-wrap" :class="{'action-disabled': _running}" @click="run">
                <a-icon :class="{active: action == 'run'}" type="play-circle" />
                <span class="action-tip">开始🏁</span></div>
            <div class="action-wrap" :class="{'action-disabled': !_running}" @click="pause">
                <a-icon :class="{active: action == 'pause'}" type="pause" />
                <span class="action-tip">暂停⏸</span></div>
            <div class="action-wrap" @click="reset">
                <a-icon type="reload" />
                <span class="action-tip">🏎</span></div>
            <div class="action-wrap" @click="rest">
                <a-icon type="frown" />
                <span class="action-tip">休息🛏</span></div>
        </ysz-list>
    </div>
</template>

<style lang="scss" scoped>
    .goes-list {margin-top: 34px;
        display: flex; justify-content: center; font-size: 24px;
    }
    .action-wrap {text-align: center; width:100%; position: relative;
        & > i {font-size: 50px; color: pink; cursor: pointer;
            &:hover, &.active {
                border: 2px solid; padding: 4px; border-radius: 8px;
            }
            transition: all 0.2s;

            &:hover {
                font-size: 45px; transition: all 0.2s;
                & + .action-tip { opacity: 1; position: absolute; bottom: -24px;
                    left: 0; right: 0; display: inline-block; 
                }
            }
        }

        & > .action-tip {
            opacity: 0; font-size: 14px; line-height: 1.5; display: none;
            color: goldenrod
        }

        &.action-disabled > i {color: grey }
    }
</style>

<script>
import {TomatoStart, TomatoEnd, TomatoToRest, TomatoReset, MusicPlayTomatoEnd, ActionPause} from "config/log"
export default {
    data(){return {time: 25, current: 0, action: '', handler: null}},
    computed: {
        _percent(){return (this.current / (this.time * 60)) * 100},
        _running(){return !!this.handler && this.current < (this.time * 60)}
    },
    beforeCreate(){
        this.$emit('navInfo', {name: 'action-before'})
    },
    created(){
        this.time = this.$store.state.config.defaultWorkTime

        if(this.$route.params.tomato !== undefined) {
            this.time = this.$utils.tool.number(this.$route.params.tomato)
        }

        this.$utils.app.log(TomatoStart, {
            time: this.time
        })
        document.addEventListener('keydown', this.onPause)
        this.run()
    },
    beforeRouteLeave (to, from, next) {
        this.pause()
        document.removeEventListener('keydown', this.onPause)
        next()
    },
    methods: {
        setActionStatus(mode){this.action = mode},
        run(){
            this.$nextTick(() => {
                if(this._running) return
                this.setActionStatus('run');
                this.$emit("notification", {
                    title: `${this.time}分钟番茄${this.current != 0 ? '继续' : '开始'}!`,
                    msg: "~",
                    win_time: 6
                })
                this.$emit("hide-app")
                this.handler = setInterval(() => {
                    this.current++
                    if(this.$store.state.config.blinkEnable) {
                        let t = this.$store.state.config.blinkTomatoPercent * this.time
                        if(t > this.$store.state.config.maxBlinkMinute) {
                            t = this.$store.state.config.maxBlinkMinute
                        }

                        if(this.current % Math.floor(t * 60) === 0) {
                            this.$emit("notification", {
                                title: `请眨眨眼😉`,
                                msg: "~",
                                win_time: 4,
                                x: 200, y: 200
                            })
                        }
                    }
                    if(this.$store.state.config.workTipTime > 0 && this.current == (this.time - this.$store.state.config.workTipTime) * 60) {
                        this.$utils.app.log(MusicPlayTomatoEnd)
                        this.$emit("notification", {
                            title: this.$store.state.config.workTipMsg ? this.$store.state.config.workTipMsg : "提示!",
                            msg: "~",
                            win_time: 6
                        })
                    }
                    if(this.current >= this.time * 60) {
                        this.$utils.app.log(TomatoEnd, {
                            time: this.time,
                            current: this.current,
                        })
                        this.pause()
                        if(this.$store.state.config.resetEndMusicEnable) {
                            this.$emit("play", { key: "tomato_end" })
                        }
                        this.$emit("notification", {
                            title: "番茄熟了!",
                            msg: "~",
                            win_time: 6
                        })
                        this.$router.push({name: "action-confirm", params: {
                            link: "action-rest",
                            title: "休息!"
                        }})
                    }
                }, 1000)
            })
        },
        pause(){
            this.setActionStatus('pause')
            this.handler && clearInterval(this.handler)
            this.handler = null
        },
        onPause(e){ 
            if(!e.metaKey && !e.ctrlKey) {
                return
            }
            switch(e.key) {
                case this.$store.state.config.pauseKey: {
                    this.pause()
                    this.$utils.app.log(ActionPause, {
                        action: "tomato",
                        time: this.time,
                        current: this.current
                    })
                }break;
            } 
        },
        reset(){
            this.$utils.app.log(TomatoReset, {
                current: this.current,
                time: this.time
            })
            this.$utils.app.log(TomatoEnd, {
                time: this.time,
                current: this.current,
            })
            this.current = 0
        },
        rest(){
            this.$utils.app.log(TomatoToRest, {
                current: this.current,
                time: this.time
            })
            this.$utils.app.log(TomatoEnd, {
                time: this.time,
                current: this.current,
            })
            this.$router.push({name: "action-rest"})
        }
    }
}
</script>