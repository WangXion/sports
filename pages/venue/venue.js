// pages/venue/venue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venueArr: [1,-1,1,-1],
    dropDownMenuTitle: ['附近区域', '运动项目', '智能排序'],
    data1: [{
        id: 0,
        title: '附近',
        childModel: [{
            id: '0-1',
            title: '1km以内'
          },
          {
            id: '0-2',
            title: '3km'
          },{
            id: '0-3',
            title: '5km'
          },
          {
            id: '0-4',
            title: '10km'
          }
        ]
      },

      {
        id: 1,
        title: '行政区域',
        childModel: [{
            id: '1-1',
            title: '行政区域1'
          },
          {
            id: '1-2',
            title: '行政区域2'
          }
        ]
      }
    ],
    data2: [{
        id: 1,
        title: '游泳'
      },
      {
        id: 2,
        title: '篮球'
      },
      {
        id: 3,
        title: '足球'
      },
      {
        id: 4,
        title: '羽毛球'
      },
      {
        id: 5,
        title: '乒乓球'
      }
    ],
    data3: [{
        id: 1,
        title: '线上服务'
      },
      {
        id: 2,
        title: '选项1'
      },
      {
        id: 3,
        title: '选项2'
      },
      {
        id: 4,
        title: '选项3'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转详情
  hrefDetail () {
    wx.navigateTo({
      url: '/pages/venueDetail/venue'
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