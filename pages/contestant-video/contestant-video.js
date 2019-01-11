// pages/contestant-video/contestant-video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    name:'',
    rank:'',
    vote:'',
    song:[],
    match_id:'',
    group_id:'',
    showPop:false,
    voteArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let str = decodeURIComponent(options.song)
    this.setData({
      avatar: options.avatar,
      name: options.name,
      rank: options.rank,
      vote: app.data.voteNum,
      match_id: options.match_id,
      group_id: options.group_id,
      uuid: options.uuid,
      song: JSON.parse(str)
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toVote(){
    let that = this
    wx.request({
      url: app.globalData.api_url + '/v1/match/voteadd',
      data: {
        match_id: this.data.match_id,
        group_id: this.data.group_id,
        uuid: this.data.uuid
      },
      header: {
        'content-type': 'application/json',
        'token': app.data.token
      },
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data.code == '1001') {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }else if (res.data.code == '1000') {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }else if (res.data.code == '0'){
          // let voteNum = parseInt(that.data.vote)
          // voteNum++
          app.data.voteNum ++
          let arr = app.data.voteNum.toString().split('')
          that.setData({
            voteArr: arr,
            vote: app.data.voteNum,
            showPop: true
          })
          wx.showToast({
            title: '投票成功',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  closePop() {
    this.setData({
      showPop: false
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