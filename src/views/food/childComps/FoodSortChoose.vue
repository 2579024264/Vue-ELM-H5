<template>
<div class="container">
  <div class="sort_container">
    <!-- 分类 -->
      <div class="sort_item"  :class="{choose_type:sortBy==='sort'}">
          <div class="item_container" @click="openList('sort')">
            <span>{{sort_title}}</span>
            <span class="sort_icon">
                <i class="el-icon-caret-bottom"></i>
            </span>
          </div>
          <transition name="showlist">

            <section v-show="sortBy=='sort'" class="sort">
                <section class="sort_left">
                  <ul>
                    <li
                         v-for="(item,index) in sort"
                        :key="index"
                        class="sort_left_li"
                        @click="selectCategoryName(item.id,index)"
                        :class="{sort_left_choose:sort_left_index===index}">

                      <section>
                        <div class="sort_inner_left">
                          <span class="icon">
                            <img :src="getImgPath(item.image_url)" alt="" >
                          </span>
                        <span class="sort_name">{{item.name}}</span>
                        </div>
                        <div class="sort_inner_right">
                          <span class="sort_count">{{item.count}}                      </span>
                           <i class="el-icon-arrow-right"></i>
                        </div>
                      </section>
                    </li>

                  </ul>
                </section>
                <section class="sort_right">
                  <ul>
                    <li v-for="(item,index) in sortDetail"
                        :key="index"
                        class="sort_right_li"
                        @click="getSortIds(item.id,item.name)"
                        >

                      <span>{{item.name}}</span>
                      <span>{{item.count}}</span>
                    </li>
                        <!-- :class="{sort_right_choosed:restaurant_category_ids==item.id}" -->
                  </ul>
                </section>
            </section>
          </transition>
      </div>
      <!-- 排序 -->
      <div class="sort_item" :class="{choose_type:sortBy==='order'}">
          <div class="item_container"  @click="openList('order')">
            <span>排序</span>
             <span class="sort_icon">
                <i class="el-icon-caret-bottom"></i>
            </span>
          </div>
          <transition name="showlist">
            <section v-show="sortBy=='order'" class="order">
                <div class="order_wrap">
                  <ul @click="choose_item($event)" id="orderList">
                    <li v-for="(item,index) in orderList" :key="index">
                      {{item}}
                    </li>
                  </ul>
                </div>
            </section>
          </transition>
      </div>
      <!-- 筛选 -->
      <div class="sort_item" :class="{choose_type:sortBy==='choose'}">
          <div class="item_container"  @click="openList('choose')">
            <span>全部筛选</span>
            <span class="sort_icon">
                <i class="el-icon-caret-bottom"></i>
            </span>
          </div>
          <transition name="showlist">
            <section v-show="sortBy=='choose'" class="choose">
              <section style="width:100%">
                <header class="filter_header_style">配送方式</header>
                <div class="filter_ul1">
                  <el-tag v-for="(item,index) in Deliver"
                      :key="index"
                      class="filter_li"
                      @click="selectDeliveryMode(index,item.id)"
                      :type="send_tag_index===index ? '':'info'"
                      >  {{item.text}}
                   </el-tag>
                </div>
                </section>
                <section style="width:100%">
                  <header class="filter_header_style">商家属性(可以多选)</header>
                    <div class="filter_ul2">
                      <el-tag v-for="(item,index) in Activity"
                          :key="index"
                          @click="selectSupportId(item)"
                          class="filter_li"
                          :type="shop_tag_items.includes(item)? '':'info'"
                         ><span  class="filter_icon" :style="{color:'#'+item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                          {{item.name}}
                      </el-tag>
                    </div>
                </section>
                <footer class="confirm_filter">
                  <el-button class="clear_all filter_button_style" @click="clearSelect">清空</el-button>
                  <el-button type="success" class="confirm_select filter_button_style" @click="confirmSelectFun">确定</el-button>
                </footer>

            </section>

          </transition>

      </div>
  </div>
    <transition name="showcover">
      <div class="back_cover" v-show="sortBy"></div>
    </transition>
</div>
</template>

