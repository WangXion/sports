//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  onLoad: function () {
    
  },
  callPhone(e) {
    let phone = e.currentTarget.dataset.tel;
      wx.makePhoneCall({
        phoneNumber: phone,
      })
  },
  linkTo(e) {
    let type = e.currentTarget.dataset.type;
    if( type == 'feedBack') {
      wx.navigateTo({
        url: '../mine/feedBack'
      })
    } else {
      wx.navigateTo({
        url: '../appointRecord/details'
      })
    }
  }
})
