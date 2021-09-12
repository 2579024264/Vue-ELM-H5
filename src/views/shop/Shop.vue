<template>
  <div id="Shop">
    <nav-bar :shopInfo="shopInfo"></nav-bar>
    <tabs :shopInfo="shopInfo"></tabs>
    <!-- 子路由 可以跳转到foodDetail和shopDeatail -->
   <router-view></router-view>

  </div>
</template>

<script>
import NavBar from './childComps/ShopNavBar'
import Tabs from './childComps/ShopTabs'

import { searchFoodById } from 'network/searchFood'
export default {
  name: 'Shop',
  data () {
    return {
      shopid: '', // 店铺id值
      shopInfo: {}// 店铺信息
    }
  },
  components: {
    NavBar,
    Tabs
  },
  methods: {
    searchFoodById () {
      searchFoodById(this.shopid).then(res => {
        this.shopInfo = res
        console.log(this.shopInfo)
      })
    }
  },
  activated () {
    this.shopid = this.$route.query.id
    this.searchFoodById()
  }
}

</script>

<style lang='scss' scoped>

</style>
