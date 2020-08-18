// pages/keepSearch/keepSearch.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [1,2,3,4,5,6],
    searchData: {
      curPage: 1,
      maxPage: 10,
      newsTypeId: '',
      newsTitle: "",
      newsTop: ''
    },
    listData: [],
    getType: 0, // 0 加载 1刷新
    type: 'hot', // hot 热点  search 筛选
    total: 0, // 总数据条数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getData() {
    let that = this;
    app.request('/sportmedicalserver/NewsRelease/selectHot').then(res => {
      if (res.code == 200) {
        that.setData({
          content: res.data
        })
      }
    })
  },
  getPageList() {
    let that = this;
    app.request('/sportmedicalserver/NewsRelease/listNewsRelease', that.data.searchData).then(res => {
      if (res.code == 200) {
        let data = [];
        let type = that.data.type;
        if (that.data.getType == 0) {
          data = data.concat(that.data.listData, res.data.list);
        } else {
          data = res.data.list;
        }
        if(res.data.total > 0) {
          type = 'search'
        }
        that.setData({
          listData: data,
          total: res.data.total,
          type: type
        })
      }
    })
  },
  //  取消
  cancel () {
    wx.navigateBack({
      delta: 1
    })
  },
  confirm(e){
    let val = e.detail.value;
    let searchData = this.data.searchData;
    searchData.newsTitle = val
    this.setData({
      searchData: searchData,
      getType: 1,
    })
    this.getPageList();
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
    if(this.data.type == 'search') {
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
    }
  },
  // 跳转
  listHref(e) {
    let item = e.currentTarget.dataset.item;
    console.log(item);
    let id = item.id ? item.id : item.newsReleaseId
    wx.navigateTo({
      url: '/pages/slimming/slimming?id=' + id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})