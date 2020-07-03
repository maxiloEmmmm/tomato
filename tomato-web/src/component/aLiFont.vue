<template>
    <i @click="e => $emit('click', e)">
        <svg class="icon" aria-hidden="true">
            <use :xlink:href="_icon"></use>
        </svg>
    </i>
</template>

<script>
export default {
    name: 'aLiFont',
    props: {
        icon: {
            default: ''
        }
    },
    computed: {
        _icon(){
            return '#icon-' + this.icon;
        }
    }
}
</script>
