//app.js
App({
  globalData: {
    userInfo: wx.getStorageSync('userInfo'),
    hostUrl: '',
    // hostUrl: 'http://116.62.168.148:8102',
    header: {
      "Content-Type": 'application/json',
    },
    location: wx.getStorageSync('location'),
    mapLocation: wx.getStorageSync('mapLocation'),
    mapKey: '',
    isOpen: true // 当前是否开放功能
  },
	onLaunch: function () {
    let host = 'https://api.zjjcjc888.com';
    let mapKey = '';
    let appid = wx.getAccountInfoSync().miniProgram.appId;
    if (appid === 'wx957022b626b709f3' ){
			host = 'https://api.cloudsymbol.cn';
      mapKey = '7VYBZ-BPWKX-DF24R-72Y7F-YDONQ-6QBPU'
      this.globalData.isOpen = false
    } else if (appid === 'wx27917f3595394a0a'){
			host = 'https://api.zjjcjc888.com';
      mapKey = 'M27BZ-LOXRP-M3LDZ-VWKRG-A6CA3-6YBZL'
		}
    this.globalData.hostUrl = host;
    this.globalData.mapKey = mapKey;
    // if (!this.globalData.userInfo) {
    //   wx.navigateTo({
    //     url: '/pages/authorization/authorization',
    //   })
    // }
	},
  	/**
	 * 封封微信的的request
	 */
	request(url, data = {}, method = "POST", header = this.globalData.header) {
		let hostUrl = this.globalData.hostUrl;
		if (this.globalData.userInfo.token) {
		  header.token = this.globalData.userInfo.token
		} else {
      header.token = 9999
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
                title: '请先登录！',
                icon: 'none'
              })
              setTimeout(function(){
                wx.navigateTo({
                  url: '/pages/authorization/authorization',
                })
              },1000)
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