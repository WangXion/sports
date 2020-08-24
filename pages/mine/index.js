//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    pdRead: false
  },
  onLoad: function () {
    // this.getData();
  },
  onShow: function() {
    let userInfo = app.globalData.userInfo ? app.globalData.userInfo : wx.getStorageSync('userInfo')
    console.log(wx.getStorageSync('userInfo'))
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
    this.getData();
  },
  getData() {
    let that = this;
    app.request('/sportmedicalserver/SystemMessage/pdRead').then(res => {
      if (res.code == 200) {
        let pdRead = res.data == 0?true: false
        that.setData({
          pdRead: pdRead
        })
      }
    })
  },
  linkTo(e) {
    let type = e.currentTarget.dataset.type;
    let linkUrl = ''
    switch(type) {
      case 'balance':
        linkUrl = '../mine/reCharge';
        break
      case 'sysMessage':
        linkUrl = '../system/systemMessage';
        break
      case 'coupon':
        linkUrl = '../coupon/index';
        break
      case 'invoice':
        linkUrl = '../mine/index';
        break
      case 'collection':
        linkUrl = '../collection/myCollection';
        break
      case 'sysMessage':
        linkUrl = '../system/systemSetting';
        break
      case 'coupon':
        linkUrl = '../coupon/index';
        break
      case 'sysSetting':
        linkUrl = '../system/systemSetting';
        break
      case 'ticket':
        linkUrl = '../matchReg/order';
        break
      case 'appointOrder':
        linkUrl = '../appoint/appointOrder';
        break
      case 'constitution':
        linkUrl = '../appoint/index';
        break
      case 'classRoom':
        linkUrl = '../collection/index';
        break
      case 'userInfo':
        linkUrl = '../mine/personalInfo';
        break
      case 'realName':
        if(this.data.userInfo.idCard) {
          linkUrl = ''
        } else {
          linkUrl = '../mine/nameAuthentication';
        }
        break
    }
    wx.navigateTo({
      url: linkUrl
    })
  },
  showNone(){
    wx.showToast({
      title: '即将上线，敬请期待',
      icon: 'none'
    })
  }
})
