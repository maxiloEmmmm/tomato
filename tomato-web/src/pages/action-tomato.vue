<template>
    <div style="padding:4px; flex-direction: column; display: flex;">
        <a-rate class="goes-list" count="25" :disabled="true" :value="_rate"><a-icon slot="character" type="sound" /></a-rate>
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
        display: flex; flex-wrap: wrap; border: 1px dashed pink;
        padding: 8px 0; margin: 8px 8px 0 8px; border-radius: 6px;
        &::v-deep .ant-rate-star {
            text-align: center; flex: 0 0 20%; margin-right: 0;
        }
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
import {TomatoStart, TomatoEnd, TomatoToRest, MusicPlayTomatoEnd, ActionPause} from "config/log"
export default {
    data(){return {time: 25, current: 0, action: '', handler: null}},
    computed: {
        _rate(){return Math.floor((this.current / (this.time * 60)) * 25)},
        _running(){return !!this.handler && this.current < this.time}
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

        this.run()
    },
    beforeRouteLeave (to, from, next) {
        this.pause()
        next()
    },
    methods: {
        setActionStatus(mode){this.action = mode},
        run(){
            if(this._running) return
            this.$emit("notification", {
                title: `${this.time}分钟番茄${this.current != 0 ? '继续' : '开始'}!`,
                msg: "~",
                win_time: 6
            })
            this.$emit("hide-app")
            this.setActionStatus('run');
            this.handler = setInterval(() => {
                this.current++
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
                    this.pause(true)
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
        },
        pause(force = false){
            if(!this._running && !force) return
            this.setActionStatus('pause')
            clearInterval(this.handler)
            this.handler = null
            this.$utils.app.log(ActionPause, {
                action: "tomato",
                time: this.time,
                current: this.current
            })
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