import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/* webpackChunkName:Home */'views/home/Home')
const City = () => import(/* webpackChunkName:City */'views/city/City')
const ChangeCity = () => import(/* webpackChunkName:ChangeCity */'views/changeCity/ChangeCity')
const AddLocation = () => import(/* webpackChunkName:AddLocation */'views/addLocation/AddLocation')
const Food = () => import(/* webpackChunkName:Food */'views/food/Food')
const SearchFood = () => import(/* webpackChunkName:SearchFood */'views/searchFood/searchFood')
const Shop = () => import(/* webpackChunkName:Shop */'views/shop/Shop')
const FoodDetail = () => import(/* webpackChunkName:Shop */'views/shop/childRouter/foodDetail')
const ShopDetail = () => import(/* webpackChunkName:Shop */'views/shop/childRouter/shopDetail')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/city',
    name: 'City',
    component: City
  },
  {
    path: '/changecity',
    name: 'ChangeCity',
    component: ChangeCity
  },
  {
    path: '/addlocation',
    name: 'AddLocation',
    component: AddLocation
  },
  {
    path: '/food',
    name: 'Food',
    component: Food
  },
  {
    path: '/searchfood',
    name: 'SearchFood',
    component: SearchFood
  },
  {
    path: '/shop',
    component: Shop,

    children: [
      {
        path: '/foodDetail',
        name: 'FoodDetail',
        component: FoodDetail
      },
      {
        path: '/shopDetail',
        name: 'ShopDetail',
        component: ShopDetail
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
