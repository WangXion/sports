// pages/shopCart/shopCart.js
import { img_url } from '../../utils/util'
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
    sportArr: [
      {
        title: '体育新闻头条内容闻头条内容体育新闻头条内容闻头条内容体育新闻头条内容闻头条内容',
        time: '07/18'
      },
      {
        title: '111111111111111容闻头条内容',
        time: '07/19'
      },
      {
        title: '2222222222222222容闻头条内容',
        time: '07/20'
      }
    ],
    provice: '杭州大关体育馆'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!this.data.provice) {
      // wx.getLocation({
      //   type: 'wgs84',
      //   success(res) {
      //     console.log(res,'11111')
      //     const latitude = res.latitude
      //     const longitude = res.longitude
      //     var that = this; 
      //     wx.request({ // ②百度地图API，将微信获得的经纬度传给百度，获得城市等信息
      //       url: 'https://api.map.baidu.com/geocoder/v2/?ak=5uyQfS5GVKmnG3s21ZzQMY9sLcsfsvwI=' + latitude + ',' + longitude + '&output=json&coordtype=wgs84ll',
      //       data: {},
      //       header: {
      //         'Content-Type': 'application/json'
      //       },
      //       success: function (res) {
      //         console.log(res.data,'22222')
      //         console.log(res.data.result);
      //       },
      //       fail: function () {
      //         // fail
      //       },
      //       complete: function () {
      //         // complete
      //       }
      //     })
      //   }
      // })
    }
  },
  // 体质监测跳转
  hrefTap (event) {
    let { key } = event.currentTarget.dataset;
    let url = '';
    switch (key) {
      // 授权
      case 'avatar':
        url = '/pages/authorization/authorization'
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
        url = '/pages/venueDetail/venue'
        break;
      case 'scientificFitness':
        url = '/pages/slimming/slimming?key='+2
        break;
      default:
        break;
    }
    wx.navigateTo({
      url
    })
  },
  closeMask () {
    this.setData({
      flag: true
    })
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
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo
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
