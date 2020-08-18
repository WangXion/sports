// pages/slimming/slimming.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: false,
    id: null,
    details: null,
    fwText: null,
    showShare: true
  },
  banner () {
    wx.showToast({
      title: '请点击右上角分享朋友圈',
      icon: 'none'
    })
    // wx.navigateTo({
    //   url: '/pages/share/share'
    // })
  },
  poster () {
    wx.navigateTo({
      url: '/pages/share/share'
    })
  },
  changeTap () {
    let details = this.data.details;

    if(details.isLike == 1) {
      app.request('/sportmedicalserver/NewsRelease/saveUserNewsRelease/'+this.data.id).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
          })
          this.getData();
        }
      })
    } else {
      app.request('/sportmedicalserver/NewsRelease/deleteUserNewsRelease/'+details.userNewsReleaseId).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '取消收藏成功',
            icon: 'none',
          })
          this.getData();
        }
      })
    }
    this.setData({
      selected: !this.data.selected
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      id: options.id
    })
    this.getData();
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    wx.getSystemInfo({
      success(res) {
        console.log(res);
        if (res.system.indexOf('iOS') !=  -1) {
          that.setData({
            showShare: false
          })
        }
3444      },
      fail(err) {
        console.log(err)
      }
    })
  },
  getData(){
    let that = this;
    app.request('/sportmedicalserver/NewsRelease/selectNewsReleaseDetail/'+this.data.id).then(res => {
      if (res.code == 200) {
        let fwText = '';
        if (res.data.newsDetail) {
          fwText = res.data.newsDetail.replace(/<img/g , '<img style="width:100%;height:auto;display:block;"')
        }
        that.setData({
          details: res.data,
          fwText: fwText
        })
      }
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

  },
  onShareTimeline() {

  }
})