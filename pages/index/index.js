// pages/shopCart/shopCart.js
import { img_url,formatDate } from '../../utils/util'
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js'); 
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图设置
    background: ['https://sports-bureau.oss-cn-hangzhou.aliyuncs.com/images/banner.png','https://sports-bureau.oss-cn-hangzhou.aliyuncs.com/images/banner.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    indicatorColor: 'rgba(255, 255, 255, .5)',
    indicatorActiveColor: '#ffffff',
    swiper_height: '269rpx',
    // 轮播图设置
    userInfo: wx.getStorageSync('userInfo'),
    flag: true,
    imageUrl: img_url,
    // 体育头条的轮播设置
    indicatorPorts: false,
    autoplayPorts: true,
    verticalPorts: true,
    circularPorts: true,
    intervalPorts: 3000,
    durationPorts: 500,
    previousMarginPorts: 0,
    nextMarginPorts: 0,
    indicatorColorPorts: 'rgba(255, 255, 255, .5)',
    swiper_heightPorts: '80rpx',
    // 体育头条的数据
    sportArr: [],
    stadiutmData: [],
    location: {},
    recommendData: [],
    scientificData: [],
    mapLongitude: null,
    mapLatitude: null,
    linkUrl: '',
    isOpen: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.getBanner();
    this.getHotData();
    this.getRecommendData();
    this.getScientificData();
    this.setData({
      isOpen: app.globalData.isOpen
    })
  },
  //推荐场馆
  getStadium() {
    let that = this;
    let params = {
      mapLongitude : this.data.mapLongitude,
      mapLatitude : this.data.mapLatitude
    }
    console.log(params)
    app.request('/sportvenuesserver/stadium/stadiumRecommendList', params).then(res => {
      if (res.code == 200) {
        res.data.forEach(item=>{
          if (item.tags) {
            item.tagsArr = item.tags.split(',');
          }
          if (item.stadiumItems) {
            item.itemArr = item.stadiumItems.split(',');
          }
        })
        that.setData({
          stadiutmData: res.data
        })
      }
    })
  },
  //banner
  getBanner() {
    let that = this;
    app.request('/sportactivityserver/banner/getUseAll', { bannerType: 1 }).then(res => {
      if (res.code == 200) {
        that.setData({
          background: res.data
        })
      }
    })
  },
  //体育头条
  getHotData() {
    let that = this;
    let params = {
      curPage: 1,
      maxPage: 10,
      newsTop: 1,
    }
    app.request('/sportmedicalserver/NewsRelease/listNewsRelease', params).then(res => {
      if (res.code == 200) {
        res.data.list.forEach(item => {
          item.createTimeData = formatDate(item.createTime,'hh:mm:ss')
        })
        console.log(res.data)
        that.setData({
          sportArr: res.data.list
        })
      }
    })
  },
  //推荐资讯
  getRecommendData() {
    let that = this;
    let params = {
      curPage: 1,
      maxPage: 10,
      recommend: '1'
    }
    app.request('/sportmedicalserver/NewsRelease/listNewsRelease', params).then(res => {
      if (res.code == 200) {
        that.setData({
          recommendData: res.data.list
        })
      }
    })
  },
  //科学健身
  getScientificData() {
    let that = this;
    let params = {
      curPage: 1,
      maxPage: 3,
      newsFitness: '1'
    }
    app.request('/sportmedicalserver/NewsRelease/listNewsRelease', params).then(res => {
      if (res.code == 200) {
        that.setData({
          scientificData: res.data.list
        })
      }
    })
  },
  // 体质监测跳转
  hrefTap (event) {
    let { key,item } = event.currentTarget.dataset;
    let url = '';
    let type = 0;
    switch (key) {
      // 授权
      case 'avatar':
        if(this.data.userInfo.idCard) {
            url= '/pages/mine/index'
            type = 1
        } else {
          url = '/pages/authorization/authorization';
        }
        break;
      // 体质监测
      case 'examinate':
        url = '/pages/examinate/examinate'
        break;
      // 场馆地图
      case 'map':
        url = '/pages/map/map'
        break;
        // 体育大讲堂
      case 'lecture':
        url = '/pages/publicLecture/publicLecture'
        break;
        门票卡劵
      case 'cart':
        url = '/pages/venue/venue'
        break;
      case 'venueDetail':
        url = '/pages/venueDetail/venue?id=' + item.stadiumId
        break;
      case 'scientificFitness':
        let id = item.id ? item.id : item.newsReleaseId
        url = '/pages/slimming/slimming?id=' + id
        break;
      case 'matchReg':
        url = '/pages/matchReg/index'
        break;

      default:
        break;
    }
    if(type == 0) {
      wx.navigateTo({
        url
      })
    } else {
      wx.switchTab({
        url
      })
    }
  },
  closeMask () {
    this.setData({
      flag: true
    })
  },
  toVenue(e) {
    let {item} = e.currentTarget.dataset;
    if (item.bannerType == 0) {
      let id = 1;
      wx.navigateTo({
        url: '/pages/venueDetail/venue?id=' + id
      })
    } else {
      this.setData({
        linkUrl: 'www.baidu.com'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let userInfo = app.globalData.userInfo ? app.globalData.userInfo : wx.getStorageSync('userInfo')
    console.log(wx.getStorageSync('userInfo'))
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
    console.log(app.globalData)
    if (!app.globalData.mapLocation || !app.globalData.location) {
      // 新建百度地图对象 
      var qqmapsdk = new QQMapWX({
        key: app.globalData.mapKey
      });
      //根据经纬度获取地址
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          let mapLocation = {
            mapLongitude: res.longitude,
            mapLatitude: res.latitude
          }
          let location = {};
          app.globalData.mapLocation = mapLocation;
          wx.setStorageSync('mapLocation', mapLocation);
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (data) {
              location = {
                province: data.result.address_component.province,
                city: data.result.address_component.city,
                district: data.result.address_component.district,
              }
              app.globalData.location = location
              that.setData({
                location: location,
                mapLongitude: res.longitude,
                mapLatitude: res.latitude,
              })
              that.getStadium();
            },
            fail: function (res) {
              console.log(res);
            }
          });
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})