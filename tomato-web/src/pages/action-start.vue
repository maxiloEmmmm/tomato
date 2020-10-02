<template>
    <ysz-list-item-top>
        <div slot="top" class="header">番番番番番茄</div>
        <router-link id="big-fq" :to="{ name: 'action-before'}" @click="touch">🍅</router-link>
    </ysz-list-item-top>
</template>

<style lang="scss" scoped>
    #big-fq {font-size: 150px;flex-grow: 1;cursor: pointer;
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;}
    .header {font-size: 40px; text-align: center;
        flex-grow: 1; margin: 20px;}
</style>

<script>
export default {
    methods: {touch(){this.$emit("touch")}}
}
</script>