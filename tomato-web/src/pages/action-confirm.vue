<template>
    <a-result :title="title" style="height:296px">
        <template #icon>
        <a-icon type="smile" theme="twoTone" />
        </template>
        <template #extra>
        <a-button type="primary" @click="go">
            Next{{pause ? '(暂停中)' : ''}}
        </a-button>
        </template>
    </a-result>
</template>

<script>
import {ConfirmWait, ActionPause} from "config/log"
export default {
    data(){return {title: "", link: "", pause: false, handler: null, time: 0, timeHandler: null}},
    beforeCreate(){this.$emit("show-app")},
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.title = to.params.title
            vm.link = to.params.link
        })
    },
    beforeRouteLeave (to, from, next) {
        this.handler && clearInterval(this.handler)
        document.removeEventListener('keydown', this.onPause)
        next()
    },
    methods: {
        go(){
            this.$utils.app.log(ConfirmWait, {
                link: this.link,
                time: this.time
            })

            this.$router.push({name: this.link == "action-before" && this.$store.state.config.restConfirmGoTomato
                ? "action-tomato"
                : this.link})
        },
        addWaitTime(){
            if(!this.pause) {
                this.time++
            }
        },
        onPause(e){ 
            if(!e.metaKey && !e.ctrlKey) {
                return
            }
            switch(e.key) {
                case this.$store.state.config.pauseKey: {
                    this.pause = true
                    this.$utils.app.log(ActionPause, {
                        action: "confirm",
                        time: this.time,
                        link: this.link
                    })
                }break;
            } 
        }
    },
    created(){
        this.handler = setInterval(() => {
            if(this.time == 135) {
                this.handler = setInterval(() => {
                    this.$emit("notification", {
                        title: "长时间未处理",
                        msg: "请尽快处理",
                        win_time: 5
                    })
                }, 45 * 1000)
            }
            this.addWaitTime()
        }, 1000)
        document.addEventListener('keydown', this.onPause)
    }
}
</script>