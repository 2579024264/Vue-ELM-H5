<template>
  <div id="city">
    <!-- 头部 -->
    <nav-bar>
      <span slot="left" class="left" @click="backHome"><i class="el-icon-arrow-left"></i></span>
      <span slot="center" class="center">选择收货地址</span>
      <span slot="right" class="right" @click="addLocation">新增地址</span>
    </nav-bar>
    <!-- 地址搜索框 -->
    <div class="locationSearch">
      <div class="wrap">
        <div class="city" @click="updateCity">
          {{paramsInfo.name}}
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="detailLocation">
            <i class="el-icon-search"></i>

            <input type="text" v-model="keyword"
                    @blur="isShow=false"
                    @focus="debounceBegin"
                    @input="keywordInput"
                   class="location_name"
                   placeholder="请输入您的收货地址">
        </div>

      </div>
    </div>
    <!-- 搜索提示 -->
    <div class="remindInput" v-show="isShow">
        <ul >
          <li v-for="(item,index) in nearPlaces" :key="index" @mousedown="chooseLocation(item)">
              <div class="name">{{item.name}}</div>
              <div class="address">{{item.address}}</div>
          </li>
        </ul>
    </div>
    <!-- 搜索记录 -->
    <div class="nearLocation" v-show="!isShow">
        <div class="near">搜索记录</div>
        <el-tag class="tag"
                v-for="(item,index) in searchHistory"
                :key="index"
                closable
                @close="handleClose(item)"
                @click="chooseLocation(item)"
                >{{item.name}}</el-tag>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import { getLocationsByWords } from 'network/city'
import { debounce } from 'common/utils'
import { mapMutations } from 'vuex'
export default {
  name: 'City',
  data () {
    return {
      paramsInfo: {
        id: 0,
        name: ''
      },
      currentCity: '获取中...',
      // 地址关键词
      keyword: '',
      // 当前城市附近地址
      nearPlaces: [],
      // 输入内容时触发的防抖函数
      inputDebounce: null,
      // 提示区的显示与隐藏
      isShow: false,
      // 详细的收货地址信息
      recieveLocation: '',
      // 记录搜索历史
      searchHistory: [],
      // 记录所有位置的经纬度
      geohashs: []
    }
  },
  components: {
    NavBar
  },
  methods: {
    // 获取主页传递的参数
    getParams () {
      this.paramsInfo.id = this.$route.query.id
      this.paramsInfo.name = this.$route.query.name
    },
    // 点击返回到主页
    backHome () {
      this.$router.replace('/home')
      // this.$router.push("/home")
      // console.log(this.$router.push('/home'))
    },
    // 修改城市
    updateCity () {
      this.$router.push('/changecity')
    },
    // 添加新地址
    addLocation () {
      this.$router.push('/addlocation')
    },
    // 搜索框聚焦时调用防抖函数
    debounceBegin () {
      this.inputDebounce = debounce(getLocationsByWords, 500)
      // 显示提示内容
      this.isShow = true
    },
    // 当输入内容input时触发的函数
    async keywordInput () {
      const data = await this.inputDebounce(this.paramsInfo.id, this.keyword)
      this.nearPlaces = data
    },
    ...mapMutations(['SAVE_GEOHASH']),
    // 选中当前提示内容中的某一项
    chooseLocation (currentLocation) {
      this.keyword = ''
      this.nearPlaces = []
      this.isShow = false
      window.sessionStorage.setItem('location_name', currentLocation.name)
      window.sessionStorage.setItem('location_address', currentLocation.address)
      // 保存选中的地址的经纬度到vuex中
      this.SAVE_GEOHASH(currentLocation.geohash)
      // 通过经纬度判断选项是否在数组中，并得到下标值
      const index = this.geohashs.indexOf(currentLocation.geohash)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
        this.geohashs.splice(index, 1)
      }
      // 然后在放在最后
      this.searchHistory.push(currentLocation)
      // 存放所有选项的geohash,经纬度值作为每个值的标识符
      this.geohashs.push(currentLocation.geohash)
      // 跳转到主页
      this.$router.push('/home')
    },
    // 删除选中项
    handleClose (history) {
      const index = this.searchHistory.indexOf(history)
      this.searchHistory.splice(index, 1)
    }

  },
  mounted () {
    this.getParams()
  },
  // 将页面中定位的地址修改为改变后的地址
  beforeRouteEnter (to, from, next) {
    if (from.name === 'ChangeCity' && from.params.city) {
      next(vm => {
        vm.paramsInfo.name = from.params.city.name
        vm.paramsInfo.id = from.params.city.id
      })
    } else {
      next()
    }
  }
}

</script>

<style lang='scss' scoped>
#city{
  font-size: 13px;
  padding-top: 44px;

  .left{
      margin-left: 0.5rem;
      i{
        font-size: 18px;
      }
  }
  .center{
    font-size: 18px;
    font-weight: 700;
  }
  .right{
    margin-right: 0.5rem;
  }
  .form{
    background: red;
  }
  .locationSearch{
    height: 2.5rem;
    margin-top:10px ;
    border-radius:1.25rem ;
    background: #F0F0F0;
    position: fixed;
    width: 100%;

      .wrap{

          height: 100%;
          display: flex;
          align-items: center;
        .city{
          margin-left:1.25rem ;
          padding-right:1rem;
          border-right:1px solid #ccc ;
        }

        .detailLocation{
            margin-left: 1rem;

            i{
              color: #ccc;
              font-weight: 700;
            }
            .location_name{
              outline: none;
              border: 0;
              // color: #
              margin-left: 0.5rem;
              background: transparent;

            }

        }

      }

  }
  .nearLocation{
    margin: 4.5*15px 0.8rem 0;
    position: absolute;
    .near{
      @include fsc(0.9rem,grey);
    }
    .el-tag{
        margin: 10px 10px 0;
      }

  }
  .remindInput{
    width: 100%;
    margin-top: 0.3rem;
    padding: 0 0.5rem ;
    top:2.5*15px + 44px;
    position: absolute;
    font-size: 0.5rem;
    overflow: hidden;

      ul{
        overflow: hidden;
      }
      li{
        padding-top: 1rem;
        border-bottom: 0.5px solid #eee;
        div{
          line-height: 1rem;
          margin-bottom: 10px;
        }
        .name{
          font-size: 1rem;
        }
        .address{
          font-size: 0.8rem;
        }
      }
  }
}
</style>
