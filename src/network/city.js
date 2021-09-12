import { request } from './request'
// 根据用户输入的关键词进行地址的搜索
export function getLocationsByWords (options) {
  return request({
    method: 'GET',
    url: '/v1/pois',
    params: {
      city_id: options[0],
      keyword: options[1]
    }
  })
}
