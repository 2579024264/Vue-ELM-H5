<template>
<div class="mySwiper">
  <swiper
    ref="mySwiper"
    :options="swiperOptions"
    >
    <swiper-slide v-for="item in Length" :key="item">
       <slot :name="item-1"></slot>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  <!-- 导航箭头 -->
    <!-- <div class="swiper-button-prev" ></div>
    <div class="swiper-button-next"></div> -->
  </div>
</template>

<script>
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/core'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/components/a11y/a11y.scss'

SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay])

export default {
  name: 'mySwiper',
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: true
          // hiddenClass:''
        },
        loop: true,
        speed: 300,
        //  autoplay : {
        //   delay:3000
        // },
        on: {
          click: function (swiper) {
            // 获取点击的dom元素
            // console.log(swiper);
            // console.log(swiper.clickedSlide.childNodes[0]);
            // let
          }
        }

      }
    }
  },
  props: {
    Length: {
      type: Number,
      default: 0
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    food () {
      console.log(222)
    }
  },
  computed: {

  },
  mounted () {

  }
}

</script>

<style lang='scss' scoped>
.mySwiper{
  position: relative;

}
 .swiper-container{

    --swiper-navigation-size: 30px;/* 设置按钮大小 */
  }
  .swiper-button-prev:after, .swiper-button-next:after{
    font-size: 1.2rem;
    font-weight: 700;
  }
  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom: -2px;
  }
  .swiper-button-prev, .swiper-container-rtl .swiper-button-next{
    left: 0;
  }
</style>
