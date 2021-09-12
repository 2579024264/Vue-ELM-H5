import { request } from './request'

/**
 * 根据关键词搜寻餐馆
 */
export function searchFood (args) {
  return request({
    method: 'GET',
    url: '/v4/restaurants',
    params: {
      geohash: args[0],
      keyword: args[1]
    }
  })
}
/**
 * 参观详情
 */
export function searchFoodById (shopid) {
  return request({
    methods: 'GET',
    url: `/shopping/restaurant/${shopid}`
  })
}
