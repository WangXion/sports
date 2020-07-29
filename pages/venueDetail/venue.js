// pages/venueDetail/venue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: ['游泳','羽毛球','保龄球'],
    currentIndex: 0,
    ticket: [1,2,3,4,5],
    showTicket: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapChange (event) {
    let { index } = event.currentTarget.dataset;
    this.setData({
      currentIndex: index
    })
  },
  // 查看更多票种
  ticketClick () {
    this.setData({
      showTicket: true
    })
  },
  // 跳转场馆信息
  herfInfo (event) {
    let { type } = event.currentTarget.dataset;
    let url = ''
    if (type === 'info') {
      url = '/pages/venueInfo/venueInfo'
    }else {
      url = '/pages/map/map'
    }
    wx.navigateTo({
      url
    })
  },
  buy () {
    wx.navigateTo({
      url: '/pages/orderPayment/orderPayment'
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