<template>
  <div class="shoplist_container">
    <ul>
      <li class="shoplist_item"
          v-for="item in shopListInfo"
          :key="item.id"
          @click="shop(item.id)">
        <div class="left">
          <img :src="imgBaseUrl+item.image_path" alt="" class="shop_img">
        </div>
        <div class="right">
          <div class="top">
             {{item.name}}
          </div>
          <div class="middle1">
              <span class="point">{{item.rating}}分</span>
              <span class="sell">月售{{item.recent_order_num}}</span>

          </div>
          <div class="middle2">
              <span class="time">{{item.order_lead_time}}</span>
              <span class="distance">{{item.distance}}</span>
          </div>

          <!-- </div> -->
          <div class="bottom">
            <span>起送￥{{item.float_minimum_order_amount}}￥</span>
            <span>配送￥{{item.float_delivery_fee}}</span>
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
import { imgBaseUrl } from 'config/env'
import { mapGetters } from 'vuex'
import { shopList } from 'network/common'
// import {shopMenu} from 'network/shop'
export default {
  data () {
    return {
      offset: 0, // 批次加载店铺列表，每次加载20个，limit=20
      imgBaseUrl,
      shopListInfo: []
    }
  },
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliverMode', 'supportIds', 'confirmSelect'],
  // 监听从父组件传过来的数据，一旦发生了改变，则重新获取数据
  watch: {
    // 监听父级传过来的restaurantCategoryIds,当值发生改变的时候重新获取餐馆数据，作用与排序和筛选
    restaurantCategoryIds: function (value) {
      this.shopList()
    },
    // 监听父级传来的排序方式
    sortByType: function (value) {
      this.shopList()
    },
    // 监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
    confirmSelect: function (value) {
      console.log(this.confirmSelect)
      console.log(this.supportIds)
      this.shopList()
    }

  },
  methods: {
    ...mapGetters(['GET_GEOHASH']),
    async shopList () {
      const geohash = this.GET_GEOHASH().split(',')
      const latitude = geohash[0]
      const longitude = geohash[1]
      shopList(latitude, longitude, this.offset, this.restaurantCategoryId, this.restaurantCategoryIds, this.sortByType, this.deliverMode, this.supportIds).then(res => {
        this.shopListInfo = res
      })
    },
    shop (id) {
      this.$router.push({
        path: '/shop',
        query: {
          id
        }
      })
    }
  },
  mounted () {
    this.shopList()
  }
}

</script>

<style lang='scss' scoped>
.shoplist_container{
  padding: 1rem 1rem;
  background: #f5f5f5;
  .shoplist_item{
    background: #fff;
    margin-bottom: 15px;
    width: 100%;
    display: flex;
    // flex-wrap: nowrap;

    .left{
      @include wh(6rem,6rem);
      // border: 1px solid red;
      img{
        @include wh(100%,100%);
      }
    }
    .right{
        flex: 1;
        padding-left: 15px;
        min-width: 0;
        .top{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color:#222;
          line-height: 30px;
          font-weight: 600;
        }
        .middle1{
          @include fj(space-between);
          @include fsc(14px,grey);
          line-height: 30px;

          .point{
            @include fsc(15px,orange);
            font-weight:bold;
            }
          }
        .middle2{
          @include fj(space-between);
          @include fsc(14px,grey);
          line-height: 30px;

        }
        }
        .bottom{
          @include fsc(13px,grey);
          line-height: 30px;
          span{
            padding-right: 10px;
          }
        }
    }
  }

</style>
