//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dataList: [],
    listData: [],
    searchData: {
      curPage: 1,
      maxPage: 10,
    },
    getType: 0, // 0 加载 1刷新
    total: 0, // 总数据条数
  },
  getPageList() {
    let that = this;
    app.request('/sportmedicalserver/NewsRelease/selectByMyLike',that.data.searchData).then(res => {
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
  toDetails: function(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/slimming/slimming?id='+ item.id
    })
  },
  changeStatus(e){
    let item = e.currentTarget.dataset.item;
    let listData = this.data.listData;
    if (item.isLike == 0) {
      app.request('/sportmedicalserver/NewsRelease/deleteUserNewsRelease/'+item.userNewsReleaseId).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '取消收藏成功',
            icon: 'none',
          })
          this.setData({
            listData: listData
          })
          let searchData = this.data.searchData;
          searchData.curPage = 1;
          this.setData({
            searchData: searchData,
            getType: 1
          });
          this.getPageList();
        }
      })
    }
  },
  onShow: function () {
    this.setData({
      getType: 1
    })
    this.getPageList();
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
})
