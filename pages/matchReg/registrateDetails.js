// pages/registrateDetails/registrateDetails.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    userInfo: app.globalData.userInfo,
    materials: null,
    workUnit: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      details: JSON.parse(options.details),
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
      workUnit: val
    })
  },
  submit() {
    let that = this;
    let params = {
      competitionId: this.data.details.id,
      fullName: this.data.userInfo.fullName,
      mobile: this.data.userInfo.mobile,
      idCard: this.data.userInfo.idCard,
      workUnit: this.data.workUnit,
      materials: this.data.materials,
    }
    app.request('/sportmedicalserver/UserCompetition/saveUserCompetition', params).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '赛事报名成功',
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
  upLoadImg() {
    var that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: app.globalData.hostUrl + '/sportmedicalserver/oss/postfile',
          filePath: tempFilePaths[0],
          name: 'img',
          header: {
            "token": app.globalData.userInfo.token,
            "Content-Type": "multipart/form-data",
          },
          success(res) {
            console.log(res);
            let data = JSON.parse(res.data)
            console.log(data.data.data.imageUrl)
            that.setData({
              materials: data.data.data.imageUrl
            })
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