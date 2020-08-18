// pages/authorization/authorization.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    title: '注册协议',
    encryptedData: null,
    iv: null,
    if_checked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击授权
  bindGetUserInfo (e) {
    if (!this.data.if_checked) {
      return wx.showToast({
        icon: 'none',
        title: '请先勾选协议。',
      })
    }
    console.log(e);
    // 个人信息
    if (e.detail.userInfo) {
      this.setData({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      });
      this.doLogin()
    } else {
      wx.navigateBack({
        delta: 1
      })
      console.log('拒绝了授权')
    }
  },
  //登录
  doLogin() {
    var that = this
    wx.login({
      success: (res) => {
        console.log(res)
        if (res.code) {
          //发起网络请求
          let params = {
            encryptedData: that.data.encryptedData,
            iv: that.data.iv,
            code: res.code,
          }

          app.request('/sportuserserver/user/login',params).then(data=>{
            if(data.code == 200) {
              wx.setStorageSync('userInfo', data.data);
              app.globalData.userInfo = data.data;
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '登录失败',
          })
        }
      },
      error: (res) => {
        console.log("错误信息" + res)
      }
    })
  },
  // 协议
  agreement (event) {
    // let { type } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/agreement/index',
    })
  },
  // 取消
  cancel () {
    wx.navigateBack({
      delta: 1
    })
  },
  boxcheck(){
    this.setData({
      if_checked: !this.data.if_checked
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