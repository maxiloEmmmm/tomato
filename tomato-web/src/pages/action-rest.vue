<template>
    <div style="padding: 4px 8px;margin-top:20px">
        <ysz-list-item>
            <div slot="left" class="reset-view">{{ time }}分</div>
            <ysz-list-item-top>
                <div slot="top">
                    <a-button @click="up5" size="small" style="margin-right: 5px">+5</a-button>
                    <a-button @click="down5" size="small" style="margin-right: 5px">-5</a-button>
                    <a-button @click="reset" size="small">重置</a-button>
                </div>
                <a-button @click="newTomato" size="small" style="color:pink">开始新番茄!</a-button>
            </ysz-list-item-top>
        </ysz-list-item>
        <div style="text-align: center; margin-top: 45px;">
            <a-progress :percent="_percent" type="circle" :format="percent => `${Math.ceil(percent)}%`"/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .reset-view {    width: 120px; height: 120px; font-size: 40px;
        display: flex; justify-content: center; margin-left: 40px;
        align-items: center; border: 1px #cecece solid;
        border-radius: 6px}
</style>
<script>
import {RestStart, RestEnd, RestToTomato, MusicPlayRestEnd} from "config/log"
export default {
    data(){return {current: 0, time: 5, handler: null}},
    computed: {_percent(){return (this.current / (this.time * 60)) * 100}},
    beforeCreate(){
        this.$emit("hide-app")
    },
    created(){
        this.time = this.$store.state.config.defaultRestTime
        this.$emit("notification", {
            title: `${this.time}分钟休息开始!`,
            msg: "~",
            win_time: 6
        })
        this.$utils.app.log(RestStart, {
            time: this.time,
        })
        this.handler = setInterval(() => {
            this.current++

            if(this.current >= this.time * 60) {
                if(this.$store.state.config.resetEndMusicEnable) {
                    this.$utils.app.log(MusicPlayRestEnd)
                    this.$emit("play", { key: "reset_end" })
                }
                this.pause()
                this.$utils.app.log(RestEnd, {
                    time: this.time,
                    current: this.current,
                })
                this.$emit("notification", {
                    title: "休息结束!",
                    msg: "~",
                    win_time: 6
                })
                this.$router.push({name: "action-confirm", params: {
                    link: "action-before",
                    title: "下一轮!"
                }})
            }
        }, 1000);
    },
    methods:{
        up5(){if (this.time + 5 > 20) return; this.time += 5},
        down5(){if (this.time - 5 <= 0) return; this.time += -5},
        reset(){this.current = 0},
        pause(){
            clearInterval(this.handler)
            this.handler = null
        },
        newTomato(){
            this.$confirm({
                title: '确定放弃休息?',
                okText: "对的",
                cancelText: "取消",
                onOk:() => {
                    this.$message.warn(() => <div>即将迎来下列并发症!
<ysz-list>
<a-badge color="red" text="肩周炎" />
<a-badge color="red" text="腰间盘突出" />
<a-badge color="red" text="颈椎病" />
<a-badge color="red" text="光头" />
</ysz-list>
</div>, 6)
                    this.pause()
                    this.$utils.app.log(RestToTomato, {
                        time: this.time,
                        current: this.current
                    })
                    this.$utils.app.log(RestEnd, {
                        time: this.time,
                        current: this.current,
                    })
                    this.$router.push({name: "action-before"})
                },
                onCancel() {},
            });
        }
    }
}
</script>