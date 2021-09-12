import { request } from './request'
// 获取店铺食品列表
export function shopMenu (restaurant_id) {
  return request({
    method: 'GET',
    url: '/shopping/v2/menu',
    params: {
      restaurant_id
    }
  })
}
// 获取评价信息
export function getRatingList (restaurant_id, tag_name = '', offset = 0, limit = 10) {
  return request({
    method: 'GET',
    url: `/ugc/v2/restaurants/${restaurant_id}/ratings`,
    params: {
      tag_name,
      offset,
      limit
    }
  })
}
// 获取商铺评价分数
export function ratingScores (restaurant_id) {
  return request({
    method: 'GET',
    url: `ugc/v2/restaurants/${restaurant_id}/ratings/scores`
  })
}

// 获取评价分类
export function ratingTags (restaurant_id) {
  return request({
    method: 'GET',
    url: `ugc/v2/restaurants/${restaurant_id}/ratings/tags`
  })
}
