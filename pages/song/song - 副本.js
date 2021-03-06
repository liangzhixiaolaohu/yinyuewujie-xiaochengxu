// pages/song/song.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prelim:[],
    final:[],
    match_id: 13
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      match_id: app.data.tmpId
    })
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  editSong(e){
    let id = e.currentTarget.dataset.id,
        song = e.currentTarget.dataset.song,
        composer = e.currentTarget.dataset.composer
    wx.navigateTo({
      url: '../song-edit/song-edit?match_id=' + this.data.match_id + '&id=' + id + '&song=' + song + '&composer=' + composer
    })
  },
  delSong(e){
    let index = e.currentTarget.dataset.index,
        id = e.currentTarget.dataset.id,
        type = e.currentTarget.dataset.type,
        str1 = JSON.stringify(this.data.prelim),
        arr1 = JSON.parse(str1),
        str2 = JSON.stringify(this.data.final),
        arr2 = JSON.parse(str2),
        that = this
    if (type == 1){
      arr1.splice(index, 1)
      this.setData({
        prelim: arr1
      })
    }else if(type == 2){
      arr2.splice(index, 1)
      this.setData({
        final: arr2
      })
    }
    
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
        
      }
    })
  },
  toSongEdit(e){
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../song-edit/song-edit?type=' + type + '&match_id=' + this.data.match_id
    })
  },
  init(){
    let that = this
    wx.request({
      url: app.globalData.api_url + '/v1/matchsong/list',
      data: {
        match_id: that.data.match_id
      },
      header: {
        'content-type': 'application/json',
        'token': app.data.token
      },
      success(res) {
        that.setData({
          prelim: res.data.data.prelim,
          final: res.data.data.final
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.onLoad()
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