<template>
  <div class="tabs">
     <el-tabs  v-model="activeName" @tab-click="handleClick">
       <!-- 商品栏 -->
     <el-tab-pane label="商品" name="shop" >
       <div class="hot" v-if="menu_left_list.length>0">
         <div class="name"><b style="font-weight:700"> 热销</b></div>
         <div class="message"><b style="font-weight:700;color:black;font-size:15px;">热销</b>大家喜欢吃，才叫真好吃！</div>
       </div>
       <div v-if="menu_left_list.length===0"
            style="color:red;text-align:center;padding-top:20px;">
         <span><b style="font-weight:700"> 抱歉！</b>

         </span>
         <span  style="color:red;" >店铺暂不开张，请到别处转转吧!</span>
         <div class="svg-icon">
          <svg t="1624155330337" class="icon"
                viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8549" width="200" height="200">
                <path d="M1021.707569 507.946688c0 68.831868-6.189916 137.230442-30.949581 197.025032-25.688152 61.899162-73.041011 112.161281-119.836777 158.895148a496.926471 496.926471 0 0 1-164.342274 106.466559c-59.79459 24.759665-122.684139 53.666573-191.516007 53.666573s-134.444979-22.1599-194.301469-46.981464c-61.899162-25.688152-114.142054-67.098691-160.93782-113.832558a500.392824 500.392824 0 0 1-111.418492-162.052006C23.707384 641.277483 2.290274 576.778556 2.290274 507.946688a515.620018 515.620018 0 0 1 38.872673-196.158444c25.750051-61.899162 70.007952-114.018256 116.74182-160.93782s100.338541-86.968322 162.361501-112.656475A507.077933 507.077933 0 0 1 514.815333 0.002166c68.831868 0 132.526105 18.569749 192.320696 43.63891 61.899162 25.688152 124.664912 53.91417 171.398779 100.648037s72.174423 110.490004 97.862575 172.451064c24.821564 59.856489 45.310186 122.746038 45.310186 191.206511z" fill="#FFD635" p-id="8550"></path><path d="M624.191152 957.891695c-64.870322 0-126.831383-20.921917-183.221519-44.3198-58.494708-24.264471-107.704542-63.260943-151.776744-107.395045a471.91921 471.91921 0 0 1-104.795281-152.829031c-23.397883-56.390136-43.329413-117.237012-43.329413-182.169233a486.775008 486.775008 0 0 1 36.396707-185.016595c24.264471-58.494708 66.232103-107.518844 110.118609-151.591047S382.227329 52.430757 440.660138 28.166285A469.133747 469.133747 0 0 1 534.127872 0.559259C527.752258 0.002166 521.314745 0.002166 514.815333 0.002166a507.077933 507.077933 0 0 0-194.549065 38.191783c-61.899162 25.750051-115.627634 66.108305-162.361501 112.842172s-90.991768 99.038659-116.74182 160.937821A515.620018 515.620018 0 0 0 2.290274 507.946688c0 68.831868 21.41711 133.330795 46.238674 193.187284a499.773832 499.773832 0 0 0 111.418491 162.052006c46.733867 46.733867 99.038659 88.144406 160.937821 113.832558 59.856489 24.759665 125.5315 46.981464 194.301468 46.981464s131.721416-28.845009 191.516007-53.666573a517.848388 517.848388 0 0 0 134.568778-79.540423c-11.760841 5.818521-23.769278 11.389446-36.087212 16.527076-56.761531 23.335984-115.813332 50.571615-180.993149 50.571615z" fill="#F7B523" p-id="8551"></path><path d="M433.294137 132.156877s3.652051-2.847361 10.275261-7.304101a240.168748 240.168748 0 0 1 28.659312-16.650875 235.712008 235.712008 0 0 1 44.3198-16.836572A217.513655 217.513655 0 0 1 571.762562 83.689833h14.05111c4.39484 0 9.408673 0.309496 13.927311 0.618992s9.099177 0.990387 13.555917 1.609378 8.789681 1.547479 13.060723 2.475967a168.613317 168.613317 0 0 1 24.078774 7.489798 140.139702 140.139702 0 0 1 20.488623 9.903866 123.798324 123.798324 0 0 1 27.483227 21.293312 74.278994 74.278994 0 0 1 6.623211 7.737395 27.607026 27.607026 0 0 1 2.16647 3.033059s-5.19953 0.928487-13.617815 1.547479c-4.147244 0.309496-9.099177 0.433294-14.670102 0.680891s-11.637042 0-18.136454 0-13.432118-0.618992-20.67432-1.114185-14.732001-1.423681-22.469396-2.352168l-11.698941-1.609379-12.008438-1.918874c-4.085345-0.680891-7.737395-1.423681-12.379832-2.042672l-6.189916-1.237983a55.214052 55.214052 0 0 0-5.818522-0.74279 434.779712 434.779712 0 0 0-91.54886 0l-32.125665 2.723563-9.222975 0.680891z" fill="#FFEF57" p-id="8552"></path><path d="M450.935399 799.306043v-3.837748-4.518639-2.909261c0-1.114185 0.618992-2.475966 0.928487-3.837748 0.74279-2.723563 1.547479-6.189916 2.537866-9.222975s2.290269-6.189916 3.713949-9.780067a121.384256 121.384256 0 0 1 12.379833-22.2218 125.469601 125.469601 0 0 1 20.612421-22.407496l6.189916-5.323328 6.932706-4.828135a141.191988 141.191988 0 0 1 14.855799-8.975378 160.504527 160.504527 0 0 1 71.060237-17.826959H603.888227l5.013832 0.433294c3.404454 0.371395 6.932706 0.680891 10.151463 1.114185s6.189916 1.114185 9.099177 1.733177a159.266543 159.266543 0 0 1 34.168337 11.327546c5.323328 2.414067 10.33716 5.447126 15.227194 8.17069s9.408673 6.189916 13.679715 9.656269a129.98824 129.98824 0 0 1 21.788505 21.912303c2.97116 3.837748 5.447126 7.861194 7.799294 11.451345s3.961546 7.675496 5.632824 11.141849 2.847361 7.056504 3.899647 10.213362 1.547479 6.189916 2.16647 8.975379a60.104086 60.104086 0 0 1 1.48558 12.689328 34.663531 34.663531 0 0 1 0 4.456739 18.569749 18.569749 0 0 1-30.949581 13.184522l-1.42368-1.237983-2.475967-2.104572c-1.48558-1.299882-3.528252-3.342555-6.189916-5.509025s-6.189916-4.642437-9.841967-7.366001-8.480185-5.013832-13.308319-7.551697c-2.661664-1.114185-5.013832-2.475966-7.923093-3.466353l-4.085345-1.733177-4.456739-1.547479a142.925165 142.925165 0 0 0-19.003043-5.632824 182.973922 182.973922 0 0 0-20.860018-3.775849c-1.795076 0-3.652051 0-5.385227-0.618991h-16.279479a165.456459 165.456459 0 0 0-21.479009 1.423681 195.787049 195.787049 0 0 0-20.612421 4.023445 159.637938 159.637938 0 0 0-18.569749 6.189916c-3.033059 1.114185-5.509025 2.785462-8.480185 3.775849s-5.323328 2.661664-7.861194 4.085345c-4.704336 2.97116-9.408673 5.694723-13.308319 8.603983-1.856975 1.48558-3.652051 2.909261-5.509026 4.147244l-4.209143 3.342555c-0.680891 0.495193-1.361782 0.990387-1.918874 1.48558s-1.361782 1.361782-1.918874 1.980773l-3.094958 3.218756-2.599765 2.599765a18.569749 18.569749 0 0 1-30.949581-13.24642z" fill="#943436" p-id="8553"></path><path d="M922.421314 433.296299l-6.870807-3.899647-7.861194-4.518639c-3.094958-1.795076-6.62321-4.271042-10.460958-6.685109s-8.10879-5.261429-12.379832-8.294488-8.665883-6.189916-12.998824-9.718169-9.037278-6.994605-13.432118-11.01805-9.099177-7.737395-13.370219-11.946539c-8.85158-8.170689-17.146068-16.898471-24.759665-25.254858S806.174688 335.557523 800.789461 328.067724s-9.903866-13.494017-12.998824-18.074555c-1.48558-2.352168-2.661664-4.209143-3.528252-5.447127l-1.299883-2.228369a21.664707 21.664707 0 1 1 37.139497-22.407497 11.82274 11.82274 0 0 1 0.928488 1.733177v0.371395l0.680891 1.361781c0.557092 1.052286 1.361782 2.599765 2.352168 4.642437 2.22837 4.023446 5.509025 9.903866 9.903866 16.774673s9.718168 14.7939 15.784286 23.088387 12.998824 16.836572 20.364824 24.759665c3.590151 4.209143 7.427899 8.10879 11.203748 12.008438s7.613597 7.551698 11.327547 11.203748 7.551698 6.808908 11.07995 9.965765 6.932706 6.189916 10.151463 8.418286 6.189916 4.828135 8.727781 6.870807l7.489799 5.199529 6.189916 4.580538a13.122622 13.122622 0 0 1-13.865412 22.407497zM248.029946 411.322097l6.189916-4.580538 7.4279-5.19953c2.847361-2.042672 5.570925-4.39484 8.789681-6.870807s6.62321-5.19953 10.151462-8.418286 7.427899-6.189916 11.07995-9.965765S299.40625 369.106868 303.305898 365.207221s7.613597-7.799294 11.141849-12.008437c7.366-8.170689 14.174908-16.836572 20.364824-24.759665s11.513244-16.155681 15.846185-23.088387 7.613597-12.751227 9.841967-16.774673l2.414067-4.642437 0.618992-1.361782v-0.309496a21.664707 21.664707 0 0 1 39.12027 18.569749c0 0.618992-0.618992 1.237983-0.990386 1.856975l-1.361782 2.228369-3.528252 5.447127c-3.033059 4.580538-7.366 10.894252-12.998824 18.074555s-12.379832 15.47479-19.807732 23.893076-15.908085 17.084169-24.759665 25.254858c-4.332941 4.209143-8.913479 8.10879-13.370218 11.946539s-9.099177 7.489799-13.432119 11.01805-8.727782 6.437513-12.998824 9.532471-8.232589 5.818521-12.379832 8.294488-7.427899 4.890034-10.460958 6.685109l-7.923093 4.518639L262.266753 433.296299a13.060723 13.060723 0 0 1-17.950757-4.828135 13.246421 13.246421 0 0 1 3.71395-17.146067z" fill="#F7B523" p-id="8554"></path><path d="M462.324844 504.85173a71.184036 71.184036 0 0 1-4.332941 27.35943 71.555431 71.555431 0 0 1-16.588975 22.098 69.512759 69.512759 0 0 1-22.840791 14.7939 70.812641 70.812641 0 0 1-26.61664 7.427899 72.298221 72.298221 0 0 1-26.988034-6.189916A70.317448 70.317448 0 0 1 342.735664 554.185362a75.393179 75.393179 0 0 1-21.850404-49.519329 71.307834 71.307834 0 0 1 5.447126-27.235632 70.317448 70.317448 0 0 1 16.155681-22.283698 66.727296 66.727296 0 0 1 49.519329-20.983816 69.265162 69.265162 0 0 1 26.740438 6.189916 71.431633 71.431633 0 0 1 23.769278 13.927312 71.555431 71.555431 0 0 1 13.617816 23.954975 69.884154 69.884154 0 0 1 6.189916 26.61664zM863.802808 504.85173a71.184036 71.184036 0 0 1-4.332942 27.35943 71.555431 71.555431 0 0 1-16.588975 22.098 69.512759 69.512759 0 0 1-22.840791 14.7939 70.812641 70.812641 0 0 1-26.616639 7.427899 72.298221 72.298221 0 0 1-26.988035-6.189916 70.317448 70.317448 0 0 1-22.345597-15.846185 75.393179 75.393179 0 0 1-21.850404-49.51933 71.307834 71.307834 0 0 1 5.447126-27.235631 70.317448 70.317448 0 0 1 16.155681-22.283698 66.727296 66.727296 0 0 1 49.51933-20.983816 69.265162 69.265162 0 0 1 26.740437 6.189916A71.431633 71.431633 0 0 1 844.118874 454.342014a71.555431 71.555431 0 0 1 13.617816 23.954976 69.884154 69.884154 0 0 1 6.066118 26.55474z" fill="#943436" p-id="8555">
                </path>
          </svg>
         </div>
       </div>
      <div class="shop_menu" v-if="menu_left_list.length>0">
        <div class="menu_left">
            <ul>
              <li class="menu_left_li"
                  v-for="(item,index) in menu_left_list"
                  :key="index"
                  @click="menuLeft(item,index)"
                  :class="[index == leftIndex? 'active':'']">
                {{item.name}}
              </li>
            </ul>
        </div>
        <div class="menu_right">
            <ul>
              <li class="menu_right_li"
                  v-for="(item,index) in  menu_right_list"
                  :key="index"
                  @click="toFoodDetail(item)">
                <div class="left_img">
                   <img :src="imgBaseUrl+item.image_path" alt="">
                </div>
                <div class="right_info">
                  <div class="title">{{item.name}}</div>
                  <div class="sell">月售{{item.month_sales}}</div>
                  <div class="rate">好评率{{item.satisfy_rate}}%</div>
                  <div class="price_add">
                    <div class="container">
                      <span class="price">￥{{item.specfoods[0].price}}</span>
                      <span class="add"><i class="el-icon-circle-plus"></i></span>
                    </div>
                  </div>

                </div>
              </li>
            </ul>
        </div>
        </div>
     </el-tab-pane>
    <!-- 评价栏 -->
    <el-tab-pane label="评价" name="comment">
      <section class="rating_container" id="ratingContainer">
          <header class="rating_header">
            <section class="rating_header_left">
              <p  class="rating_num">{{RatingScores.food_score | fixed}}</p>
              <p>综合评价</p>
              <p class="message">高于周边商家{{RatingScores.compare_rating | rate}}</p>
            </section>
            <section class="rating_header_right">
              <p>
                <span>服务态度 </span>
                <span class="rating_num">4.7</span>
              </p>
              <p>
                <span>菜品评价</span>
                <span class="ratin_num">4.8</span>
              </p>
              <p>
                <span>送达时间</span>
                <span class="rating_num">{{RatingScores.deliver_time | time}}</span>
              </p>
            </section>
          </header>
          <ul class="tag_list_ul">
            <li v-for="(item,index) in RatingTags"
                :key="index"
                @click="tagListLi(index)"
                :class="[tagListIndex===index? 'tag_list_li':'',index===0? 'tag_list_li':'']"
                >
              {{item.name}}({{item.count}})</li>
          </ul>
          <ul class="rating_list_ul">
            <li  class="rating_list_li" v-for="(item,index) in Ratinglist" :key="index">
              <div class="top">
                <div class="img">
                  <!-- getImgPath(item.avatar) -->
                  <img :src="getImgPath(item.avatar)" alt="" class="user_avatar">
                </div>
                <section class="rating_list_details">
                        <div class="username_time">
                          <span class="username">{{item.username}}</span>
                          <span class="time">{{item.rated_at}}</span>
                        </div>
                        <div class="title">
                          <span>服务:<b>超赞</b></span>
                          <span>味道:<b>超赞</b></span>
                          <span>包装:<b>超赞</b></span>
                          <span>配送:<b>超赞</b></span>
                        </div>
                </section>
              </div>
              <section class="user_desc">
                <span >{{item.time_spent_desc}}</span>
              </section>
              <ul class="food_img_ul">
                <li class="food_img_li" v-for="foodItem in item.item_ratings" :key="foodItem.id">
                  <img :src="getImgPath(foodItem.image_hash)" alt="">
                  <div class="name">
                      {{foodItem.food_name}}
                  </div>
                </li>

              </ul>
            </li>

          </ul>
      </section>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { shopMenu, getRatingList, ratingScores, ratingTags } from 'network/shop'
