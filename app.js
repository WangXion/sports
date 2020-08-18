//app.js
App({
  globalData: {
    userInfo: wx.getStorageSync('userInfo'),
    hostUrl: 'https://api.zjjcjc888.com',
    // hostUrl: 'http://116.62.168.148:8102',
    header: {
      "Content-Type": 'application/json',
    },
    location: {},
    mapLocation: wx.getStorageSync('mapLocation')
  },
	onLaunch: function () {
    if (!this.globalData.userInfo) {
      return wx.navigateTo({
        url: '/pages/authorization/authorization'
      })
    }
    return false;
	// 登录
	wx.login({
		success: res => {
		// 发送 res.code 到后台换取 openId, sessionKey, unionId
		}
	})
	// 获取用户信息
	wx.getSetting({
		success: res => {
		if (res.authSetting['scope.userInfo']) {
			// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
			wx.getUserInfo({
			success: res => {
				// 可以将 res 发送给后台解码出 unionId
				this.globalData.userInfo = res.userInfo

				// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
				// 所以此处加入 callback 以防止这种情况
				if (this.userInfoReadyCallback) {
				this.userInfoReadyCallback(res)
				}
			}
			})
		}
		}
	})
	},
  	/**
	 * 封封微信的的request
	 */
	request(url, data = {}, method = "POST", header = this.globalData.header) {
		let hostUrl = this.globalData.hostUrl;
		if (this.globalData.userInfo.token) {
		header.token = this.globalData.userInfo.token
		}
		return new Promise(function (resolve, reject) {
			wx.request({
				url: hostUrl+url,
				data: data,
				method: method,
				header: header,
				success: function (res) {
					console.log(res)
					if (res.data && res.data.code) {
						if (res.data.code != '200' && url != '/sportuserserver/user/login') {
							wx.showToast({
								title: res.data.message ? res.data.message:'数据错误',
								icon: 'none'
							})
						if(res.data.code == '300') {
              wx.showToast({
                title: res.data.message ? res.data.message : '数据错误',
                icon: 'none'
              })
							wx.navigateTo({
							url: '/pages/authorization/authorization',
							})
						}
						}
						resolve(res.data);
					} else {
						wx.showToast({
							title: '请求错误，请重试',
							icon: 'none'
						})
						reject(res.errMsg);
					}

				},
				fail: function (err) {
					reject(err)
				}
			})
		})
	}
})