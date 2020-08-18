// pages/scientificFitness/scientificFitness.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    navData: ['头条', '跑步',  '跳绳','爬山','游泳','饮食'],
    currentIndex: 0,
    searchData: {
      curPage: 1,
      maxPage: 10,
      newsTypeId: '',
      newsTitle: "",
      newsTop: ''
    },
    getType: 0, // 0 加载 1刷新
    total: 0, // 总数据条数
    typePic: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getType: 1
    })
    this.getData();
  },
  getData(){
    let that = this;
    app.request('/sportmedicalserver/NewsType/listAllNewsType').then(res => {
      if (res.data.length > 0) {
        let searchData = that.data.searchData;
        searchData.newsTypeId = res.data[0].id
        that.setData({
          navData: res.data,
          currentIndex: res.data[0].id,
          searchData: searchData,
          typePic: res.data[0].typePic
        });
        that.getPageList();
      }
    })
  },
  getPageList() {
    let that = this;
    app.request('/sportmedicalserver/NewsRelease/listNewsRelease',that.data.searchData).then(res => {
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
  },
  // nav  change事件
  changeTap (event) {
    let { index,item } = event.currentTarget.dataset;
    let searchData = this.data.searchData;
    searchData.newsTypeId = index;
    searchData.curPage = 1;
    this.setData({
      searchData: searchData,
      getType: 1,
      typePic: item.typePic
    });
    this.getPageList();
  },
  // 跳转
  listHref (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/slimming/slimming?id='+item.id
    })
  },
  // 搜索的点击事件
  search () {
    wx.navigateTo({
      url: '/pages/keepSearch/keepSearch'
    })
  },
  scroll(e) {
    console.log(e)
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
    console.log(11111)
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
    searchData.curPage = searchData.curPage+1;
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