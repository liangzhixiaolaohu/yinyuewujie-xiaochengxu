// pages/more/more.js
const WxParse = require('../../static/wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    match_id:'',
    api_url:app.globalData.api_url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type,
      match_id: options.match_id
    })
    var that = this
    // var article = options.more
    // var ceshi = '<div><span>请说出你喜欢的水果？</span><ul><li>苹果 < /li><li> 香蕉 </li><li> 橙子 </li></ul></div>'
    
    // WxParse.wxParse('article', 'html', article, that, 5)
    wx.request({
      url: app.globalData.api_url + '/v1/match/introhtml',
      data:{
        match_id: this.data.match_id,
        type: this.data.type
      },
      success(res){
        console.log(res)
        let con = res.data
        WxParse.wxParse('article1', 'html', con, that, 5)
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