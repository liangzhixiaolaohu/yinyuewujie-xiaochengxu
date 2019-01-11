//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab: 0,
    match: [],
    banner: [],
    activity: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../details/details'
    })
  },
  detail: function(e){
    let that = this
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '../details/details?match_id='+id
    })
  },
  // 切换
  swiperTab: function(e){
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  clickTab: function(e){
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: app.globalData.api_url + '/v1/match/list?type=1', //仅为示例，并非真实的接口地址
      header:{
        'content-type':'application/json',
        'token':app.data.token
      },
      success(res) {
        that.setData({
          match: res.data.data.list,
          banner: res.data.data.banner
        })
      },
      fail(res) {
        console.log(res.data)
      } 
    })
    wx.request({
      url: app.globalData.api_url + '/v1/match/list?type=2', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json',
        'token': app.data.token
      },
      success(res) {
        that.setData({
          activity: res.data.data.list
        })
      },
      fail(res) {
        console.log(res.data)
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getSetting: function(){
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  },
  isLogin: function(){
    let that = this
    wx.login({
      success(res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
          that.getUserInfo()
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
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
