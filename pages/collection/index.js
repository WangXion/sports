//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabKey: 1,
    getType: 0, // 0 加载 1刷新
    total: 0, // 总数据条数
    searchData: {
      curPage: 1,
      maxPage: 10,
    },
    listData: [],
  },
  //事件处理函数
  //前往体检报告
  linkTo: function(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../collection/signupDetails?details=' + JSON.stringify(item)
    })
  },
  getPageList() {
    let that = this;
    app.request('/sportactivityserver/publiclecture/getAllByUserId',that.data.searchData).then(res => {
      if(res.code == 200) {
        let data = [];
        if(that.data.getType == 0) {
          data = data.concat(that.data.listData,res.data.data);
        } else {
          data = res.data.data;
        }
        that.setData({
          listData: data,
          total: res.data.total
        })
      }
    })
  },
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
  onShow: function () {
    this.setData({
      getType: 1
    })
    this.getPageList();
  },
})
