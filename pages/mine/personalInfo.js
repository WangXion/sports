//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
  },
  onLoad: function () {
    
  },
  onShow: function() {
    this.getData();
  },
  getData() {
    let that = this;
    app.request('/sportuserserver/user/userinfo').then(res => {
      if (res.code == 200) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },
  inputChange(event) {
    let val = event.detail.value;
    this.setData({
      userSignature: val
    })
  },
  submit() {
    let that = this;
    let params = {
      type: 1,
      userSignature: this.data.userSignature
    }
    app.request('/sportuserserver/user/updateUserinfo', params).then(res => {
      if (res.code == '200') {
        wx.showToast({
          title: '更改成功',
          icon: 'none',
          complete: function(){
            that.setData({
              userInfo: res.data
            })
            wx.switchTab({
              url: '/pages/mine/index'
            })
          }
        })
      }
    })
  },
  // 前往实名认证
  toRealName() {
    if (this.data.userInfo.mobile) {
      return false
    }
    wx.navigateTo({
      url: '/pages/mine/nameAuthentication'
    })
  }
})
