// pages/authorization/authorization.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    title: '注册协议'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击授权
  bindGetUserInfo (e) {
    console.log('用户信息', e.detail.userInfo)
    // 个人信息
    wx.setStorageSync('userInfo', e.detail.userInfo)
    if (e.detail.userInfo) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
      console.log('拒绝了授权')
    }
  },
  // 协议
  agreement (event) {
    let { type } = event.currentTarget.dataset;
    if (type === 'register') {
      this.setData({
        title: '注册协议'
      })
    }else {
      this.setData({
        title: '隐私协议'
      })
    }
    this.setData({
      flag: false
    })
  },
  // 取消
  cancel () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 协议
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