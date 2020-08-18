//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabKey: 1,
    searchData: {
      page: 1,
      rows: 10,
      state: 0
    },
    getType: 0, // 0 加载 1刷新
    total: 0, // 总数据条数
    orderData: []
  },
  onShow(){
    this.setData({
      getType: 1
    })
    this.getData();
  },
  getData() {
    let that = this;
    app.request('/sportticketserver/order/orderlist', that.data.searchData).then(res => {
      if (res.code == 200) {
        let data = [];
        if (that.data.getType == 0) {
          data = data.concat(that.data.orderData, res.data.data);
        } else {
          data = res.data.data;
        }
        that.setData({
          orderData: data,
          total: res.data.total
        })
      }
    })
  },
  //事件处理函数
  //切换tab
  changeTab: function(e) {
    let searchData = this.data.searchData;
    let tabKey = e.currentTarget.dataset.key;
    searchData.state = tabKey
    searchData.page = 1
    this.setData({
      searchData: searchData,
      getType: 1
    })
    this.getData();
  },
  
  //前往订单详情
  details: function(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../appoint/orderDetails?orderNo='+item.orderNo
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let searchData = this.data.searchData;
    let total = this.data.total;
    if (Math.ceil(total / searchData.rows) <= searchData.page) {
      return wx.showToast({
        title: '已经到底了哦～',
        icon: 'none'
      })
    }
    searchData.page = searchData.page + 1;
    this.setData({
      searchData: searchData,
      getType: 0
    });
    this.getData();
  },
  onLoad: function () {
    
  },
})
