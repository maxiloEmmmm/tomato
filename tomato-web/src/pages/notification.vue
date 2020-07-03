<template>
    <a-alert
      :message="_title"
      :description="_msg"
      type="info"
      show-icon
      close-text="Close Now"
      @close="handleClose"
      style="height:100vh"
    />
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
        if(this._time != 0 && !isNaN(this._time)) {
            setTimeout(this.handleClose, 1000 * this._time)
        }
    },
    methods: {
        handleClose(){remote.BrowserWindow.fromId(this._wid).destroy()}
    },
}
</script>


