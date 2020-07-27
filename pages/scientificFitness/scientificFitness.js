// pages/scientificFitness/scientificFitness.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [1,2,3],
    navData: ['头条', '跑步',  '跳绳','爬山','游泳','饮食'],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // nav  change事件
  changeTap (event) {
    let { index } = event.currentTarget.dataset;
    this.setData({
      currentIndex: index
    })
  },
  // 跳转
  listHref () {
    wx.navigateTo({
      url: '/pages/slimming/slimming'
    })
  },
  // 搜索的点击事件
  search () {
    wx.navigateTo({
      url: '/pages/keepSearch/keepSearch'
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