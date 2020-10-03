<template>
    <a-result :title="title" style="height:296px">
        <template #icon>
        <a-icon type="smile" theme="twoTone" />
        </template>
        <template #extra>
        <a-button type="primary" @click="go">
            Next
        </a-button>
        </template>
    </a-result>
</template>

<script>
import {ConfirmWait} from "config/log"
export default {
    data(){return {title: "", link: "", handler: null, time: 0, timeHandler: null, timeWait: 0}},
    beforeCreate(){this.$emit("show-app")},
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.title = to.params.title
            vm.link = to.params.link
        })
    },
    beforeRouteLeave (to, from, next) {
        this.handler && clearInterval(this.handler)
        this.timeHandler && clearInterval(this.timeHandler)
        next()
    },
    methods: {
        go(){
            this.$utils.app.log(ConfirmWait, {
                time: this.timeWait
            })

            this.$router.push({name: this.link == "action-before" && this.$store.state.config.restConfirmGoTomato
                ? "action-tomato"
                : this.link})
        }
    },
    created(){
        this.timeHandler = setInterval(() => {
            this.timeWait++
        }, 1000)
        this.handler = setInterval(() => {
            if(this.time >= 135) {
                clearInterval(this.handler)
                this.handler = setInterval(() => {
                    this.$emit("notification", {
                        title: "长时间未处理",
                        msg: "请尽快处理",
                        win_time: 5
                    })
                }, 45 * 1000)
            }
            this.time++
        }, 1000)
    }
}
</script>