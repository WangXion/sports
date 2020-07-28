//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dataList: [
      {
        title: '没有时间运动健身？试试戒掉这个习惯没有时间运动健身？',
        collection: true,
        key: 0
      },
      {
        title: '没有时间运动健身？试试戒掉这个习惯没有时间运动健身？',
        collection: true,
        key: 1
      }
    ]
  },
  //事件处理函数
  //前往体检报告
  details: function(e) {
    let type = e.currentTarget.dataset.type;
    if( type == 'team') {
      wx.navigateTo({
        url: '../appointRecord/teamReport'
      })
    } else {
      wx.navigateTo({
        url: '../appointRecord/details'
      })
    }
  },
  changeStatus(e){
    let key = e.currentTarget.dataset.key;
    let dataList = this.data.dataList;
    let colletcion = dataList[key].collection;
    if (colletcion) {
      wx.showToast({
        title: '您已取消收藏',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '收藏成功',
        icon: 'none'
      })
    }
    dataList[key].collection = !dataList[key].collection;
    this.setData({
      dataList: dataList
    })
  },
  onLoad: function () {
    
  },
})
