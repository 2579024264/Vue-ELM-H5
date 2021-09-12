<template>
  <div>
      <div class="header">
        <div class="background"></div>
        <nav-bar backgroundColor="#0000FF00" class="nav_bar">
            <div class="back" slot="left" @click="backTo"><i class="el-icon-arrow-left"></i></div>
            <div class="search" slot="center"><i class="el-icon-search"></i></div>
            <div class="store" slot="right"><span class="guanzhu"><i class="el-icon-s-opportunity"></i>关注</span></div>
        </nav-bar>
        <header class="shop_detail_header">
          <div class="top">
          <div class="left_info">
            <div class="title">{{shopInfo.name}}</div>
            <div class="time_fee">
              <span class="time">商家配送约{{shopInfo.float_minimum_order_amount}}分钟</span>
              <span class="fee">配送费￥{{shopInfo.float_delivery_fee}}</span>
            </div>
            <div class="ad">公告:&nbsp;{{promotion_info}}</div>
          </div>
          <div class="right_img">
            <img :src="imgBaseUrl+shopInfo.image_path" alt="">
          </div>
        </div>
          <div class="bottom">
            <span class="title" v-if="shopInfoLength>0">
              <i class="el-icon-s-claim"></i>
                现在预定，马上配送
            </span>
            <span class="title" v-if="shopInfoLength===0">
              <i class="el-icon-s-claim"></i>
              店家还未营业！
            </span>

          </div>
        </header>
      </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import { imgBaseUrl } from 'config/env'
import { shopMenu } from 'network/shop'
export default {
  data () {
    return {
      imgBaseUrl: '',
      shopInfoLength: Infinity, // 用来判断当前的店铺数据是否为空
      id: ''// 店铺的id值
    }
  },
  components: {
    NavBar
  },
  methods: {
    backTo () {
      this.$router.back()
    },
    shopMenu () {
      shopMenu(this.id).then(res => {
        console.log(this.id)
        this.shopInfoLength = res.length
      })
    }
  },
  props: {
    shopInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    promotion_info () {
      return this.shopInfo.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢'
    }
  },
  mounted () {
    this.imgBaseUrl = imgBaseUrl
  },
  activated () {
    this.id = this.$route.query.id
    this.shopMenu()
  }

}

</script>

<style lang='scss' scoped>
.header{
  position: relative;
  .background{

    background: url("../../../assets/image/shopBackground.png");
    height: 90px;
    -webkit-filter: blur(3px);
    filter: blur(3px);
  }

  .nav_bar{
    padding: 10px !important;

    i{
      font-size: 22px;
    }

  }
  .shop_detail_header{
    padding: 1rem 0.5rem 0;
    position: absolute;
    background: #ffff;
    top: 50px;
    left: 10px;
    right: 10px;
    border-radius: 10px;

  .top{
       @include fj(space-between);

      .left_info{
        width: 78%;
        min-width: 0;
        .title{
          font-size: 19px;
          font-weight: 600;
          letter-spacing:2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .time_fee{
          height: 40px;
          line-height: 40px;
          padding-right: 1rem;

          .time{
            float: left;
          }
          .fee{
            float: right;
          }
        }
        .ad{
          color: grey;
        }
      }
        .right_img{
        @include wh(5rem,5rem);
        img{
          @include wh(100%,100%);
        }
      }
    }
  .bottom{
    margin-top: 10px;
    height: 45px;
    line-height:55px;
    text-align: center;
    width: 100%;
    background: #58CD10;
    border-radius: 0 0 10px 10px;
    position: relative;

    .title{
      color: #fff;
    }

    &:before{
      content:"";
      width: 100%;
      height: 20px;
      background: #fff;
      position: absolute;
      top: -10px;
      left: 0;
      border-radius: 0 0 8px 8px;
    }
  }
  }
}
</style>
