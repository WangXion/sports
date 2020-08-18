// pages/appointInfo/appointInfo.js
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '团体',
    appointmentPerson: '', //预约联系人也是团队联系人
    groupName: '', //团队名
    appointmentSex: '0',
    appointmentPhone: '',
    appointmentCard: '',
    visit: '0', // 是否上门检测 0-是 1-否
    personalArr: [1,2],
    flag: true,
    isEdit: false,
    key: '1',  // 1 个人，2团队
    appointmentTime: '',
    startTime: '2020-7-20 00:00',
    disabled:false,//设置是否能点击 false可以 true不能点击
    placeholder:'请选择时间',
    businessPic: '', //营业执照,
    userDetectionDtos: [],
    teamItem:{
      appointmentPerson: '',
      appointmentPhone: '',
      appointmentCard: '',
    },
    editKey: '',
    visitPlace: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let startTime = util.formatDate(new Date(),'yyyy-MM-dd hh:mm');
    this.setData({
      key: options.key,
      startTime: startTime
    })
    // if (options.key == 1) {
      let userInfo = app.globalData.userInfo;
      this.setData({
        appointmentPerson: userInfo.fullName,
        appointmentSex: userInfo.sex,
        appointmentPhone: userInfo.mobile,
        appointmentCard: userInfo.idCard
      })
    // }
  },
  // input的change事件
  inputChange (event) {
    let type = event.target.dataset.type;
    let val = event.detail.value;
    if (type == "appointmentPerson") {
      this.setData({
        appointmentPerson: val
      })
    } else if (type == "appointmentPhone") {
      this.setData({
        appointmentPhone: val
      })
    } else if (type == "appointmentCard") {
      this.setData({
        appointmentCard: val
      })
    } else if (type == "groupName") {
      this.setData({
        groupName: val
      })
    } else if (type == "itemPerson") {
      let item = this.data.teamItem;
      item.appointmentPerson = val
      this.setData({
        teamItem: item
      })
    } else if (type == "itemPhone") {
      let item = this.data.teamItem;
      item.appointmentPhone = val
      this.setData({
        teamItem: item
      })
    } else if (type == "itemCard") {
      let item = this.data.teamItem;
      item.appointmentCard = val
      this.setData({
        teamItem: item
      })
    } else if (type == "visitPlace") {
      this.setData({
        visitPlace: val
      })
    } 
  },
  // 性别选择
  sexChange (event) {
    let { key } = event.currentTarget.dataset;
    switch (key) {
      case '0':
        this.setData({
          appointmentSex: key
        })
        break;
      case '1':
        this.setData({
          appointmentSex: key
        })
      default:
        break;
    }
  },
  //是否上门检测
  visitChange(event) {
    let { key } = event.currentTarget.dataset;
    this.setData({
      visit: key
    })
  },
  // 提交按钮
  submit () {
    if(!this.data.appointmentTime) {
      return wx.showToast({
        title: '预约时间必填',
        icon: 'none'
      })
    }
    if(this.data.key == 1) {
      let params = {
        appointmentPerson: this.data.appointmentPerson,
        appointmentSex: this.data.appointmentSex == '男'? 0: 1,
        appointmentPhone: this.data.appointmentPhone,
        appointmentCard: this.data.appointmentCard,
        appointmentTime: this.data.appointmentTime+':00',
      }
      app.request('/sportmedicalserver/userDetection/saveUserDetection',params).then(res=>{
        if(res.code == 200) {
          wx.showToast({
            title: '预约成功',
            icon: 'none',
            complete: function () {
              setTimeout(function(){
                wx.switchTab({
                  url: '/pages/index/index'
                }) 
              },1000)
            }
          })
        }
      })
    } else {
      if(this.data.visit == 0 && this.data.visitPlace == '') {
        return wx.showToast({
          title: '上门检测地址必填',
          icon: 'none'
        })
      }
      let params = {
        groupName: this.data.groupName,
        appointmentPerson: this.data.appointmentPerson,
        appointmentSex: this.data.appointmentSex == '男' ? 0 : 1,
        appointmentPhone: this.data.appointmentPhone,
        visit: this.data.visit,
        businessPic: this.data.businessPic,
        userDetectionDtos: this.data.userDetectionDtos,
        appointmentTime: this.data.appointmentTime+':00',
        visitPlace: this.data.visitPlace,
        appointmentCard: this.data.appointmentCard,
      }
      app.request('/sportmedicalserver/userDetection/saveGroupDetection',params).then(res=>{
        if(res.code == 200) {
          wx.showToast({
            title: '预约成功',
            icon: 'none',
            complete: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }, 1000)
            }
          })
        }
      })
    }
  },
  onPickerChange: function (e) {
    console.log(e.detail);
    this.setData({
      appointmentTime: e.detail.dateString
    })
  },
  // 显示遮罩层
  showMask () {
    let teamItem={
      appointmentPerson: '',
      appointmentPhone: '',
      appointmentCard: '',
    }
    this.setData({ 
      flag: false,
      teamItem: teamItem
    });

  },
  // 关闭遮罩层
  closeMask () {
    this.setData({ flag: true })
  },
  // 编辑名单
  editList (e) {
    let editKey = e.currentTarget.dataset.key;
    let teamItem = this.data.userDetectionDtos[editKey];
    this.setData({ 
      flag: false,
      teamItem: teamItem,
      editKey: editKey,
      isEdit: true
    })
  },
  // 添加名单
  addSubmit () {
    let userDetectionDtos = this.data.userDetectionDtos;
    let teamItem = this.data.teamItem;
    if(teamItem.appointmentPerson == '' || teamItem.appointmentPhone == ''||teamItem.appointmentCard == '') {
      return wx.showToast({
        title: '信息请先填写完整',
        icon: 'none'
      })
    }
    if (teamItem.appointmentCard == this.data.appointmentCard) {
      return wx.showToast({
        title: '请输入团队身份证',
        icon: 'none'
      })
    }
    if(this.data.isEdit) {
      userDetectionDtos[this.data.editKey] = teamItem;
    } else {
      userDetectionDtos.push(teamItem)
    }
    this.setData({ 
      flag: true,
      isEdit: false,
      userDetectionDtos: userDetectionDtos
    });
  },
  upLoadImg(){
    var that = this
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: app.globalData.hostUrl+'/sportmedicalserver/oss/postfile',
          filePath: tempFilePaths[0],
          name: 'img',
          header: {
            "token": app.globalData.userInfo.token,
            "Content-Type": "multipart/form-data",
            },
          success (res){
            console.log(res);
            let data = JSON.parse(res.data)
            console.log(data.data.data.imageUrl)
            that.setData({
              businessPic: data.data.data.imageUrl
            })
          }
        })       
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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

  }
})