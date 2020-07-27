//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabKey: 1
  },
  //事件处理函数
  //切换tab
  changeTab: function(e) {
    let tabKey = e.currentTarget.dataset.key;
    this.setData({
      tabKey: tabKey
    })
  },
  //前往体检报告
  details: function(e) {
    // let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../appoint/orderDetails'
    })
  },
  onLoad: function () {
    
  },
})
