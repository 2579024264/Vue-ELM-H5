<template>
<div id="changeCity">
  <!-- 当前定位 -->
  <div class="location">
    <div class="title">
      <div>当前定位</div>
      <div class="back" @click="back"> <i class="el-icon-arrow-left"></i> 返回</div>
    </div>
    <div class="currentLocation">
      <span class="name" @click="chooseLocation(currentCity)"><i class="el-icon-s-promotion"></i> {{currentCity.name}}</span>
      <span class="refresh" @click="getCityLocation">重新定位</span>
    </div>
  </div>
  <div class="line"></div>
  <!-- 热门城市 -->
  <div class="hot_city">
    <div class="title">热门城市</div>
    <div class="tag-wrap" >
      <el-tag  class="tag"
               type="info"
               v-for="(item,index) in hot_city"
               :key="index"
               @click="chooseLocation(item)"
               >
        {{item.name}}
      </el-tag>
    </div>
  </div>
  <div class="line"></div>
  <!-- 索引栏 -->
  <div class="all_city">
    <van-index-bar :index-list="indexlist">
      <div
        v-for="(item1,index1) in all_city"
        :key="index1">
        <van-index-anchor  :index="index1" />
        <van-cell  :title="item2.name"
                   v-for="(item2,index2) in item1"
                   :key="index2"
                   @click="chooseLocation(item2) " />

      </div>
  </van-index-bar>
  </div>

  </div>
</template>

<script>
import { getCityLocation } from 'network/home'
import { getHotCity, getAllCity } from 'network/changeCity'
export default {
  name: 'ChageCity',
  data () {
    return {
      currentCity: {
        name: '正在定位...',
        id: 0
      },
      // 热门城市
      hot_city: [],
      // 全部城市
      all_city: {},
      // 全部城市的key之数组
      city_keys: [],
      // 自定义索引列
      indexlist: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
    }
  },
  methods: {
    // 获取当前所在城市
    getCityLocation () {
      getCityLocation().then(res => {
        this.currentCity.name = res.name
        this.currentCity.id = res.id
      })
    },
    // 获取热门城市的信息
    getHotCity () {
      getHotCity().then(res => {
        this.hot_city = res
      })
    },
    // 获取全部城市的信息
    getAllCity () {
      getAllCity().then(res => {
        // 对返回的数据进行排序
        this.city_keys = Object.keys(res).sort(function (a, b) {
          return a.localeCompare(b)
        })
        // 按序保存返回的全部信息
        //  console.log(this.city_keys)
        this.city_keys.forEach((item) => {
          this.all_city[item] = res[item]
        })
      })
    },
    // 当选中某个城市后
    chooseLocation (city) {
      // 返回到City页
      this.$route.params.city = city
      this.$router.back()
    },
    // 返回到上一个页面
    back () {
      this.$router.back()
    }
  },
  mounted () {
    this.getCityLocation()
    this.getHotCity()
    this.getAllCity()
    // console.log(this.city_keys)
  }

}

</script>

<style lang='scss' scoped>
#changeCity{
 padding: 1rem 0.8rem 0;
 .location{

   height: 4rem;
  //  border: 1px solid #ccc;
   @include fj(space-between,column);

    .title{
      @include fj(space-between);
      @include fsc(0.9rem,grey);
        .back{
          color: #222;

        }
    }

    .currentLocation{
      @include fj(space-between);
      align-items: center;
        span{
          display: block;
          &:nth-child(1){
            font-weight: 700;
            i{
              color: $fc;
            }
          }
          &:nth-child(2){
            @include fsc(0.8rem,$fc)
          }
        }

    }

  }
   .line{
     margin-top: 10px;
      @include wh(100%,5px);
      background:#E6E6E6
    }
  .hot_city{
   margin-top: 1rem;

    .title{
      @include fsc(0.9rem,grey);
      line-height: 2rem;
      padding-bottom: 1.5rem;
    }
    .tag-wrap{
      text-align: center;
      @include fj(space-evenly);
      flex-wrap: wrap;
        .tag{
          @include wh(6rem,2.3rem);
          margin-bottom: 1rem;
          display: block;
          // flex: 1;
        }
    }

  }
  .all_city{
    margin-top: 1rem;

  }

}
</style>
