<template>
  <swiper
    class="my_swiper"
    :Length="foodTypesLength"
    v-if="foodTypesLength"
    >
    <div :slot="item-1" class="item-container" v-for="item in foodTypesLength" :key="item">
      	<router-link :to="{path: '/food', query:{geohash:geohash,title:foodItem.title,restaurant_category_id:getCategoryId(foodItem.link)}}" v-for="foodItem in foodTypes[item-1]" :key="foodItem.id" class="swiper-item">
            <img :src="imgBaseUrl + foodItem.image_url" class="img">
            <div class="title">{{foodItem.title}}</div>
	      </router-link>
    </div>
  </swiper>
</template>

<script>
import { Swiper } from 'components/common/swiper'

import { getFoodTypes } from 'network/home'
import { mapGetters } from 'vuex'
export default {
  name: 'HomeSwiper',
  data () {
    return {
      // 图片域名地址
      imgBaseUrl: 'https://fuss10.elemecdn.com',
      // 商品分类列表
      foodTypes: [],
      // 商品分类列表的长度
      foodTypesLength: 0,
      geohash: ''
    }
  },
  components: {
    Swiper,
  },
  methods: {
    ...mapGetters(['GET_GEOHASH']),
    // 获取食物列表
    getFoodTypes () {
      this.geohash = this.GET_GEOHASH()
      getFoodTypes(this.geohash).then(res => {
        const resLength = res.length
        const resArr = [...res] // 返回一个新的数组
        const foodArr = []
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8)
        }
        this.foodTypes = foodArr
        this.foodTypesLength = foodArr.length
      })
    },
    // 解码url地址，求去restaurant_category_id值
    getCategoryId (url) {
      // console.log(url);
      const urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''))
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id
      } else {
        return ''
      }
    }

  },
  mounted () {
    this.getFoodTypes()
  }
}

</script>

<style lang='scss' scoped>
.my_swiper{
  width: 100%;
  height: 220px;
  margin-top: 10px;

  .item-container{
    padding: 1rem;
   @include fj(space-evenly);
    flex-wrap: wrap;
    width: 100%;
    height: 100%;

    .swiper-item{
      width: 18%;
      height: 30%;
      margin:0  0.8rem;
    .img{
      width: 100%;
      height: 75%;
    }
    .title{
      font-size: 13px;
      text-align: center;
      color: black;
    }
  }

  }
}

</style>
