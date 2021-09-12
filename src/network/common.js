import { request } from './request'
export function shopList (latitude, longitude, offset = 0, restaurant_category_id = '', restaurant_category_ids = [], order_by = '', delivery_mode = [], support_ids = []) {
  // let supportStr = '';
  //   support_ids.forEach(item => {
  // 	if (item.status) {
  // 		supportStr += '&support_ids[]=' + item.id;
  // 	}
  // });
  // console.log(supportStr);
  const data = {
    latitude,
    longitude,
    offset,
    limit: 20,
    keyword: '',
    'extras[]': 'activities',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode,
    support_ids

  }
  return request({
    method: 'get',
    url: '/shopping/restaurants',
    params: data
  })
}
