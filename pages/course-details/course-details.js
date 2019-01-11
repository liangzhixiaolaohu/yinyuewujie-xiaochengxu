// pages/course-details/course-details.js
const WxParse = require('../../static/wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jury_id:'',
    content:{},
    fee:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fee: options.fee,
      jury_id: options.jury_id
    })
    let that = this
    wx.request({
      url: app.globalData.api_url + '/v1/jury/item',
      data:{
        jury_id: this.data.jury_id
      },
      header: {
        'content-type': 'application/json',
        'token': app.data.token
      },
      success(res){
        that.setData({
          content: res.data.data
        })
        let intro_html = res.data.data.intro_html
        WxParse.wxParse('article', 'html', intro_html, that, 5)
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