import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)
const state = {
  geohash: '', // 当前选中地址的经纬度字符串
  shopInfoLength: 0// 店铺的详细信息
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
