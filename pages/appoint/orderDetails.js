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
  onLoad: function () {
    
  },
})
