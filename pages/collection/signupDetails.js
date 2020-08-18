//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: app.globalData.userInfo,
    details: null,
    remarks: '',
  },
  onLoad: function (options) {
    this.setData({
      details: JSON.parse(options.details)
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
      pblId: Number(this.data.details.pcId),
      signToken: this.data.details.signToken
      // userId: this.data.userInfo.userId,
      // userComment: this.data.remarks
    }
    app.request('/sportactivityserver/publiclecture/quxiao', params).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '取消报名成功',
          icon: 'none',
          complete(res) {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/mine/index'
              })
            }, 1000)
          }
        })
      }
    })
  },
})
