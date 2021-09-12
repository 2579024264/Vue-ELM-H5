<template>
    <div class="food_container">
      <!--导航栏navb-bar -->
       <nav-bar class="nav_var" :title="this.queryInfo.title"></nav-bar>
       <!-- 分类 排序 筛选 -->
       <sort-choose :current_category="queryInfo.title"
                     class="sort_choose"
                     @shopListParams="shopListParams"></sort-choose>
       <!-- 商品列表 -->
       <shop-list class="shop_list"
                  :restaurantCategoryId="queryInfo.restaurant_category_id"
                  :restaurantCategoryIds="restaurant_category_ids"
                  :deliverMode="delivery_modes"
                  :supportIds="support_ids"
                  :sortByType="sortByType"
                  :confirmSelect="confirmSelect"></shop-list>
    </div>
</template>

<script>
import NavBar from './childComps/FoodNavBar'
import SortChoose from './childComps/FoodSortChoose'
import ShopList from 'components/content/ShopList'

export default {
  name: 'Food',
  data () {
    return {
      queryInfo: {
        geohash: '',
        title: '',
        restaurant_category_id: ''
      },
      restaurant_category_ids: null, // 筛选类型的id
      delivery_modes: null, // 选择的配送方式
      sortByType: '', // 排序方式
      support_ids: [], // 选中的商铺活动列表
      sortBy: '', // 筛选条件,
      confirmSelect: false// 判断是否被点击确认的

    }
  },
  components: {
    NavBar,
    SortChoose,
    ShopList
  },
  methods: {
    shopListParams (...args) {
      const shopListParams = args[0]
      this.delivery_modes = shopListParams.delivery_modes
      this.restaurant_category_ids = shopListParams.restaurant_category_ids
      this.sortByType = shopListParams.sortByType
      this.support_ids = shopListParams.support_ids
      this.confirmSelect = shopListParams.confirmStatus
    }
  },
  mounted () {
  // 获取url栏中的内容
    this.queryInfo = this.$route.query
  }
}

</script>

<style lang='scss' scoped>
.food_container{

  .nav_var{
    position: relative;
    z-index: 99;
  }

  .sort_choose{
    padding-top: 50px;
    position: relative;
    z-index: 80;
  }
  .shop_list{
  }
}

</style>
