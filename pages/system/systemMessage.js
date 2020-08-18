//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dataList: []
  },
  onLoad: function () {
    this.getData();
  },
  getData(){
    let that = this;
    app.request('/sportmedicalserver/SystemMessage/listSystemMessage').then(res => {
      if (res.code == 200) {
        that.setData({
          dataList: res.data,
        })
      }
    })
  },
  details(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../mine/messageDetails?id='+item.id
    })
  }
})