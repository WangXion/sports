//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabKey: 1
  },
  //事件处理函数
  changeTab: function(e) {
    let tabKey = e.currentTarget.dataset.key;
    this.setData({
      tabKey: tabKey
    })
  },
  toMap(){
    wx.navigateTo({
      url: '../map/map'
    })
  },
  toDetails() {
    wx.navigateTo({
      url: '../venueDetail/venue'
    })
  },
  callPhone(e) {
    let phone = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  onLoad: function () {
    
  },
})
