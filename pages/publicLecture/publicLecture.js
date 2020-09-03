// pages/publicLecture/publicLecture.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    searchData: {
      curPage: 1,
      maxPage: 10,
    },
    checkedId: 0,
    getType: 0, // 0 加载 1刷新
    total: 0, // 总数据条数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //切换tab
  changeTab: function(e) {
    let searchData = this.data.searchData;
    let tabKey = e.currentTarget.dataset.key;
    let checkedId = tabKey;
    searchData.curPage = 1;
    this.setData({
      searchData: searchData,
      checkedId: checkedId,
      getType: 1
    })
    this.getData();
  },
  hrefDetail (e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/publicLectureDetail/publicLectureDetail?publiclectureid=' + item.pcId
    })
  },
  // 跳转
  listHref (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/slimming/slimming?id='+item.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getData(){
    let that = this;
    let searchData = this.data.searchData;
    let params;
    if(this.data.checkedId == 0) {
      let bigClass = 1;
      params = {bigClass,...searchData}
      app.request('/sportmedicalserver/NewsRelease/listNewsRelease',params).then(res => {
        if(res.code == 200) {
          let data = [];
          if(that.data.getType == 0) {
            data = data.concat(that.data.listData,res.data.list);
          } else {
            data = res.data.list;
          }
          console.log(data);
          that.setData({
            listData: data,
            total: res.data.total
          })
        }
      })
    } else if(this.data.checkedId == 1){
      params = {...searchData}
      app.request('/sportactivityserver/publiclecture/getAll', params).then(res => {
        if (res.code == 200) {
          let data = [];
          if (that.data.getType == 0) {
            data = data.concat(that.data.listData, res.data.data);
          } else {
            data = res.data.data;
          }
          that.setData({
            listData: data,
            total: res.data.total
          })
        }
      })
    }
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
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})