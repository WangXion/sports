// pages/orderPayment/orderPayment.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    details: {},
    userInfo: null,
    id: null,
    number: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item);
    this.setData({
      details: item,
      id: options.id,
      userInfo: app.globalData.userInfo
    })
  },
  handlerCheck () {
    this.setData({
      checked: !this.data.checked,
    })
  },
  buy () {
    wx.navigateTo({
      url: '/pages/paySuccess/paySuccess'
    })
  },
  count(e){
    let type = e.currentTarget.dataset.type;
    let number = this.data.number;
    let limitNumber =  3 // this.data.details.limitNumber;
    if(type == 'add') {
      if(number <  limitNumber) {
        number++
      }
    } else {
      if(number>1) {
        number--
      }
    }
    this.setData({
      number: number
    })
  },
  submit() {
    if(this.data.checked) {
      wx.navigateTo({
        url: '/pages/orderPayment/orderPayment?id='+ this.data.id+'&item='+JSON.stringify(this.data.details)+'&number='+this.data.number
      })
    } else {
      wx.showToast({
        title: '请选勾选购买须知',
        icon: 'none'
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