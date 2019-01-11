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
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success(res) {
    //           console.log(res.userInfo)
    //           // wx.navigateTo({
    //           //   url: '../my/my'
    //           // })
    //         }
    //       })
    //     }
    //   },
    //   fail(err){
    //     console.log(err)
    //   }
    // })
  },
  test:function(){
    // wx.getUserInfo({
    //   success(res) {
    //     console.log(res.userInfo)
    //     // wx.navigateTo({
    //     //   url: '../my/my'
    //     // })
    //   },
    //   fail(err) {
    //     console.log(err)
    //   },
    //   complete(res){
    //     console.log(res)
    //   }
    // })
  },
  isLogin: function () {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
          // console.log(that.data.code)
          // wx.getUserInfo({
          //   success(res) {
          //     console.log(res)
          //     that.setData({
          //       rawData: res.rawData
          //     })
          //     userInfo.code = that.data.code
          //     userInfo.rawData = that.data.rawData
          //     //发起网络请求
          //     wx.request({
          //       url: app.globalData.api_url+'/v1/wxapp/auth',
          //       data: userInfo,
          //       method: "POST",
          //       success: function (res) {
          //         console.log(res.data)
          //         wx.setStorage({
          //           key: 'token',
          //           data: res.data.data.token
          //         })
          //         wx.getStorage({
          //           key: 'token',
          //           success(res) {
          //             console.log(res.data)
          //           }
          //         })
          //         wx.reLaunch({
          //           url: '../my/my'
          //         })
          //       },
          //       fail: function (err) {
          //         console.log(err)
          //       } //请求失败
          //     })
          //   },
          //   fail(res){
          //     console.log(res)
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  bindGetUser(e) {
    console.log(e.detail)
    let that = this
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
        method: "POST",
        success: function (res) {
          // console.log(res.data)
          wx.setStorage({
            key: 'token',
            data: res.data.data.token
          })
          // wx.getStorage({
          //   key: 'token',
          //   success(res) {
          //     console.log(res.data)
          //   }
          // })
          wx.reLaunch({
            url: '../my/my'
          })
        },
        fail: function (err) {
          console.log(err)
        } //请求失败
      })
      // wx.switchTab({
      //   url: '../my/my'
      // })
    }
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