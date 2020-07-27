// pages/appointInfo/appointInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentKey: 1,
    title: '团体',
    name: '',
    sex: '',
    phone: '',
    cart: '',
    date: '',
    personalArr: [1,2,3,4],
    flag: true,
    isEdit: false,
    key: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      key: options.key
    })
    
  },
  // input的change事件
  inputChange (event) {

  },
  // 性别选择
  sexChange (event) {
    let { key } = event.currentTarget.dataset;
    switch (key) {
      case '1':
        this.setData({
          currentKey: 1
        })
        break;
      case '2':
        this.setData({
          currentKey: 2
        })
      default:
        break;
    }
  },
  // 提交按钮
  submit () {},
  // 显示遮罩层
  showMask () {
    this.setData({ flag: false })
  },
  // 关闭遮罩层
  closeMask () {
    this.setData({ flag: true })
  },
  // 编辑名单
  editList () {
    this.isEdit = true
  },
  // 添加名单
  addSubmit () {
    this.isEdit = false
    this.setData({ flag: false })
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