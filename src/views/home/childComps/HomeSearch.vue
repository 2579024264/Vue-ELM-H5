<template>
  <div id="search">
     <div class="input">
      <el-input
          class="search_button"
          placeholder="请搜索商品"
          @focus="searchFood"
          >
      </el-input>
     </div>

  </div>
</template>

<script>
export default {
  name: 'HomeSearch',
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    searchFood () {
      console.log(2222)
      this.$router.push('/searchfood')
    }

  }
}

</script>

<style lang='scss' scoped>
.input{
  padding: 70px 1rem 0;

  .search_button{
    position: relative;
    &:after{
      content:"搜索";
      display:block;
      position: absolute;
      width: 4.5rem;
      height: 40px;
      line-height: 40px;
      background: $nav_bar;
      border-radius: 20px;
      right: 0px;
      top: 0px;
      text-align: center;
      color: $bc;
    }
  }

}

</style>
