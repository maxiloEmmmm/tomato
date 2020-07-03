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
    data(){return {title: "", link: ""}},
    beforeCreate(){this.$emit("show-app")},
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.title = to.params.title
            vm.link = to.params.link
        })
    },
}
</script>