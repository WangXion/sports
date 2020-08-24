// pages/publicLecture/publicLecture.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lectureArr: [],
    searchData: {
      curPage: 1,
      maxPage: 10,
    },
    getType: 0, // 0 加载 1刷新
    total: 0, // 总数据条数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  hrefDetail (e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/matchReg/details?id=' + item.id + '&type=order'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getData(){
    let that = this;
    app.request('/sportmedicalserver/UserCompetition/listUserCompetition', that.data.searchData).then(res => {
      if (res.code == 200) {
        let data = [];
        if (that.data.getType == 0) {
          data = data.concat(that.data.listData, res.data.data);
        } else {
          data = res.data.data;
        }
        that.setData({
          lectureArr: data,
          total: res.data.total
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      getType: 1
    })
    this.getData();
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
    let searchData = this.data.searchData;
    let total = this.data.total;
    if (Math.ceil(total / searchData.maxPage) <= searchData.curPage) {
      return wx.showToast({
        title: '已经到底了哦～',
        icon: 'none'
      })
    }
    searchData.curPage = searchData.curPage + 1;
    this.setData({
      searchData: searchData,
      getType: 0
    });
    this.getPageList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})