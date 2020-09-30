<template>
    <a-result :title="title" style="height:296px">
        <template #icon>
        <a-icon type="smile" theme="twoTone" />
        </template>
        <template #extra>
        <a-button type="primary">
            <router-link :to="{name: link}">Next</router-link>
        </a-button>
        </template>
    </a-result>
</template>

<script>
export default {
    data(){return {title: "", link: "", handler: null, time: 0}},
    beforeCreate(){this.$emit("show-app")},
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.title = to.params.title
            vm.link = to.params.link
        })
    },
    beforeRouteLeave (to, from, next) {
        this.handler && clearInterval(this.handler)
        next()
    },
    created(){
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
                console.log(this.time)
            this.time++
        }, 1000)
    }
}
</script>