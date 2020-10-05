<template>
    <a-modal visible title="设置" width="80%" @ok="onOk" @cancel="onCancel">
      <ysz-list row :group="2">
          <ysz-list-item>
              <span slot="left">默认番茄时间</span><a-input v-model="defaultWorkTime" type="number"></a-input>
          </ysz-list-item>
          <ysz-list-item>
              <span slot="left">默认休息时间</span><a-input v-model="defaultRestTime" type="number"></a-input>
          </ysz-list-item>
          <ysz-list-item>
              <span slot="left">暂停快捷键(ctrl+?)</span><a-input v-model="pauseKey"></a-input>
          </ysz-list-item>
          <ysz-list-item>
              <span slot="left">番茄/休息结束失去焦点</span><a-switch v-model="showAppMissFocus"></a-switch>
          </ysz-list-item>
          <ysz-list-item>
              <span slot="left">确认提醒失去焦点</span><a-switch v-model="confirmTipMissFocus"></a-switch>
          </ysz-list-item>
          <ysz-list-item>
              <span slot="left">番茄结束音乐</span><a-switch v-model="workEndMusicEnable"></a-switch>
          </ysz-list-item>
          <ysz-list-item>
              <span slot="left">休息结束音乐</span><a-switch v-model="restEndMusicEnable"></a-switch>
          </ysz-list-item>
          <ysz-list-item>
              <span slot="left">休息直接开始番茄</span><a-switch v-model="restConfirmGoTomato"></a-switch>
          </ysz-list-item>
      </ysz-list>
    <ysz-list-item-top>
        <span slot="top">番茄提醒</span>
        <ysz-list-item>
            <span slot="left">时间</span>
            <a-input v-model="workTipTime" type="number"></a-input>
        </ysz-list-item>
        <ysz-list-item v-if="workTipTime > 0">
            <span slot="left">提示</span>
            <a-input v-model="workTipMsg"></a-input>
        </ysz-list-item>
    </ysz-list-item-top>
    </a-modal>
</template>

<script>
const {remote, ipcRenderer} = window.require("electron")
import configDefault from "config/tomato"
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('notification', {
            _sid: state => state.sid,
        })
    },
    data(){
        let obj = {
            ...configDefault,
            ...this.$store.state.config
        }
        delete obj.volume
        return obj
    },
    methods: {
        onOk(){
            this.$store.commit("config/setConfig", this.$data)
            this.$message.success("ok~")
            ipcRenderer.send('refresh-config', this.$data)
        },
        onCancel(){
            remote.BrowserWindow.fromId(this._sid).destroy()
        }
    }
}
</script>