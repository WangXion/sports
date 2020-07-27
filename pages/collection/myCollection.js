//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  //前往体检报告
  details: function(e) {
    let type = e.currentTarget.dataset.type;
    if( type == 'team') {
      wx.navigateTo({
        url: '../appointRecord/teamReport'
      })
    } else {
      wx.navigateTo({
        url: '../appointRecord/details'
      })
    }
  },
  onLoad: function () {
    
  },
})
