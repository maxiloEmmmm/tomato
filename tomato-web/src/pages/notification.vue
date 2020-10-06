<template>
    <a-card size="small" :title="_title">
        <a-button slot="extra" size="small" href="#" @click="handleClose">关闭</a-button>
        {{_msg}}
    </a-card>
</template>

<script>
import { mapState } from 'vuex'
const {remote} = window.require("electron")
export default {
    computed: {
        ...mapState('notification', {
            _title: state => state.title,
            _msg: state => state.msg,
            _wid: state => state.wid,
            _time: state => parseFloat(state.time)
        })
    },
    created(){
        console.log(this)
        if(this._time != 0 && !isNaN(this._time)) {
            setTimeout(this.handleClose, 1000 * this._time)
        }
    },
    methods: {
        handleClose(){remote.BrowserWindow.fromId(this._wid).destroy()}
    },
}
</script>