<script>
import { getImgPath } from 'common/utils'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { foodSort, delivery_mode, foodActivity } from 'network/food'
export default {
  data () {
    return {
      // 打开的选择选项
      sortBy: '',
      // 循环列表
      sort: [],
      orderList: [
        '起送价最低',
        '配送速度最快',
        '评分最高',
        '智能排序',
        '距离最近',
        '销量最高'
      ],
      sort_left_index: '', // 选中的sort左侧的元素下标
      sortDetail: [], // sort类中的右侧的数据
      Deliver: [], // 配送数据
      Activity: [], // 商家活动属性数据
      sort_title: '', // home页面选择的类别
      head_title: '', // 当前页面选择的类别
      restaurant_category_id: '', // 接收从主页面传递过来的类别id值
      restaurant_category_ids: '', // 筛选类型的id
      sortByType: null, // 根据何种方式排序
      delivery_modes: [], // 配送方式数据
      support_ids: [], // 选中的商铺活动列表
      confirmStatus: false, // 确认选择

      send_tag_index: Infinity, // 当前配送方式的下标
      shop_tag_items: [], // 选中的商家属性
      geohash_query: '', // 接收url中的geohash值
      latitude: '', // 纬度
      longitude: ''// 经度

    }
  },
  components: {

  },
  mixins: [getImgPath],
  methods: {
    ...mapMutations(['SAVE_GEOHASH']),
    // 当点击分类，选择选项是触发的事件
    openList (str) {
      // 多次点击时，sortBy无值下拉，有值上拉
      if (!this.sortBy) {
        this.sortBy = str
        if (this.sortBy == 'sort') {
          this.sort_title = '分类'
        }
      } else if (this.sortBy == 'sort') {
        this.sort_title = this.head_title
        if (str !== 'sort') {
          this.sortBy = str
        } else {
          this.sortBy = ''
        }
      } else {
        if (str === this.sortBy) {
          this.sortBy = ''
        } else {
          this.sortBy = str
        }
      }
    },
    // 初始化数据
    async initData () {
      // 获取从home页面传递过来的参数
      this.geohash_query = this.$route.query.geohash
      this.sort_title = this.$route.query.title
      this.head_title = this.sort_title
      this.restaurant_category_id = this.$route.query.restaurant_category_id
      // 防止刷新页面时，vuex状态丢失，经度纬度需要重新获取，并存入vuex
      if (!this.geohash) {
        // 获取位置信息
        this.SAVE_GEOHASH(this.geohash_query)
        // 要求父组件将shopListInfo数据重新传进来
        this.geohash_query = this.geohash_query.split(',')
        this.latitude = this.geohash_query[0]
        this.longitude = this.geohash_query[1]
      }
      // 获取sort分类左侧数据
      await this.foodSort()
      // 初始化时，根据当前restaurant_category_id的默认选择项，在右侧展示出其sub_categories列表
      this.sort.forEach(item => {
        if (this.restaurant_category_id == item.id) {
          this.sortDetail = item.sub_categories
        }
      })
      // 获取筛选列表的配送方式
      await this.delivery_mode()
      // 获取筛选列表的商铺活动
      await this.foodActivity()
    },
    // 获取sort分类的左侧数据
    async foodSort () {
      await foodSort(this.latitude, this.longitude).then(res => {
        const tempSort = [...res]
        tempSort.forEach(item => {
          if (item.count > 0) {
            this.sort.push(item)
          }
        })
      })
    },
    // 获取配送方式
    async delivery_mode () {
      console.log('delivery_mode')
      await delivery_mode(this.latitude, this.longitude).then(res => {
        this.Deliver = res
      })
    },
    // 获取商铺活动
    async foodActivity () {
      await foodActivity(this.latitude, this.longitude).then(res => {
        this.Activity = res
      })
    },
    // 点击分类sort左侧中的某一项时触发的事件
    selectCategoryName (id, index) {
      // 给当前选中的元素添加样式
      this.sort_left_index = index
      // 第一个选项--全部商家，因为没有自己的列表，所以点击默认获取所有的数据
      if (index == 0) {
        this.restaurant_category_id = null
        this.sortBy = ''
        // 不是第一个选项时，右侧展示子集sub_categories列表
      } else {
        const tempSortDetail = []
        this.restaurant_category_id = id
        // 去除右侧数据内容为空的元素
        const sort_right_list = this.sort[index].sub_categories
        sort_right_list.forEach(item => {
          if (item.count > 0) {
            tempSortDetail.push(item)
          }
        })
        this.sortDetail = tempSortDetail
      }
    },
    // 点击获取分类sort右侧的数据
    getSortIds (id, name) {
      this.restaurant_category_ids = id
      this.sortBy = ''
      this.sort_title = this.head_title = name
      // 通过筛选获取food页面列表
      this.$emit('shopListParams', {
        restaurant_category_ids: this.restaurant_category_ids,
        sortByType: this.sortByType,
        delivery_modes: this.delivery_modes,
        support_ids: this.support_ids
      })
    },
    // 点击排序中的某一项时触发的事件
    choose_item (e) {
      // 获取所有的元素，先将所有元素绑定的样式取消
      var orderList = document.getElementById('orderList')
      var allList = orderList.childNodes
      var len = allList.length
      for (var i = 0; i < len; i++) {
        allList[i].classList.remove('order_type')
      }
      // 给目标元素绑定样式
      e.target.classList.add('order_type')
      var text = e.target.innerText
      var index = this.orderList.indexOf(text)
      this.sortByType = index + 1
      this.sortBy = ''
      this.$emit('shopListParams', {
        restaurant_category_ids: this.restaurant_category_ids,
        sortByType: this.sortByType,
        delivery_modes: this.delivery_modes,
        support_ids: this.support_ids
      })
    },
    // 选择配送方式
    selectDeliveryMode (index, id) {
      this.delivery_modes.push(id)
      this.send_tag_index = index
    },
    // 商家属性选择
    selectSupportId (item) {
      const index = this.shop_tag_items.indexOf(item)
      if (index !== -1) {
        this.support_ids.splice(index, 1)
        this.shop_tag_items.splice(index, 1)
      } else {
        // 把选中的商家属性加入一个新的数组中
        this.shop_tag_items.push(item)
        this.support_ids.push(item.id)
      }
    },
    // 选项清空
    clearSelect () {
      this.send_tag_index = Infinity
      this.shop_tag_items = []
      this.support_ids = []
    },
    // 筛选选项确定
    confirmSelectFun () {
      this.confirmStatus = !this.confirmStatus
      this.$emit('shopListParams', {
        restaurant_category_ids: this.restaurant_category_ids,
        sortByType: this.sortByType,
        delivery_modes: this.delivery_modes,
        support_ids: this.support_ids,
        confirmStatus: this.confirmStatus
      }
      )
      this.sortBy = ''
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    ...mapState(['geohash']),
  }

}

</script>

<style lang='scss' scoped>

.sort_container{
  height: 30px;
  line-height: 30px;
  display: flex;

  .sort_item{
    color: #848484;
    width: 33%;
    height: 30px;
    text-align: center;

    .item_container{
      background: #ffff;
      position: relative;
      z-index: 14;

      span{
        margin-right: 5px;
        font-weight: 700;
      }
      .sort_icon{
        .el-icon-caret-bottom{
          transition: all 0.3s;
      }
      }
    }
      .sort{
        height: 27rem;
        font-size: 14px;
        position: absolute;
        z-index: 10;
        width: 100vw;
        border-top: 1px solid #ccc;
        display: flex;
        color: #6E6E6E;

        .sort_left,.sort_right{
          width: 50%;
          text-align:left;

        }

        .sort_left{
          overflow: scroll;
          background: #F1F1F1;

          .sort_left_li{
            height: 45px;
            line-height: 45px;

            section{
                @include fj(space-between)
            }
            .sort_inner_left{
              .icon{
                padding: 0 5px;
              img{
                height: 40%;
                vertical-align: middle;
                margin-top:-4px;
              }
              .sort_name{
                vertical-align:middle;
              }
            }
            }
            .sort_inner_right{

              i{
                padding-right: 5px;

              }
              .sort_count{
                display: inline-block;
                margin-right:3px;
                height: 25px;
                color: #ffff;
                line-height: 25px;
                background: #CCCCCC;
                padding: 0 5px;
                border-radius: 10px;
              }
            }

          }
        }
        .sort_right{
          overflow: scroll;
          background: #ffff;
          padding: 0 10px;

          .sort_right_li{
            height:45px;
            line-height: 45px;
            border-bottom: .8px solid #ccc;
            @include fj(space-between)
          }
        }

      }
      .order{
        position: absolute;
        z-index: 10;
        width: 100%;
        left: 0;
        border-top: 1px solid #ccc;
        color: #6E6E6E;
        background: #fff;

        .order_wrap{
          padding: 0 15% 0 15%;
          margin-bottom: 20px;

          li{
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            text-align: left;
            box-sizing: border-box;
            padding-left: 10px;
          }
        }

      }
      .choose{
        position: absolute;
        z-index: 10;
        width: 100%;
        left: 0;
        border-top: 1px solid #ccc;
        color: #6E6E6E;
        background: #fff;
        text-align: left;
        padding: 0.5rem 0.5rem;

        .filter_header_style{
         font-size: 13px;
         line-height:45px;
        }

        .filter_ul1{
          .filter_li{
            margin: 0 10px;
          }
        }
        .filter_ul2{
          @include fj(space-evenly);
          flex-wrap: wrap;

          .filter_li{
            width: 30%;
            margin-bottom: 10px;

             .filter_icon{
               padding: 2px;
              @include wh(1.5rem,1.5rem);
              border: 1px solid #fff;
              margin-right: 2px;
            }
          }
        }
        .confirm_filter{
          @include fj(space-between);

          .filter_button_style{
            width: 48%;
          }
        }
      }

    }

}
.choose_type{
  color: #10B8F9 !important;

   .el-icon-caret-bottom{
        transform:rotate(180deg);
      }
}
.sort_left_choose{
  background: #ffff;
}
.showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.5s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-20%);
  }

.showcover-enter-active,
.showcover-leave-active {
  transition: opacity 0.3s;
}
.showcover-enter,
.showcover-leave-active {
  opacity: 0;
}
  .back_cover {
  position: fixed;
  @include wh(100%, 100%);
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.3);
}
.order_type{
  color: #10B8F9;
}
</style>
