import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'https://elm.cangdu.org',
    timeout: 5000
  })
  // 设置请求拦截器
  instance.interceptors.request.use(config => {
    // 在request中显示进度条
    return config
  }, err => {

  })
  // 响应拦截器
  instance.interceptors.response.use(res => {
    // 在响应拦截器中隐藏进度条
    // NPogress.done()
    return res.data
  }, err => {
  })
  return instance(config)
}
