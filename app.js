//app.js
App({
  globalData: {
    userInfo: wx.getStorageSync('userInfo'),
    hostUrl: '',
    // hostUrl: 'http://116.62.168.148:8102',
    header: {
      "Content-Type": 'application/json',
    },
    location: {},
    mapLocation: wx.getStorageSync('mapLocation')
  },
	onLaunch: function () {
    let host = 'https://api.zjjcjc888.com';
    let appid = wx.getAccountInfoSync().miniProgram.appId;
    if (appid === 'wx957022b626b709f3' ){
			host = 'https://api.cloudsymbol.cn';
		}else{
			host = 'https://api.zjjcjc888.com';
		}
		this.globalData.hostUrl = host
    if (!this.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/authorization/authorization',
      })
    }
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