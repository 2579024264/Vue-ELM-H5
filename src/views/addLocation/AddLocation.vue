<template>
  <div id="add_location">
    <nav-bar>
      <span slot="left" class="left" @click="backCity"><i class="el-icon-arrow-left"></i></span>
      <span slot="center">新增收货地址</span>
    </nav-bar>
    <!-- 地图区域 -->
    <div id="map"></div>
    <!-- 地址详细信息区 -->
    <div class="detail_info">
          <el-form ref="detailLocationRef"
                  :model="detailLocationForm"
                  label-width="60px"
                  :rules="detailLocationRules"
                  >
            <el-form-item label="地址" prop="location_name">
                  <el-popover
                    placement="top"
                    width="160"
                    v-model="visible">
                    <div class="popover">
                      <p>{{location}}</p>
                      <div>
                        <el-button class="useButton" @click="useLoacation">使用地址</el-button>
                      </div>
                    </div>
                     <el-input slot="reference" v-model="detailLocationForm.locate_name"></el-input>
                  </el-popover>

            </el-form-item>
            <el-form-item label="门牌号">
              <el-input v-model="detailLocationForm.door_card"></el-input>
            </el-form-item>
            <el-form-item label="标签">
              <el-tag type="info" v-for="(item,index) in tag"
                      :key="index"
                      @click=chooseTag(index)
                      :class="{'tagActive': tagIndex === index}">{{item}}</el-tag>
            </el-form-item>
             <el-form-item label="联系人" prop="person_name">
              <el-input v-model="detailLocationForm.person_name"></el-input>
            </el-form-item>
             <el-form-item label="手机号" prop="phone_number">
              <el-input v-model="detailLocationForm.phone_number"></el-input>
            </el-form-item>
          </el-form>
          <el-button  type="primary" class="save" @click="save">保存</el-button>
      </div>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import { getCityLocation, getLocation } from 'network/home'
export default {
  name: 'AddLocation',
  data () {
    return {
      // 用户输入的地理位置表单
      detailLocationForm: {
        locate_name: '',
        door_card: '',
        tag: 0,
        phone_number: '',
        person_name: ''

      },
      // 表单验证规则
      detailLocationRules: {
        location_name: [
          { required: true, message: '输入收货地址', toggle: 'blur' }
        ],
        person_name: [
          { required: true, message: '请输入联系人姓名', toggle: 'blur' }
        ],
        phone_number: [
          { required: true, message: '请输入您的联系电话', toggle: 'blur' },
          { min: 11, max: 11, message: '长度为11个数字', trigger: 'blur' }
        ]
      },
      visible: false,
      // 标签数组
      tag: ['家', '公司', '学校'],
      // 当前选中的标签
      tagIndex: 0,
      longitude: 0,
      latitude: 0
    }
  },
  methods: {
    // 点击返回到city页面
    backCity () {
      this.$router.back()
    },
    // 初始化地图
    createdMap () {
      var map = new BMapGL.Map('map')
      var point = new BMapGL.Point(this.longitude, this.latitude)
      map.centerAndZoom(point, 15)
      // 添加标注
      var content = "<span class='el-icon-location'></span>"
      var label = new BMapGL.Label(content, { // 创建文本标注
        position: point // 设置标注的地理位置
        // offset: new BMapGL.Size(10, 20)           // 设置标注的偏移量
      })
      map.addOverlay(label)
      label.addEventListener('click', function () {
        alert('您点击了标注')
      })
      map.enableScrollWheelZoom(true)
      map.setHeading(64.5) // 设置地图旋转角度
      map.setTilt(45) // 设置地图的倾斜角度
      // 设置控件的位置
      var Scaleopts = {
        anchor: BMAP_ANCHOR_BOTTOM_LEFT,
        offset: new BMapGL.Size(10, 10)
      }
      var scaleCtrl = new BMapGL.ScaleControl(Scaleopts)// 添加比例尺控件
      var zoomCtrl = new BMapGL.ZoomControl()// 添加缩放控件
      map.addControl(scaleCtrl)
      map.addControl(zoomCtrl)
    },
    // 点击使用按钮
    useLoacation () {
      this.detailLocationForm.locate_name = window.sessionStorage.getItem('location_address') + window.sessionStorage.getItem('location_name')
    },
    // 选择住址标签
    chooseTag (index) {
      this.detailLocationForm.tag = index
      this.tagIndex = index
    },
    // 保存用户的收货地址信息
    save () {
      // 将用户的信息保存在本地
      console.log(this.detailLocationForm)
      window.localStorage.setItem('location', this.detailLocationForm)
    },
    // 定位当前地址
    async  currentLocation () {
      const { latitude, longitude } = await getCityLocation()
      this.latitude = latitude
      this.longitude = longitude
      console.log(this.latitude)
      console.log(this.longitude)
    }
  },
  created () {
    this.currentLocation()
  },
  mounted () {
    // 延时当前地图的展示
    setTimeout(() => {
      this.createdMap()
    }, 500)
  },
  components: {
    NavBar
  },
  computed: {
    location () {
      return window.sessionStorage.getItem('location_name')
    }
  }
}

</script>

<style lang='scss' scoped>
#add_location{
  padding: 0 0.8rem 0;
  margin-top: 64px;
  .left{
    margin-left: 0.7rem;
  }
  #map{
    //去掉百度地图的logo
    @include wh(100%,13rem)
  }
  .detail_info{
    margin-top: 2rem;
  }
  .el-form-item{
    margin-bottom: 1.5rem;
  }
  //标签样式
 .el-tag{
    padding: 0 1.8rem;
    margin-right: 0.5rem;
  }
  .tagActive{
    background: $fc;
    color: #fff;
  }
  .save{
    width: 100%;
  }
  .el-button--primary{
    background-color: $fc;

  }

}

</style>
