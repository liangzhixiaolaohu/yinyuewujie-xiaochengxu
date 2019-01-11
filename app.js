//app.js
// var events = require('events'); 
// import { EventEmitter } from "event"
// const emitter = new EventEmitter()
// emitter.setMaxListeners(100) //指定一个最大监听数量 
// emitter.setMaxListeners(0) //或者关闭最大监听阈值 

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  data:{
    add_data:'这里是app全局变量',
    token: wx.getStorageSync('token'),
    tmpMatchId:'',
    tmpGroupId:'',
    voteNum:0,
    avatarUrl:''
  },
  globalData: {
    userInfo: null,
    api_url:'https://yinyuewujie.com'
  }
})
