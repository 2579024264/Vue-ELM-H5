<template>
  <div id="searchFood">
    <!-- 头部nav-bar -->
    <nav-bar :backgroundColor="'#fff'" class="nav_bar" >
      <div slot="left" class="search_left" @click="back">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="search_center">
        <el-input
          v-model="searchInput"
          placeholder="搜索美味"
          class="input"
          @focus="focusInput"
          ref="customerInput"
          @input="ContainInput(geohash,searchInput)"
          @blur="isShow=false"
        ></el-input>
      </div>
      <span slot="right" class="search_right">
        <el-button
        type="primary"
        >搜索</el-button>
      </span>
    </nav-bar>
    <!-- 搜索结果下拉表 -->
    <div class="result_list" v-show="isShow">
        <ul class="result_list_ul">
           <li v-for="(item,index) in resultList"
              :key="index"
              class="result_list_li"
              @mousedown="chooseFood(item.name,item.id)">
              <i class="el-icon-search"></i>
              <span class="name">{{item.name}}</span>
              <span class="count">约{{item.rating_count}}结果</span>
           </li>
        </ul>
    </div>
    <!-- 历史记录 -->
    <div class="history" v-show="!isShow">
      <div class="title">
        <h3>历史搜索</h3>
        <span class="icon" @click="deleteAll"><i class="el-icon-delete"></i></span>
      </div>
      <div class="history_list">
        <el-tag v-for="(item,index) in history_list"
                :key="index"
                class="tag"
                :closable="true"
                @close="deleteOne(index)"
                @click="searchFoodById(item.id)"
                >
          {{item[0]}}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import { debounce } from 'common/utils'
import { searchFood, searchFoodById } from 'network/searchFood'
import { mapGetters } from 'vuex'
export default {
  name: 'SearchFood',
  data () {
    return {
      // 和输入框数据绑定
      searchInput: '',
      // 搜索结果列表
      resultList: [],
      geohash: '', // 经纬度
      backDebounce: null, // 接收返回的防抖函数
      isShow: false, // 用来控制下拉列表的显示与隐藏
      history_list: []// 存放历史列表

    }
  },
  methods: {
    ...mapGetters(['GET_GEOHASH']),
    // 返回上一页面
    back () {
      this.$router.back()
    },
    // 根据餐馆的id来获取参观详情数据
    searchFoodById (id) {
      searchFoodById(id).then(res => {
        console.log(res)
      })
    },
    // 当输入框聚焦时触发防抖函数
    focusInput () {
      console.log('聚焦了')
      this.backDebounce = debounce(searchFood, 500)
      if (!this.resultList.length) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    // 当输入框输入内容的时候触发
    async ContainInput (geohash, input) {
      input = input.trim()
      if (input) {
        this.isShow = true
        const result = await this.backDebounce(geohash, input)
        if (result.length > 0) {
          this.resultList = result
        }
      } else {
        this.isShow = false
        this.resultList = []
      }
    },
    // 选中下拉列表中的某个选项时触发的函数
    chooseFood (name, id) {
      if (!this.history_list.length) {
        this.history_list.push([name, id])
      } else {
        this.history_list.forEach((item, index) => {
          if (item[1] === id) {
            this.history_list.splice(index, 1)
          }
        })
        this.history_list.push([name, id])
      }
      this.searchFoodById(id)
      this.$router.push({
        path: '/shop',
        query: {
          id
        }
      })
    },
    // 删除历史记录
    deleteOne (index) {
      this.history_list.splice(index, 1)
    },
    // 删除全部的历史纪录
    deleteAll () {
      this.history_list = []
    }

  },
  components: {
    NavBar
  },
  async mounted () {
    this.geohash = await this.GET_GEOHASH()
  },
  activated () {
    this.$refs.customerInput.$el.querySelector('input').focus()
  },
  // 在keep-alive情况下，当页面退出时触发的钩子函数
  deactivated () {
    this.searchInput = ''
    this.resultList = []
  }

}

</script>

<style lang='scss' scoped>
#searchFood{
  padding: 0 1rem;

  .nav_bar{
    .search_left{
      i{
        // padding-top: 2px;
        @include fsc(25px,black);
        font-weight: 900;
        margin-top: 10px;
      }
    }
    .search_center{
        width: 60vw ;
        .input{
          position: relative;
          &:after{
          content:'\e8c6';
          display:block;
          position: absolute;
          // width: 1.5rem;
          // height: 1.5rem;
          // line-height: 1.5rem;
          // border-radius: 1.5rem;
          right: 10px;
          top: 10px;
          // text-align: center;
          color: grey;
          font-size: 15px;

          }
        }
    }
    .search_right{
        .el-button{
          border-radius:20px;
          height: 32px;
          padding: 8px 10px;
          background-color: $nav_bar;

        }
    }

  }
  .result_list{
    padding: 44px 0.5rem 0;

    .result_list_ul{

      .result_list_li{
        font-size: 1.1rem;
        height: 50px;
        line-height: 50px;

          i{
            padding-right: 10px;
            color: grey;
          }
          .name{
             letter-spacing: 1px;
          }
          .count{
            @include fsc(0.8rem,grey);
            float: right;
          }
      }
    }

  }
  .history{
    padding: 70px 0.5rem 0;

    .title{
      @include fj(space-between);
      line-height: 1.4rem;

      h3{
        // font-size:20px;
        font-weight: 550;

      }
      .icon{
        @include fsc(16px,grey);

      }

    }
    .history_list{
      padding: 1.4rem 0rem;

      .tag{
          margin: 0.5rem 0.5rem;
      }
    }

  }
}
</style>
