// pages/details/details.js
const WxParse = require('../../static/wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    tp: '',
    id: '',
    num: 1,
    suShow: false,
    isbmStatus:'',
    entry_status:'',
    matchStatus:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      id: options.match_id
    })
    let id = options.match_id
    app.data.tmpMatchId = options.match_id
    wx.request({
      url: app.globalData.api_url +'/v1/match/item?match_id='+id,
      header: {
        'content-type': 'application/json',
        'token': app.data.token
      },
      success(res) {
        let jury = res.data.data.jury
        that.setData({
          details: res.data.data,
          tp: res.data.data.type,
          isbmStatus: res.data.data.entry.status,
          entry_status: res.data.data.entry_status,
          matchStatus: res.data.data.status
        })
      },
      fail(res) {
        console.log(res.data)
      }
    })
  },
  layerOpen: function(e){
    let tp = e.currentTarget.dataset.type
    if(tp == 1){
      this.setData({
        n1: 1,
        n2:2,
        num:1
      })
    }else if(tp == 2){
      this.setData({
        n1: 3,
        n2: 4,
        num:3
      })
    }
    this.setData({
      suShow:true
    })
  },
  layerClose:function(){
    this.setData({
      suShow: false
    })
  },
  more: function (e) {
    let that = this
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../more/more?type=' + type + '&match_id=' + that.data.id
    })
  },
  tovotinggroup(){
    wx.navigateTo({
      url: '../voting-group/voting-group?match_id=' + this.data.id + '&entry_status=' + this.data.entry_status
    })
  },
  toResult(){
    wx.navigateTo({
      url: '../match-result/match-result?match_id=' + this.data.id,
    })
  },
  tochoice: function(e){
    let n = e.currentTarget.dataset.type
    let that = this
    this.setData({
      num: n
    })
  },
  tojoin: function(){
    let that = this
    wx.getStorage({
      key:'token',
      success(res){
        console.log(res)
        wx.request({
          url: app.globalData.api_url + '/v1/matchentry/preentry',
          data:{
            match_id: that.data.id,
            type: that.data.num
          },
          header:{
            'content-type':'application/json',
            'token':res.data
          },
          method:'POST',
          success(res) {
            if (res.data.code === 0){
              wx.showToast({
                title: '报名成功',
                icon: 'none',
                duration: 2000
              })
              let n = that.data.num
              wx.navigateTo({
                url: '../entry/entry?n=' + n + '&match_id=' + that.data.id
              })
            } else if (res.data.code === 1001){
              wx.showToast({
                title: '已预报名成功',
                icon: 'none',
                duration: 2000
              })
            } else if (res.data.code === 1000) {
              wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail(res) {
            console.log(res.data)
          }
        })
      },
      fail(res){
        wx.navigateTo({
          url: '../login/login'
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