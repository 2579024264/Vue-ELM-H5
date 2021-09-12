<template>
  <nav-bar :backgroundColor="'#10B8F9'">
    <span slot="left" class="food_left" @click="back">
      <i class="el-icon-arrow-left"></i>
      美食外卖
    </span>
    <span slot="center" class="food_center">
        <el-input
          placeholder="搜索商家，商品名称"
          prefix-icon="el-icon-search"
          v-model="input2"
          @focus="searchFood"
          >
        </el-input>
    </span>
    <span slot="food_right">
        <i class="el-icon-shopping-cart-2"></i>
    </span>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  data () {
    return {
      input2: ''
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    NavBar
  },
  methods: {
    back () {
      this.$router.back()
    },
    // 当鼠标聚焦时打开搜索页面searchFood
    searchFood () {
      this.$router.push('/searchfood')
    }
  }
}

</script>

<style lang='scss' scoped>
.food_left{
 font-size: 18px;
 font-weight: 700;
//  line-height: 44px;
  i{
    font-size: 18px;
  }
}
.food_right{
  i{
    font-size: 20px;
  }
}
.el-icon-arrow-left{
  font-weight: 700;
  font-size: 1.5rem;
}

</style>
