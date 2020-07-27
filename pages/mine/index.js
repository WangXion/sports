//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
        linkUrl = '../mine/index';
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
        linkUrl = '../mine/nameAuthentication';
        break
    }
    wx.navigateTo({
      url: linkUrl
    })
  }
})
