<template>
  <transition>
    <router-view/>
  </transition>
</template>

<style lang="scss">
@import '~normalize.css';
@import '~animate.css/animate.css';
  .wrapper {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-size: 13px;
    font-weight: 300 !important;
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font-family: ysz-font;
        overflow: hidden;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    color: #000;
  }

  @font-face{
    font-family:ysz-font; 
    src:url(~assets/fonts/ysz-font.ttf);
  }

  .ant-btn {
      border-radius: 4px !important;
  }
  .ant-slider, .ant-radio-wrapper, .ant-input {
    font-family:ysz-font !important; 
  }
</style>

<script>
export default {
  mounted(){
    document.getElementsByClassName('loading-cat-wrapper')[0].classList.add('hide')
  }
}
</script>

