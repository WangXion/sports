//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    allChecked: false
  },
  //事件处理函数
  //全选点击事件
  changeChecked: function() {
    let allChecked = this.data.allChecked
    console.log(allChecked)
    this.setData({
      allChecked: !allChecked
    })
  },
  //全部通知
  sendAll: function() {
    if(!this.data.allChecked) {
      wx.showToast({
        title:'请先勾选全部选中',
        icon: 'none'
      })
    }
  },
  onLoad: function () {
    
  },
})
