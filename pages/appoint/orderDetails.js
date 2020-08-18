//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    details: null
  },
  //事件处理函数
  changeTab: function(e) {
    let tabKey = e.currentTarget.dataset.key;
    this.setData({
      tabKey: tabKey
    })
  },
  toMap(){
    wx.openLocation({
      latitude: Number(this.data.details.mapLatitude),
      longitude: Number(this.data.details.mapLongitude),
      name: this.data.details.stadiumName,
      success(res){
        console.log(res);
      },
      fail(err) {
        console.log(err)
      }
    })
    // wx.navigateTo({
    //   url: '../map/map'
    // })
  },
  toDetails() {
    wx.navigateTo({
      url: '../venueDetail/venue?id=' + this.data.details.stadiumId
    })
  },
  callPhone(e) {
    let phone = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderNo
    })
    this.getDetails();
  },
  getDetails() {
    let that = this;
    app.request('/sportticketserver/order/orderDetail', { orderNo: this.data.orderNo}).then(res => {
      if (res.code == 200) {
        that.setData({
          details: res.data,
        })
      }
    })
  },
  payOrder(e) {
    app.request('/sportticketserver/order/waitPayOrder',{orderNo: this.data.orderNo}).then(res=>{
      if(res.code == 200) {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          appId: res.data.appId,
          package: res.data.mini_package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function(data) {
            console.log(data)
            wx.navigateTo({
              url: '/pages/paySuccess/paySuccess'
            })
          },
          fail: function(err) {
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            })
          }
        })
      }
    })
  },
})
