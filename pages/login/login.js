// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    rawData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  isLogin: function () {
    let that = this
    var p = new Promise(function (resolve, reject){
      wx.login({
        success(res) {
          if (res.code) {
            that.setData({
              code: res.code
            })
            resolve()
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    })
    return p
  },
  bindGetUser(e) {
    console.log(e.detail)
    let that = this
    this.isLogin().then(function(){
      if (e.detail.errMsg == "getUserInfo:ok"){
        let userInfo = {}
        that.setData({
          rawData: e.detail.rawData
        })
        userInfo.code = that.data.code
        userInfo.rawData = that.data.rawData
        //发起网络请求
        wx.request({
          url: app.globalData.api_url+'/v1/wxapp/auth',
          data: userInfo,
          header: {
            'content-type': 'application/json',
            'token': app.data.token
          },
          method: "POST",
          success: function (res) {
            wx.setStorage({
              key: 'token',
              data: res.data.data.token
            })
            app.data.token = res.data.data.token
            console.log(app.data.token)
            wx.reLaunch({
              url: '../my/my'
            })
          },
          fail: function (err) {
            console.log(err)
          } //请求失败
        })
      }
    })
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '国际化艺术教育与留学平台',
      imageUrl: '../../static/images/share1.jpg'
    }
  }
})