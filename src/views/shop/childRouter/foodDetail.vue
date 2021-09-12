<template>
  <div>我是foodDetail页面</div>
</template>

<script>
export default {
  name: 'FoodDetail',
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    console.log(this.$route.params)
  }
}

</script>

<style lang='scss' scoped>

</style>
