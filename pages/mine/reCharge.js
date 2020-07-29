//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    authLay: false,
    price: 100,
    agree: 1
  },
  onLoad: function () {
    this.setData({
      agree: true
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  toRecords(){
    wx.navigateTo({
      url: '../mine/transactionRecords'
    })
  },
  showLay() {
    this.setData({
      authLay: !this.data.authLay
    })
  },
  changeTab(e) {
    let price = e.currentTarget.dataset.price;
    this.setData({
      price: price
    })
  },
  changeArgee(){
    let argee = this.data.argee;
    if(argee == 0) {
      argee = 1
    } else {
      argee = 0
    }
    this.setData({
      argee: argee
    })
  }
})
