// pages/orderPayment/orderPayment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weixinSelecetd: false,
    vipSelecetd: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择微信还是支付宝
  method (event) {
    let { type } = event.currentTarget.dataset;
    if (type === 'weiixn') {
      this.setData({
        weixinSelecetd: !this.data.weixinSelecetd,
        vipSelecetd: false
      })
    }else {
      this.setData({
        vipSelecetd: !this.data.vipSelecetd,
        weixinSelecetd: false
      })
    }
  },
  buy () {
    wx.navigateTo({
      url: '/pages/paySuccess/paySuccess'
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