import { imgBaseUrl } from 'config/env'
import { getImgPath } from 'common/utils'

export default {
  data () {
    return {
      activeName: 'shop', // 选项卡tabs选中的值
      menu_left_list: [
        '骨汤米线',
        '小吃',
        '饮品',
        '套餐类',
        '骨汤面'
      ],
      restaurant_id: '', // 当前餐馆的id值
      menu_right_list: [], // 菜单列表右侧的数据
      imgBaseUrl: '',
      leftIndex: Infinity, // 当前选中的左侧的项
      Ratinglist: [], // 评价信息列表
      RatingScores: {}, // 商铺评价分数
      RatingTags: [], // 评价分类标签
      tagListIndex: Infinity// 当前点击标签的index
    }
  },
  methods: {
    handleClick () {

    },
    // 获取店铺食品列表
    shopMenu () {
      shopMenu(this.restaurant_id).then(res => {
        this.menu_left_list = res
        this.menu_right_list = res[0].foods
        this.leftIndex = 0
      })
    },
    // 点击左侧的列表，显示右侧数据
    menuLeft (item, index) {
      this.leftIndex = index
      this.menu_right_list = item.foods
    },
    // 获取评价信息
    getRatingList () {
      getRatingList(this.restaurant_id).then(res => {
        this.Ratinglist = res
        console.log('评价信息')
        console.log(this.Ratinglist)
      })
    },
    // 获取商铺评价分数
    async getRatingScroes () {
      await ratingScores(this.restaurant_id).then(res => {
        console.log(this.restaurant_id)
        this.RatingScores = res
        console.log(this.RatingScores)
      })
    },
    // 获取评价分类
    async getRatingTags () {
      await ratingTags(this.restaurant_id).then(res => {
        this.RatingTags = res
      })
    },
    // 点击分类评价标签
    async tagListLi (index) {
      this.tagListIndex = index
    },
    // 点击进入food详情页面
    toFoodDetail (item) {
      this.$router.push({
        name: 'FoodDetail',
        params: item
      })
    }

  },
  props: {
    shopInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    rate: function (rating) {
      if (rating) {
        return (rating * 100).toFixed(1) + '%'
      }
    },
    time: function (time) {
      // 后台返回的数据是分钟数
      if (time > 60 || time === 60) {
        const hour = parseInt(time / 60)
        const min = parseInt(time % 60)
        return hour + '时' + min + '分'
      } else {
        return time + '分钟'
      }
    },
    fixed: function (fixed) {
      if (fixed) {
        return fixed.toFixed(1)
      }
    }
  },
  mixins: [getImgPath],
  mounted () {
    this.imgBaseUrl = imgBaseUrl
  },
  activated () {
    this.activeName = 'shop'
    this.restaurant_id = this.$route.query.id
    this.shopMenu()
    this.getRatingList()
    this.getRatingScroes()
    this.getRatingTags()
  },
  deactivated () {
    this.menu_right_list = []
    console.log(this.activeName)
    this.activeName = 'shop'
    this.Ratinglist = []
    this.RatingScores = {}
    this.RatingTags = []
  }

}

