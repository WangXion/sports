//feedBack.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userName: '',
    userPhone: '',
    feedbackContent: '',
    userInfo: app.globalData.userInfo
  },
  onLoad: function () {
    
  },
  submit(){
    let params = {
      userName: this.data.userName?this.data.userName:this.data.userInfo.fullName,
      userPhone: this.data.userPhone?this.data.userPhone:this.data.userInfo.mobile,
      feedbackContent: this.data.feedbackContent,
    }
    app.request('/sportactivityserver/FeedBack/saveBlocInfo',params).then(res=>{
      if(res.code == 200) {
        wx.showToast({
          title: '新增反馈成功',
          icon: 'none',
          complete: function () {
            setTimeout(function(){
              wx.switchTab({
                url: '/pages/mine/index'
              })
            },1000)
          }
        })
      }
    })
  },
  // input的change事件
  inputChange (event) {
    let type = event.target.dataset.type;
    let val = event.detail.value;
    if (type == "userName") {
      this.setData({
        userName: val
      })
    } else if (type == "userPhone") {
      this.setData({
        userPhone: val
      })
    } else if (type == "feedbackContent") {
      this.setData({
        feedbackContent: val
      })
    }
  },
})
