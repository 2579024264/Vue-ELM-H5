<template>
  <div id="home">
      <!-- 导航栏nav-bar -->
      <nav-bar :detail_name='detail_name'></nav-bar>
      <!-- 搜索框 -->
      <search></search>
      <!-- 轮播图 -->
      <home-swiper v-if="longitude!==''"></home-swiper>
      <!-- 商品列表 -->
      <div class="line"></div>
      <div class="title">附近推荐</div>
      <shop-list v-if="longitude!==''"></shop-list>
  </div>
</template>

<script>
import NavBar from './childComps/HomeNavBar'
import HomeSwiper from './childComps/HomeSwiper'
import Search from './childComps/HomeSearch'
import ShopList from 'components/content/ShopList'
import { getCityLocation } from 'network/home'

import { mapMutations, mapGetters } from 'vuex'

export default {

  name: 'home',
  data () {
    return {
      detail_name: '',
      latitude: '',
      longitude: '',
      shopListInfo: []
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    Search,
    ShopList
  },
  methods: {
    ...mapMutations(['SAVE_GEOHASH']),
    ...mapGetters(['GET_GEOHASH']),
    // 每次刷新页面都获取当前城市的地址
    async getCityLocation () {
      await getCityLocation().then(res => {
        this.latitude = res.latitude + ''
        this.longitude = res.longitude + ''
        const geohash = res.latitude + ',' + res.longitude
        this.SAVE_GEOHASH(geohash)
        console.log(this.GET_GEOHASH())
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'City' && from.query.name) {
      next(vm => {
        vm.detail_name = window.sessionStorage.getItem('location_name')
      })
    } else {
      next()
    }
  },
  computed: {
    location () {
      if (!this.cityInfo.detail_name) {
        return this.cityInfo.city_name
      }
      return this.cityInfo.detail_name
    }
  },
  // 进行两个异步操作的数据获取时，会出现前面数据未传递成功的情况
  // 这里使用得解决方法就是通过使用async await的方式处理
  created () {
    this.getCityLocation()
  }
}

</script>

<style lang='scss' scoped>

#home{
  font-size: 16px;

  .line{
    height: 15px ;
    background: #f5f5f5;
    border-top: 0.5px solid #E4E4E4;
    border-bottom: 0.5px solid #E4E4E4;

  }
  .title{
    line-height: 35px;
    padding-left: 1rem;
    @include fsc(15px,grey)
  }

}
</style>
