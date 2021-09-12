// 防抖函数
export function debounce (fun, delay = 5000) {
  let timer = null
  return function (...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(async () => {
        const result = await fun(args)
        resolve(result)
      }, delay)
    })
  }
}

// 处理图片路径
export const getImgPath = {
  methods: {
    // 传递过来的图片地址需要进行处理才能正常使用
    getImgPath (path) {
      let suffix
      if (!path) {
        return require('assets/image/touxiang.png')
      }
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      const url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix
      return 'https://fuss10.elemecdn.com' + url
    }
  }
}
