<template>
    <div style="position:relative; padding:8px 0">
        <h1 slot="top" class="header">番茄时间:</h1>
        <div class="wrap">
            <ysz-list-item>
                <div slot="left" class="time-view">{{ time }}分钟</div>
                <ysz-list-item :left="true">
                    <div slot="left" class="up5">
                        <a-button @click="up5" size="small">+5</a-button>
                        <a-divider type="vertical" />
                        <a-button @click="down5" size="small">-5</a-button>
                    </div>
                    <a-button size="small" @click="reset" type="danger">重置</a-button>
                </ysz-list-item>
            </ysz-list-item>
            <div class="before-go"><a-button @click="go"><router-link :to="{name: 'action-tomato', params: {tomato: time}}">开始 -></router-link></a-button></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){return {time: 25, rate: 2}},
    beforeCreate(){
        this.$emit('navInfo', {name: 'action-start'})
    },
    created(){
        this.time = this.$store.state.config.defaultWorkTime
    },
    methods:{
        up5(){if (this.time + 5 >= 100) return; this.time += 5},
        down5(){if (this.time - 5 < 0) return;this.time += -5},
        reset(){this.time = 25},
        go(){},
    }
}
</script>

<style lang="scss" scoped>
    .header {margin-bottom: 5px;}
    .wrap {padding: 5px; width:100%}
    .time-view {    width: 163px; display: flex;
    height: 120px; justify-content: center;
    align-items: center; font-size: 40px;}
    .up5 {flex-grow: 1;text-align: center;}
    .before-go {    position: absolute;
    right: 20px; bottom: 45px;}
</style>