<template>
    <div style="padding:10px 5px">
        <ysz-module-widget title="统计">
            <ysz-list row :group="4">
                <a-statistic title="使用" :value="logCounts[logKeys.Start]"/>
                <a-statistic title="番茄" :value="logCounts[logKeys.TomatoStart]"/>
                <a-statistic title="休息" :value="logCounts[logKeys.RestStart]"/>
                <a-statistic title="等待确认" :value="logCounts[logKeys.ConfirmWait]"/>
                <a-statistic title="跳过去休息" :value="logCounts[logKeys.TomatoReset]"/>
                <a-statistic title="跳过去番茄" :value="logCounts[logKeys.RestToTomato]"/>
                <a-statistic title="番茄比" :value="$utils.tool.float(logCounts[logKeys.TomatoStart] / logCounts[logKeys.RestStart], 3)"/>
            </ysz-list>
        </ysz-module-widget>
        <ysz-module-widget title="图表">
            <ysz-list row :group="3">
                <ysz-list-item-top>
                    <span slot="top">休息时间</span>
                    <div ref="restTimeChart" style="width:180px; height: 180px"></div>
                </ysz-list-item-top>
                <ysz-list-item-top>
                    <span slot="top">番茄时间</span>
                    <div ref="tomatoTimeChart" style="width:180px; height: 180px"></div>
                </ysz-list-item-top>
            </ysz-list>
        </ysz-module-widget>
    </div>
</template>

<script>
import { Pie } from '@antv/g2plot';
import { mapState } from 'vuex'
import logModel from "model/log"
import * as logKeys from "config/log"

const model = new logModel

function timeView(x) {
    x = parseInt(x)
    let f = parseInt(x / 60)
    let m = x - f * 60
    return `${!f ? "" : `${f}分`}${!m ? "" : `${m}秒`}`
}

export default {
    computed: {
        ...mapState('notification', {
            _cid: state => state.cid,
        })
    },
    data(){
        return {
            logKeys,
            logCounts: {}
        }
    },
    async mounted(){
        this.renderCount()
        this.renderRestTime()
        this.renderTomatoTime()
    },
    methods: {
        async renderCount(){
            let data = await model.Count()
            data.forEach(d => {
                this.$set(this.logCounts, d.action, d.count)
            })
        },
        async renderRestTime(){
            await this.$nextTick()
            let data = await model.RestTime()
            const piePlot = new Pie(this.$refs.restTimeChart, {
                data,
                angleField: 'total',
                colorField: 'time',
                radius: 0.8,
                legend: false,
                label: {
                    type: 'inner',
                    offset: '-0.2',
                    content: data => `${timeView(data.time)}`,
                },
            });

            piePlot.render()
        },
        async renderTomatoTime(){
            await this.$nextTick()
            let data = await model.TomatoTime()
            const piePlot = new Pie(this.$refs.tomatoTimeChart, {
                data,
                angleField: 'total',
                colorField: 'time',
                radius: 0.8,
                legend: false,
                label: {
                    type: 'inner',
                    content: data => `${timeView(data.time)}`,
                    offset: '-0.2',
                },
            });

            piePlot.render()
        }
    }
}
</script>