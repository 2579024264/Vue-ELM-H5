<template>
<div class="swiper-item">
  <slot>
    <div class="img"><slot name="img" ></slot></div>
    <div class="title"><slot name="title"></slot></div>
  </slot>
</div>
</template>

<script>
export default {
  name: 'HomeSwiperItem',
  methods: {

  }

}

</script>

<style lang='scss' scoped>
.swiper-item{
  width: 22%;
  height: 40%;
  .img{
    width: 100%;
    height: 75%;
  }
  .title{
    font-size: 13px;
    text-align: center;

  }
}
</style>
