<template>
<div id="home-navbar">
  <nav-bar :backgroundColor="'#00BFFF'">
        <span slot="left" class="locate_name">
          <i class="el-icon-location-outline" >
            <span @click="specificLocation" style="margin-left:0.2rem">{{location}}
              <i class="el-icon-caret-bottom"></i>
            </span>
          </i>
        </span>
        <span slot="right" class="cart_info">
          <i class="el-icon-shopping-cart-2"></i>
          <i class="el-icon-chat-dot-square"></i>
        </span>
  </nav-bar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import { getCityLocation } from 'network/home'
import { mapMutations } from 'vuex'
export default {
  name: 'HomeNavBar',
  data () {
    return {
      // 城市信息
      cityInfo: {
        city_name: '正在定位...',
        detail_name: '',
        id: 0
      }
    }
  },
  props: {
    detail_name: {
      type: String,
      default: ''
    }
  },
  components: {
    NavBar
  },
  methods: {
    ...mapMutations(['SAVE_GEOHASH']),
    // 点击跳转到city页面
    specificLocation () {
      this.$router.push({
        path: '/city',
        query: {
          id: this.cityInfo.id,
          name: this.cityInfo.city_name
        }
      })
    },
    // 自动获取当前所在的位置
    getCityLocation () {
      getCityLocation().then(res => {
        this.cityInfo.city_name = res.name
        this.cityInfo.id = res.id
        const geohash = res.latitude + '' + ',' + res.longitude
        this.SAVE_GEOHASH(geohash)
      })
    }
  },
  mounted () {
    this.getCityLocation()
  },
  computed: {
    location () {
      if (!this.detail_name) {
        return this.cityInfo.city_name
      }
      return this.detail_name
    }
  }
}

</script>

<style lang='scss' scoped>
#home-navbar{
  font-size: 16px;
}
 .locate_name{
    margin-left: 0.4rem;

  }
  .cart_info{
    margin: 0 0.5rem;

    i{
      margin: 0 0.7rem;
      font-size: 23px;
    }
  }
</style>
