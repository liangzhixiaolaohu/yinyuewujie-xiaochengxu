// pages/song-edit/song-edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song:'',
    composer:'',
    type:'',
    match_id:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        song:options.song,
        composer:options.composer,
        id:options.id
      })
    }
    if (options.type){
      this.setData({
        type: options.type
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  formSubmit(e){
    let that = this
    if (this.data.id){
      wx.request({
        url: app.globalData.api_url + '/v1/matchsong/edit',
        data:{
          match_id: app.data.tmpMatchId,
          id:that.data.id,
          song:that.data.song,
          composer:that.data.composer
        },
        header:{
          'content-type':'application/json',
          'token':app.data.token
        },
        method:'POST',
        success(res){
          if(res.data.code == 0){
            wx.redirectTo({
              url: '../song/song'
            })
          }
        }
      })
    }else{
      wx.request({
        url: app.globalData.api_url + '/v1/matchsong/add',
        data: {
          match_id: app.data.tmpMatchId,
          song: that.data.song,
          composer: that.data.composer,
          type: that.data.type
        },
        header: {
          'content-type': 'application/json',
          'token': app.data.token
        },
        method: 'POST',
        success(res) {
          if (res.data.code == 1001) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.code == 0) {
            wx.showToast({
              title: '添加成功',
              icon: 'none',
              duration: 2000
            })
            wx.redirectTo({
              url: '../song/song'
            })
          }

        }
      })
    }
    
  },
  inputSong(e){
    this.setData({
      song: e.detail.value
    })
  },
  inputComposer(e){
    this.setData({
      composer: e.detail.value
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