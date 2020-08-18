//feedBack.js
//获取应用实例
const util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    userInfo: app.globalData.userInfo,
    fullName: '',
    idCard: '',
    mobile: '',
  },
  onLoad: function () {
    
  },
  // input的change事件
  inputChange(event) {
    let type = event.target.dataset.type;
    let val = event.detail.value;
    if (type == "fullName") {
      this.setData({
        fullName: val
      })
    } else if (type == "idCard") {
      this.setData({
        idCard: val
      })
    } else if (type == "mobile") {
      this.setData({
        mobile: val
      })
    }
  },
  submit(){
    // let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    // if (!reg.test(this.data.idCard)) {
    //   return wx.showToast({
    //     title: '请输入正确的身份证号',
    //     icon: 'none'
    //   })
    // }
    let params = {
      type: 2,
      fullName: this.data.fullName,
      idCard: this.data.idCard,
      mobile: this.data.mobile
    }
    app.request('/sportuserserver/user/updateUserinfo', params).then(res => {
      console.log(res)
      if(res.code == '200') {
        wx.setStorageSync('userInfo', res.data);
        app.globalData.userInfo = res.data;
        wx.showToast({
          title: '认证信息已提交',
          icon: 'none',
          complete: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  }
})
