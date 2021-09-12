import { request } from './request'
// 获取全部城市的信息
export function getAllCity () {
  return request({
    method: 'GET',
    url: '/v1/cities',
    params: {
      type: 'group'
    }
  })
}

// 获取热门城市信息
export function getHotCity () {
  return request({
    method: 'GET',
    url: '/v1/cities',
    params: {
      type: 'hot'
    }
  })
}
