var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js'); 
let app = getApp();
let qqmapsdk;
// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: {
      venueName: null,
      originLon: null,
      originLat: null,
      curPage:1,
      maxPage: 10
    },
    details: null,
    markers: [],
    venueArr: [],
    listCont: false,
    scale: 0,
    polyline: [],
    userInfo: app.globalData.userInfo,
    total: 0,
    getType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapKey
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //拨打电话
  callPhone(e) {
    let phone = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  getData(val) {
    let that = this;
    let searchData = val?val: this.data.searchData;
    let listOrMap = this.data.listCont ? 1 : 0;
    searchData = { listOrMap, ...searchData};
    app.request('/sportvenuesserver/SportVenue/listSportVenue',searchData).then(res => {
      if (res.code == 200 && res.data.data.length>0) {
        let searchData = that.data.searchData;
        let userInfo = that.data.userInfo;
        let item = res.data.data[0];
        let data = [];
        if (that.data.getType == 0) {
          data = data.concat(that.data.venueArr, res.data.data);
        } else {
          data = res.data.data;
        }
        let markers = [
          {
            id: '-1',
            latitude: searchData.originLat,
            longitude: searchData.originLon,
            name: userInfo.nickName,
            iconPath: userInfo.headImg,
            width: 20,
            height: 20
          }
        ];
        data.forEach(item =>{
          let obj = {
            id: item.id,
            latitude: item.venueLatitude,
            longitude: item.venueLongitude,
            name: item.venueName,
            iconPath: 'https://sports-bureau.oss-cn-hangzhou.aliyuncs.com/images/20200812162826.png',
            width: 17,
            height: 25
          }
          markers.push(obj);
        })
        // 路线
        that.setData({
          venueArr: data,
          markers: markers,
          // details: item,
          scale: that.countDistance(item.lineDistance),
          searchData: searchData,
          total: res.data.total
        })
      } else {
        // console.log(app.globalData.mapLocation)
        // let details = {
        //   venueLatitude: app.globalData.mapLocation.mapLongitude,
        //   venueLongitude: app.globalData.mapLocation.mapLatitude
        // }
        // that.setData({
        //   details: details
        // })
      }
    })
  },
  countDistance(dis){
    let scale = 15
    if(dis<3) {
      scale = 13
    } else if (dis >= 3 && dis < 5) {
      scale = 12
    } else if (dis >= 5 && dis < 10) {
      scale = 11
    } else if (dis >= 10 && dis < 15) {
      scale = 10
    } else if (dis >= 15 && dis < 20) {
      scale = 10
    } else if (dis >= 20 && dis < 50){
      scale = 9
    }else if (dis >= 50 && dis < 100) {
      scale = 8
    } else if (dis >= 100 && dis < 200) {
      scale = 7
    } else if (dis >= 200 && dis < 300) {
      scale = 5
    } else if (dis >= 300 && dis < 500) {
      scale = 3
    } else {
      scale = 1
    }
    return scale
  },
  roateLine(e) {
    console.log(e)
    let that = this;
    let searchData = this.data.searchData;
    let userInfo = this.data.userInfo;
    let details = e.currentTarget.dataset.item;
    let markers = [
      {
        id: '-1',
        latitude: searchData.originLat,
        longitude: searchData.originLon,
        name: userInfo.nickName,
        iconPath: userInfo.headImg,
        width: 20,
        height: 20
      }
    ];
    let obj = {
      id: details.id,
      latitude: details.venueLatitude,
      longitude: details.venueLongitude,
      name: details.venueName,
      iconPath: 'https://sports-bureau.oss-cn-hangzhou.aliyuncs.com/images/20200812162826.png',
      width: 17,
      height: 25
    }
    markers.push(obj);
    qqmapsdk.direction({
      mode: 'driving',
      from: {
        latitude: searchData.originLat,
        longitude: searchData.originLon
      },
      to: {
        latitude: details.venueLatitude,
        longitude: details.venueLongitude
      },
      success: function (res) {
        let coors = res.result.routes[0].polyline,
           pl = [];
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          let kr = 1000000;
          for (let i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;

          }
          //将解压后的坐标放入点串数组pl中
          for (let i = 0; i < coors.length; i += 2) {
            pl.push({
              latitude: coors[i],
              longitude: coors[i + 1]
            })
          }
          that.setData({
            polyline: [{
              points: pl,
              color: '#FF0000DD',
              width: 2,
              dottedLine: true,
              details: details
            }],
            markers: markers,
            listCont: false,
            scale: that.countDistance(details.lineDistance),           
          })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  showMap(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    let searchData = that.data.searchData;
    let userInfo = that.data.userInfo;
    let markers = [
      {
        id: '-1',
        latitude: searchData.originLat,
        longitude: searchData.originLon,
        name: userInfo.nickName,
        iconPath: userInfo.headImg,
        width: 20,
        height: 20
      }
    ];
    let obj = {
      id: item.id,
      latitude: item.venueLatitude,
      longitude: item.venueLongitude,
      name: item.venueName,
      iconPath: 'https://sports-bureau.oss-cn-hangzhou.aliyuncs.com/images/20200812162826.png',
      width: 17,
      height: 25
    }
    markers.push(obj);
    that.setData({
      listCont: false,
      details: item,
      markers: markers,
      scale: that.countDistance(item.lineDistance),           
      // searchData: searchData
    })
  },
  openMap(e){
    let details = e.currentTarget.dataset.item;
    console.log(e)
    console.log(details)
    
    wx.openLocation({
      latitude: Number(details.venueLatitude),
      longitude: Number(details.venueLongitude),
      name: details.venueName,
      success(res) {
        console.log(res);
      }
    })
  },
  confirm(e){
    let val = e.detail.value;
    let searchData = this.data.searchData;
    searchData.venueName = val
    this.setData({
      searchData: searchData,
      listCont: true,
    })
    this.getData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  changeList() {
    let listCont = this.data.listCont;
    // this.setData({
    //   listCont: !listCont,
    //   polyline: []
    // })
    // if (!listCont){
      let searchData = this.data.searchData;
      searchData.curPage = 1;
      this.setData({
        getType: 1,
        searchData: searchData,
        listCont: !listCont,
        polyline: []
      })
      this.getData();
    // }
  },
  //点击标记显示
  markeTap(e){
    let item = this.data.venueArr.filter(item =>{
      return e.detail.markerId == item.id
    })
    this.setData({
      details: item[0]
    })
  },
  //视野发生改变
  mapCange(e) {
    let searchData = {
      originLon: e.detail.longitude,
      originLat: e.detail.latitude,
      curPage: 1,
      maxPage: 10
    }
    this.getData(searchData)
  },
  onShow: function () {
    let that = this;
    let searchData  = this.data.searchData;
    searchData.originLon = app.globalData.mapLocation.mapLongitude;
    searchData.originLat = app.globalData.mapLocation.mapLatitude;
    that.setData({
      searchData: searchData,
      getType: 1
    })
    that.getData();
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
  scrollToLower: function () {
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