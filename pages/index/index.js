//index.js
// pages/shopCart/shopCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图设置
    background: ['../../images/banner.png','../../images/banner.png'],
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
    swiper_height: '269rpx'
    // 轮播图设置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 体质监测跳转
  hrefTap (event) {
    console.log(event.currentTarget.dataset.key)
    let { key } = event.currentTarget.dataset;
    switch (key) {
      // 体质监测
      case 'examinate':
        // wx.navigateTo({
        //   url: '/pages/examinate/examinate'
        // })
        wx.navigateTo({
          url: '/pages/appointInfo/appointInfo'
        })
        break;
        // 场馆地图
        case 'map':
          wx.navigateTo({
            url: '/pages/map/map'
          })
          break;
          // 体育大讲堂
        case 'lecture':
          wx.navigateTo({
            url: '/pages/publicLecture/publicLecture'
          })
          break;
          门票卡劵
        case 'cart':
          wx.navigateTo({
            url: '/pages/venue/venue'
          })
          break;
      default:
        break;
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
