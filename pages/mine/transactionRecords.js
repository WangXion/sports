//index.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    date: '',
    currentDate: ''
  },
  onLoad: function () {
    let date = util.formatDate(new Date(),'yyyy-MM');
    let currentDate = util.formatDate(new Date(),'yyyy-MM-dd');
    this.setData({
      currentDate: currentDate,
      date: date 
    })
  },
  details(){
    wx.navigateTo({
      url: '../mine/messageDetails'
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
})
