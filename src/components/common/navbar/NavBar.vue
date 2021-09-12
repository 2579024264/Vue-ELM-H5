<template>
  <header id="nav_bar" :style="{background:backgroundColor}">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  // 接收外部传进来的值改变背景色
  props: {
    backgroundColor: {
      type: String,
      default: '#3190e8'
    }
  }

}

</script>

<style lang='scss' scoped>
  #nav_bar{
    padding:0 .8rem;

    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    @include wh(100%,44px);
    @include fj(space-between);

    .left,.right,.center{
      line-height: 44px;
      color: #fff;
    }

  }
</style>
