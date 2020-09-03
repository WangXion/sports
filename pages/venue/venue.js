// pages/venue/venue.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venueArr: [],
    dropDownMenuTitle: ['附近区域', '运动项目', '智能排序'],
    data1: [{
        id: 0,
        title: '附近',
        childModel: [{
            id: '0',
            title: '全部'
          },
          {
            id: '1',
            title: '1km以内'
          },
          {
            id: '3',
            title: '3km'
          },{
            id: '5',
            title: '5km'
          },
          {
            id: '10',
            title: '10km'
          }
        ]
      },

      {
        id: 1,
        title: '行政区域',
        childModel: [
          {
            id: '0',
            title: '全部'
          },
          {
            id: '-1',
            title: '上城区'
          },
          {
            id: '-2',
            title: '下城区'
          },
          {
            id: '-3',
            title: '拱墅区'
          },
          {
            id: '-4',
            title: '西湖区'
          },
          {
            id: '-5',
            title: '滨江区'
          },
          {
            id: '-6',
            title: '余杭区'
          },
          {
            id: '-7',
            title: '萧山区'
          },
          {
            id: '-8',
            title: '江干区'
          },
          {
            id: '-9',
            title: '大江东'
          },
          {
            id: '-10',
            title: '钱塘新区'
          },
        ]
      }
    ],
    data2: [{
        id: 0,
        title: '全部'
      },
    ],
    data3: [{
        id: 1,
        title: '智能推荐'
      },
      {
        id: 2,
        title: '线上购票'
      },
    ],
    searchData: {
      stadiumName: null,
      stadiumArea: null,
      spName: null,
      distance: null,
      mapLongitude: null,
      mapLatitude: null,
    },
    location: app.globalData.location,
    isScrollLay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSport();
  },
  onShow(options) {
    let that = this;
    let searchData  = this.data.searchData;
    if(!app.globalData.mapLocation) {
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          let mapLocation = {
            mapLongitude: res.longitude,
            mapLatitude: res.latitude
          }
          app.globalData.mapLocation = mapLocation;
          searchData.mapLongitude = res.longitude;
          searchData.mapLatitude = res.latitude;
          // searchData.stadiumArea = app.globalData.location.district;
          that.setData({
            refresh: true,
            searchData: searchData,
          })
          that.getData();
        }
      })
    } else {
      searchData.mapLongitude = app.globalData.mapLocation.mapLongitude;
      searchData.mapLatitude = app.globalData.mapLocation.mapLatitude;
      that.setData({
        refresh: true,
        searchData: searchData,
      })
      that.getData();
    }
    
  },
  getSport() {
    let that = this;
    app.request('/sportticketserver/sportItem/selectItemList').then(res => {
      if (res.code == 200) {
        let newArr = [];
        res.data.forEach((item,idx) => {
          let obj = {
            id: idx+1,
            title: item
          }
          newArr.push(obj)
        })
        newArr = this.data.data2.concat(newArr);
        that.setData({
          data2: newArr
        })
      }
    })
  },
  getData() {
    let that = this;
    app.request('/sportvenuesserver/stadium/stadiumList', this.data.searchData).then(res => {
      if (res.code == 200) {
        res.data.forEach(item=>{
          if(item.tags) {
            item.tagsArr = item.tags.split(',');
          } 
          if(item.stadiumItems) {
            item.itemArr = item.stadiumItems.split(',');
          }
        })
        that.setData({
          venueArr: res.data
        })
      }
    })
  },
  // 跳转详情
  hrefDetail (e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/venueDetail/venue?id=' + item.stadiumId
    })
  },
  //接受筛选条件
  selectedItem(e) {
    let searchData = this.data.searchData;
    let data = e.detail;
    let that = this;
    console.log(data);
    if(data.index == '1') {
      if (data.selectedId < 0) {
        searchData.stadiumArea = data.selectedTitle;
        searchData.distance = null;
      } else if (data.selectedId == '0') {
        searchData.stadiumArea = ''
        searchData.distance = null;
      } else {
        // searchData.mapLongitude = this.data.longitude;
        // searchData.mapLatitude = this.data.latitude;
        searchData.distance = data.selectedId;
        searchData.stadiumArea = ''
      }
    } else if(data.index == '2') {
      if (data.selectedId == '0'){
        searchData.spName = null
      } else {
        searchData.spName = data.selectedTitle
      }
    }
    console.log(e);
    this.setData({
      searchData: searchData,
    })
    setTimeout(function(){
      console.log(2222)
      that.setData({
        isScrollLay: false
      })
    },500)
    this.getData();
  },
  //输入内容查询场馆
  confirm(e) {
    let val = e.detail.value;
    let searchData = this.data.searchData;
    searchData.stadiumName = val
    this.setData({
      searchData: searchData,
    })
    this.getData();
  },
  scrollLay() {
    this.setData({
      isScrollLay: !this.data.isScrollLay
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
})