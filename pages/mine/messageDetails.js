//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    details: null,
    fwText: null,
    id: null
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getData();
  },
  getData(){
    let that = this;
    app.request('/sportmedicalserver/SystemMessage/selectSystemMessageDetail/'+this.data.id).then(res => {
      if (res.code == 200) {
        let fwText = '';
        if(res.data.messageDetail) {
          fwText = res.data.messageDetail.replace(/<img/g , '<img style="width:100%;height:auto;display:block;"')
        }
        that.setData({
          details: res.data,
          fwText: fwText
        })
      }
    })
  },
  details(){
    wx.navigateTo({
      url: '../mine/feedBack'
    })
  }
})
