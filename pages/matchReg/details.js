// pages/publicLectureDetail/publicLectureDetail.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    details: null,
    userInfo: app.globalData.userInfo,
    fwText: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
    })
    this.getData();
  },
  getData() {
    let that = this;
    app.request('/sportmedicalserver/UserCompetition/competitionDetail/'+this.data.id).then(res => {
      if (res.code == 200) {
        let fwText = '';
        if(res.data.competitionDetail) {
          fwText = res.data.competitionDetail.replace(/<img/g , '<img style="width:100%;height:auto;display:block;"')
        }
        that.setData({
          details: res.data,
          fwText: fwText
        })
      }
    })
  },
  // 我要报名
  signUp () {
    console.log(1111)
    if(!this.data.userInfo.idCard) {
      return wx.navigateTo({
        url: '/pages/mine/nameAuthentication'
      })
    }
    // if (this.data.details.competitionState != 1 && this.data.details.userState != 0) {
      wx.navigateTo({
        url: '/pages/matchReg/registrateDetails?details=' + JSON.stringify(this.data.details)
      })
    // }
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
    this.setData({
      userInfo: app.globalData.userInfo,
    })
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