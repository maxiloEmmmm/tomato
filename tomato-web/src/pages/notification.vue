<template>
    <a-card size="small" :title="title">
        <a-button slot="extra" size="small" href="#" @click="handleClose">关闭</a-button>
        {{msg}}
    </a-card>
</template>

<script>
const {remote} = window.require("electron")
export default {
    data() {
        let w = this.$store.state.notification.ws.filter(w => w.key == this.$route.params.id)[0]
        return {
            title: w.title,
            msg: w.msg,
            wid: parseInt(w.wid),
            time: parseFloat(w.time)
        }
    },
    created(){
        if(this.time != 0 && !isNaN(this.time)) {
            setTimeout(this.handleClose, 1000 * this.time)
        }
    },
    methods: {
        handleClose(){
            remote.BrowserWindow.fromId(this.wid).destroy()
        }
    },
}
</script>


