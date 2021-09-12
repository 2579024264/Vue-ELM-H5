import {
  SAVE_GEOHASH,
  SAVE_SHOPINFO_LENGTH
} from './mutations-type.js'

export default {
  [SAVE_GEOHASH] (state, geohash) {
    state.geohash = geohash
  },
  [SAVE_SHOPINFO_LENGTH] (state, shopInfoLength) {
    state.shopInfoLength = shopInfoLength
  }
}
