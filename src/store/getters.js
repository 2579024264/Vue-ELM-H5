import {
  GET_GEOHASH,
  GET_SHOPINFO_LENGTH
} from './mutations-type'
export default {
  // 食物分类列表操作
  [GET_GEOHASH] (state) {
    return state.geohash
  },
  [GET_SHOPINFO_LENGTH] (state) {
    return state.shopInfoLength
  }
}
