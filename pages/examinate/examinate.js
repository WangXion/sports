// pages/examinate/examinate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusList: [
      {
        title: '个人'
      },
      {
        title: '团体'
      }
    ],
    currentKey: 1,
    disabled: false,
    if_checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // tab  change事件
  handleChange (event) {
    console.log(event.currentTarget.dataset.key)
    let { key } = event.currentTarget.dataset;
    switch (key) {
      case '1':
        this.setData({
          currentKey: 1
        })
        break;
      case '2':
        this.setData({
          currentKey: 2
        })
      default:
        break;
    }
  },
  // 确认预约
  sureAppointment (event) {
    let { index } = event.currentTarget.dataset;
    console.log(this.data.if_checked)
    if (!this.data.if_checked) {
      wx.showToast({
        title: '请先勾选预约须知',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/appointInfo/appointInfo?key='+index
    })
  },
  /**是否同意协议 */
  boxcheck: function (e) {
    var flag = e.detail.value[0];
    console.log(flag)
    this.setData({
      if_checked: flag
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