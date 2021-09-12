import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体
import 'assets/font/iconfont.css'
import 'assets/font/iconfont.json'
import 'assets/font/iconfont.js'
import 'assets/font/iconfont.ttf'
// 引入全局样式
import 'assets/style/mixin.scss'
import 'assets/style/common.scss'
// 引入自动适配配置
import 'config/rem.js'
// 引入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 引入swiper样式
import 'swiper/swiper-bundle.css'
// 引入vue-baidu-map
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: '96Ke88WsAmGcThmVBqx2aaeOrFhwxjsx'
})
Vue.use(VueAwesomeSwiper)
// 自定义指令
Vue.directive('focus', function (el) {
  el.querySelector('input').focus()
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