</script>

<style lang='scss' scoped>
.tabs{
  margin-top: 150px;

    .hot{
        @include fj(space-between);
        line-height: 30px;
        height: 100%;

        .name{
          width: 25%;
          text-align: center;
          padding-left: 5px;
        }
        .message{
          width: 70%;
          @include fsc(13px,grey);
          letter-spacing: 1px;
        }
      }

    .shop_menu{
      margin-top: 10px;
      @include fj(space-between);

      .menu_left{
        width: 25%;
        background: #F2F2F2;
        height: 100vh;
        border-radius: 0 10px 0 0;

        .menu_left_li{
          border-top:1px solid #F2F2F2 ;
          border-bottom: 1px solid #F2F2F2;
          padding-left: 5px;
          height: 55px;
          border-left: 2px solid #F2F2F2 ;
          line-height: 55px;
        }
      }
      .menu_right{
        width: 73%;
        margin-top: 10px;
        padding-right:2rem;

        .menu_right_li{
          display: flex;
          padding-bottom: 2rem;

          .left_img{
            @include wh(100px,100px);
            margin-right: 10px;

            img{
              @include wh(100%,100%);
            }
          }
          .right_info{
            position: relative;
            flex: 1;
            .title{
              line-height: 30px;
              font-weight: 700;
            }
            .sell,.rate{
              @include fsc(13px,grey);
              line-height: 22px;
            }

            .price_add{
              width: 100%;
              position: absolute;
              bottom: 0px;
              .container{
                @include fj(space-between);
                line-height:20px;
              }
              .price{
                @include fsc(16px,#FA8258);
                font-weight: 700;
              }
              .add{
                @include fsc(22px,$nav_bar);
              }
            }
          }

        }
      }

    }
    .rating_container{
      padding: 1rem;

      .rating_header{
        // width: 100vw;
        @include fj(space-evenly);
        padding-bottom: 1rem;
        border-bottom: 1px solid #ccc;
        .rating_header_left{
          text-align: center;
          width:50%;
          .rating_num{
            @include fsc(22px,#FF4000);
            font-weight: 700;
          }

          .message{
            line-height: 25px;
            @include fsc(13px,#BDBDBD)
          }

        }
        .rating_header_right{
          flex:1;
              p{
                @include fj(space-around);

                span{
                  line-height:22px;
                  &:nth-child(1){
                    color: grey;
                  }
                  &:nth-child(2){
                    @include fsc(12px,#FF4000)
                  }
                }
              }
        }

      }
       .tag_list_ul{
        padding: 2rem 0.2rem 1rem;
        display: flex;
        flex-wrap: wrap;

      li{
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        margin-right: 10px;
        margin-bottom: 15px;
        background: #CEECF5;
        border-radius: 8px;
        color: #706161;
      }
      }
      .rating_list_ul{
        padding: 1rem 0.5rem;

        .rating_list_li{
          padding-bottom: 2rem;
          .top{
            display: flex;

            .img{
              width: 40px;
              height: 40px;

              .user_avatar{
                width: 100%;
                height: 100%;
              }
            }
            .rating_list_details{

              padding-left: 1rem;
              flex: 1;

             .username_time{
                @include fj(space-between);
                height: 25px;
                line-height: 25px;
                .username{
                  font-size: 12px;
                 }
                .time{
                  @include fsc(12px,#706161);
                }
               }

                .title{
                  @include fj(space-between);
                  @include fsc(12px,#706161);
                  height: 25px;
                  line-height: 25px;
                  span{
                    b{
                      color:black;
                    }
                  }
                }

            }

          }
          .user_desc{
              span{
                font-size: 12px;
                height: 20px;
                line-height: 20px;
              }
          }
          .food_img_ul{
            display: flex;
            flex-wrap:wrap;
            padding: 0.5rem;

            .food_img_li{
              width: 120px;
              height:120px;
              margin-bottom: 40px;

              img{
                width: 100%;
                height: 100%;
              }
              .name{
                text-align: center;
              }
            }
          }
        }
      }

    }

    .active{
      background: #ffff;
      border-top: 1px solid #ccc !important;
      border-bottom: 1px solid #ccc !important;
      border-left: 2px solid $blue !important;
    }
    .tag_list_li{
      background: $blue !important;
      color: #fff !important;
    }
    .icon{
      padding-top:40px;
    }
}
</style>
