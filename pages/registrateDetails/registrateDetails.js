// pages/registrateDetails/registrateDetails.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    id: null,
    userInfo: app.globalData.userInfo,
    remarks: '',
    time: null,
    address: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      time: options.time,
      address: options.address,
    })
    // this.getData();
  },
  getData() {
    let that = this;
    let params = {
      pblId: this.data.id,
      userId: this.data.userInfo.id,
      remarks: this.data.remarks
    }
    app.request('/sportactivityserver/publiclecture/insertwantjoinBefore', params).then(res => {
      if (res.code == 200) {
        if(res.data.message== "您已报名") {
          wx.showToast({
            title: '你已经报名成功',
            icon: 'none',
            complete(res){
              setTimeout(function(){
                wx.switchTab({
                  url: '/pages/index/index'
                })
              },1000)
            }
          })
        }
        that.setData({
          details: res.data.pblecture,
          userInfo: res.data.user
        })
      }
    })
  },
  inputchange(e) {
    let val = e.detail.value;
    this.setData({
      remarks: val
    })
  },
  submit() {
    let that = this;
    let params = {
      pblId: Number(this.data.id),
      userId: this.data.userInfo.userId,
      userComment: this.data.remarks
    }
    app.request('/sportactivityserver/publiclecture/insertwantjoinBefore', params).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '报名成功',
          icon: 'none',
          complete(res){
            setTimeout(function(){
              wx.switchTab({
                url: '/pages/index/index'
              })
            },1000)
          }
        })
      }
    })
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