// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:[],
    match_id:13
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: app.globalData.api_url + '/v1/matchsong/list',
      data:{
        match_id:that.data.match_id
      },
      header:{
        'content-type':'application/json',
        'token':app.data.token
      },
      success(res){
        that.setData({
          videoList: res.data.data.video
        })
      }
    })
  },
  addVideo(){
    if(this.data.videoList.length < 2){
      wx.redirectTo({
        url: '../video-edit/video-edit?match_id=' + this.data.match_id,
      })
    }else{
      wx.showToast({
        title: '最多添加两个视频',
        icon:'none',
        duration:2000
      })
    }
  },
  editVideo(e){
    let id = e.currentTarget.dataset.id,
        song = e.currentTarget.dataset.song,
        composer = e.currentTarget.dataset.composer,
        videosrc = e.currentTarget.dataset.videosrc
    wx.redirectTo({
      url: '../video-edit/video-edit?match_id=' + this.data.match_id + '&id=' + id + '&song=' + song + '&composer=' + composer + '&video=' + videosrc
    })
  },
  delVideo(e){
    let id = e.currentTarget.dataset.id,
        index = e.currentTarget.dataset.index,
        str = JSON.stringify(this.data.videoList),
        arr = JSON.parse(str)
    arr.splice(index,1)
    this.setData({
      videoList:arr
    })
    wx.request({
      url: app.globalData.api_url + '/v1/matchsong/delete',
      data:{
        id: id
      },
      header:{
        'content-type':'application/json',
        'token':app.data.token
      },
      method:'POST',
      success(res){
        // if(res.data.code == 0){
        //   wx.showToast({
        //     title: '已删除',
        //     icon:'none',
        //     duration: 2000
        //   })
        // }
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