//logs.js
let app = getApp();

Page({
  data: {
    desc: '暂无信息'
  },
  onLoad: function (options) {
    this.setData({
      desc: options.desc
    })
  }
})
