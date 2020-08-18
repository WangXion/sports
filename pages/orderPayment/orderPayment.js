// pages/orderPayment/orderPayment.js
const util = require('../../utils/util.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weixinSelecetd: true,
    vipSelecetd: false,
    submitData: {},
    details: null,
    currentTime: null,
    timeCount: null,
    maxtime: 60*15 // 15分钟
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let currentTime = util.formatDate(new Date(),'yyyy-MM-dd');
    var now = new Date();
    var day = now.getDay();
    var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var week = weeks[day];
    let item = JSON.parse(options.item);
    currentTime = currentTime + ' ' + week;
    let submitData = {
      stadiumId: options.id,
      ticketId: item.ticketId,
      payNumber: options.number,
    }
    this.setData({
      details: item,
      submitData: submitData,
      currentTime: currentTime
    })
    let timer = setInterval(function(){
      if (that.data.maxtime >= 0) {
        let minutes = Math.floor(that.data.maxtime / 60);
        let seconds = Math.floor(that.data.maxtime % 60);
        seconds = seconds < 10 ? '0' + seconds : seconds
        that.setData({
          maxtime: that.data.maxtime-1,
          timeCount: minutes + ':' + seconds
        })
    } else{
        clearInterval(timer);
        that.setData({
          timeCount: '00:00'
        })
        this.switchtab({
          url: '/pages/index/index'
        })
    }  
    }, 1000);
  },


  // var maxtime = 60 * 60; //一个小时，按秒计算，自己调整!   
  CountDown() {
    if (this.data.maxtime >= 0) {
        minutes = Math.floor(this.data.maxtime / 60);
        seconds = Math.floor(this.data.maxtime % 60);
        console.log(minutes+':'+seconds)
    } else{
        clearInterval(timer);
        alert("时间到，结束!");
    }             
  },            
  // 选择微信还是支付宝
  method (event) {
    let { type } = event.currentTarget.dataset;
    if (type === 'weiixn') {
      this.setData({
        weixinSelecetd: !this.data.weixinSelecetd,
        vipSelecetd: false
      })
    }else {
      this.setData({
        vipSelecetd: !this.data.vipSelecetd,
        weixinSelecetd: false
      })
    }
  },
  buy () {
    app.request('/sportticketserver/order/placeOrder',this.data.submitData).then(res=>{
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
    // wx.navigateTo({
    //   url: '/pages/paySuccess/paySuccess'
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})