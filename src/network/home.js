import { request } from './request'

// 定位当前城市信息
export function getCityLocation () {
  return request({
    method: 'GET',
    url: '/v1/cities',
    params: {
      type: 'guess'
    }
  })
}

// 根据经纬度详细定位
export function getLocation (geohash) {
  console.log(request)
  return request({
    method: 'GET',
    url: '/v2/pois',
    params: {
      geohash
    }
  })
}

// 获取食物分类列表
export function getFoodTypes (geohash) {
  return request({
    geohash,
    group_type: '1',
    'flags[]': 'F',
    method: 'GET',
    url: '/v2/index_entry'
  })
}
