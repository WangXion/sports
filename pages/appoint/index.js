//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabKey: 1,
    pageData: [],
  },
  onLoad(){
    this.getList();
  },
  getList() {
    let that = this;
    app.request('/sportmedicalserver/userDetection/listUserDetection').then(res=>{
      if(res.data.length > 0) {
        that.setData({
          pageData: res.data
        })
      }
    })
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
    let item = e.currentTarget.dataset.item;
    if( item.detectionType == '1') {
      wx.navigateTo({
        url: '../appoint/teamReport?params='+ JSON.stringify(item.userDetectionList)
      })
    } else {
      if(item.reportFlag != 0) {
        wx.navigateTo({
          url: '../appoint/details'
        })
      }
    }
  },
})
