// pages/venueDetail/venue.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spData: [],
    currentIndex: 0,
    ticket: [],
    showTicket: false,
    id: null,
    details: null,
    showLen: 5,
    userInfo: null,
    configList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
  },
  getDetails() {
    let that = this;
    app.request('/sportvenuesserver/stadium/selectStadiumDetail', { stadiumId: this.data.id}).then(res => {
      if (res.code == 200) {
        that.setData({
          details: res.data.tbStadium,
          configList: res.data.stadiumInfo&&res.data.stadiumInfo.configList?res.data.stadiumInfo.configList:[]
        })
      }
    })
  },
  getSportData() {
    let that = this;
    app.request('/sportticketserver/sportItem/selectItemByStadiumId', { stadiumId: this.data.id }).then(res => {
      if (res.code == 200) {
        that.setData({
          spData: res.data,
          currentIndex: res.data[0].id
        })
        that.getTicketData();
      }
    })
  },
  getTicketData() {
    let that = this;
    let params = { 
      stadiumId: this.data.id,
      itemId: this.data.currentIndex,
    }
    app.request('/sportticketserver/ticket/selectTicketListByStadiumIdAndSpId', params).then(res => {
      if (res.code == 200) {
        res.data.forEach(item =>{
          if(item.tags) item.tagsArr = item.tags.split(',');
        })
        that.setData({
          ticket: res.data,
        })
      }
    })
  },
  tapChange (event) {
    let { index } = event.currentTarget.dataset;
    this.setData({
      currentIndex: index
    })
    this.getTicketData();
  },
  // 查看更多票种
  ticketClick () {
    this.setData({
      showTicket: true,
      showLen: this.data.ticket.length
    })
  },
  //拨打电话
  callPhone(e) {
    let phone = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  //打开地图
  openMap(){
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
  },
  // 跳转场馆信息
  herfInfo (event) {
    let { type } = event.currentTarget.dataset;
    let url = ''
    if (type === 'info') {
      url = '/pages/venueInfo/venueInfo'
    }else {
      url = '/pages/map/map'
    }
    wx.navigateTo({
      url: '/pages/venueInfo/venueInfo?id='+this.data.id
    })
  },
  buy (e) {
    let { item } = e.currentTarget.dataset;
    if(!this.data.userInfo) {
      return wx.navigateTo({
        url: '/pages/authorization/authorization',
        success(res) {
          wx.showToast({
            title: '请先授权登录',
            icon: 'none'
          })
        }
      })
    }
    if(!this.data.userInfo.idCard) {
      wx.navigateTo({
        url: '/pages/mine/nameAuthentication'
      })
    } else {
      wx.navigateTo({
        url: '/pages/orderPayment/orderConfirm?id=' + this.data.id + '&item=' + JSON.stringify(item)
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getSportData();
    this.getDetails();
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