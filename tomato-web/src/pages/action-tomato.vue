<template>
    <div style="padding:4px; flex-direction: column; display: flex;">
        <a-rate class="goes-list" count="25" :disabled="true" :value="_rate"><a-icon slot="character" type="sound" /></a-rate>
        <ysz-list :group="3" :row="true" :no-line="true" style="align-items:center">
            <div class="action-wrap" :class="{'action-disabled': _running}" @click="run">
                <a-icon :class="{active: action == 'run'}" type="play-circle" />
                <span class="action-tip">开始🏁</span></div>
            <div class="action-wrap" :class="{'action-disabled': !_running}" @click="pause">
                <a-icon :class="{active: action == 'pause'}" type="pause" />
                <span class="action-tip">暂停⏸</span></div>
            <div class="action-wrap" @click="reset">
                <a-icon type="reload" />
                <span class="action-tip">重新开始🏎</span></div>
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
        if(this.$route.params.tomato !== undefined) {
            this.time = parseInt(this.$route.params.tomato)
        }

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
                title: `${this.time}分钟番茄开始!`,
                msg: "~",
                win_time: 6
            })
            this.$emit("hide-app")
            this.setActionStatus('run');
            this.handler = setInterval(() => {
                this.current++
                if(this.current >= this.time * 60) {
                    this.pause(true)
                    //this.$emit("play", { key: "tomato_end" })
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
        },
        reset(){this.current = 0}
    }
}
</script>