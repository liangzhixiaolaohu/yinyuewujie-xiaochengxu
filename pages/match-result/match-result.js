// pages/match-result/match-result.js
const WxParse = require('../../static/wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: app.globalData.api_url +'/v1/match/result',
      data:{
        match_id: options.match_id
      },
      success(res){
        console.log(res.data)
        let content1 = res.data.data[0].content
        WxParse.wxParse('article1', 'html', content1, that, 5)
        let content2 = res.data.data[1].content
        WxParse.wxParse('article2', 'html', content2, that, 5)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toTab(e){
    let tp = e.target.dataset.type
    this.setData({
      type: tp
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