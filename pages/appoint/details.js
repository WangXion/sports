//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabKey: 1,
    details: null
  },
  //事件处理函数
  changeTab: function(e) {
    let tabKey = e.currentTarget.dataset.key;
    this.setData({
      tabKey: tabKey
    })
  },
  onLoad: function (options) {
    this.setData({
      details: JSON.parse(options.item)
    })
  },
  report() {
    let that = this;
    wx.downloadFile({
      url: that.data.details.report,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  }
})
