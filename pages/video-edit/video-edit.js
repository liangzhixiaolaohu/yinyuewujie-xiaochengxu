// pages/video-edit/video-edit.js
const app = getApp()
const qiniuUploader = require("../../static/js/qiniuUploader")
// var qiniu = require('../../static/js/qiniu.min.js')
// var plupload = require('../../static/js/plupload.full.min.js')
// var ui = require('../../static/js/ui.js')
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc:'',
    videoHash:'',
    videoShow: true,
    uptoken:'',
    song:'',
    composer:'',
    match_id:'13',
    id:'',
    type:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      match_id: options.match_id
    })
    if(options && options.id){
      this.setData({
        id:options.id,
        song:options.song,
        composer:options.composer,
        videoSrc:options.video
      })
    }
    if (this.data.videoSrc){
      let arr = this.data.videoSrc.split('/')
      console.log(arr[arr.length-1])
      this.setData({
        videoHash: arr[arr.length - 1]
      })
    }
    this.getUptoken()
  },
  getUptoken() {
    let that = this
    var p = new Promise(function (resolve, reject){
      wx.request({
        url: app.globalData.api_url + '/v1/upload/token',
        data: {
          bucket: 'video'
        },
        header: {
          'content-type': 'application/json',
          'token': app.data.token
        },
        method: 'POST',
        success(res) {
          that.setData({
            uptoken: res.data.data.token
          })
          resolve(res.data.data.token)
        }
      })
    })
    return p
  },
  chooseVideo(){
    let that = this
    if(this.data.uptoken){
      this.didPressChooseImage(this.data.uptoken)
    }else{
      wx.showToast({
        title: '请选择视频',
        icon: 'none',
        duration: 2000
      })
    }
    // wx.chooseVideo({
    //   sourceType: ['album', 'camera'],
    //   maxDuration: 60,
    //   camera: 'back',
    //   success(res) {
    //     console.log(res.tempFilePath)
    //     that.setData({
    //       videoSrc: res.tempFilePath
    //     })
    //   }
    // })
  },
  playVideo(){
    let video = wx.createVideoContext("myvedio", this)
    video.play()
    console.log(video)
    this.setData({
      videoShow: false
    })
  },
  didPressChooseImage (t) {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          // 每个文件上传成功后,处理相关的事情
          // 其中 info 是文件上传成功后，服务端返回的json，形式如
          // {
          //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
          //    "key": "gogopher.jpg"
          //  }
          // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
          that.setData({
            videoSrc: 'http://cdn.yinyuewujie.com/' + res.imageURL,
            videoHash: res.imageURL
          })
        }, (error) => {
          console.log('error: ' + error);
        }, {
            region: 'NCN',
            //domain: 'cdn.yinyuewujie.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
            //key: 'customFileName', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
            // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
            uptoken: t // 由其他程序生成七牛 uptoken
            //uptokenURL: t // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
            //uptokenFunc: function () { return '[yourTokenString]'; }
          }, (res) => {
            console.log('上传进度', res.progress)
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
          });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  formSubmit(e){
    let that = this
    if(this.data.id){
      wx.request({
        url: app.globalData.api_url + '/v1/matchsong/edit',
        data: {
          match_id:that.data.match_id,
          id:that.data.id,
          song:that.data.song,
          composer:that.data.composer,
          video: that.data.videoHash
        },
        header: {
          'content-type': 'application/json',
          'token': app.data.token
        },
        method: 'POST',
        success(res) {
          if(res.data.code == 0){
            wx.redirectTo({
              url: '../video/video'
            })
          }
        }
      })
    }else{
      let str = JSON.stringify(e.detail.value)
      let obj = JSON.parse(str)
      obj.match_id = that.data.match_id
      obj.type = 3
      obj.video = that.data.videoHash
      wx.request({
        url: app.globalData.api_url + '/v1/matchsong/add',
        data: obj,
        header: {
          'content-type': 'application/json',
          'token': app.data.token
        },
        method: 'POST',
        success(res) {
          if(res.data.code == 1001){
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }else if(res.data.code == 0){
            wx.redirectTo({
              url: '../video/video'
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