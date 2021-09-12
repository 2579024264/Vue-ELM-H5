import { request } from './request'
/**
 * 获取food页面的sort的种类列表
 */
export function foodSort (latitude, longitude) {
  return request({
    method: 'GET',
    url: '/shopping/v2/restaurant/category',
    params: {
      latitude,
      longitude
    }

  })
}
/**
 * 获取food页面的配送方式
 */
export function delivery_mode (latitude, longitude) {
  return request({
    method: 'GET',
    url: '/shopping/v1/restaurants/delivery_modes',
    params: {
      latitude,
      longitude
    }
  })
}
/**
 * 获取food页面商家属性活动类表
 *
 */
export function foodActivity (latitude, longitude) {
  return request({
    method: 'GET',
    url: '/shopping/v1/restaurants/activity_attributes',
    params: {
      latitude,
      longitude
    }
  })
}
