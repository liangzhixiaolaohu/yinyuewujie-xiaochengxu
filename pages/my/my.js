// pages/ipa/ipa.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:'',
    telInput:'',
    codeInput:'',
    msg_id:'',
    btnShow: true,
    modalShow: false,
    codeShow: false,
    wechat:'classicalmusician-fw',
    tempFilePath:'../../static/images/code-qr.png',
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token: res.data
        })
        // 查看是否授权
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo'] && that.data.token) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success(res) {
                  that.setData({
                    avatarUrl: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName
                  })
                  app.data.avatarUrl = res.userInfo.avatarUrl
                }
              })
            } else {
              wx.navigateTo({
                url: '../login/login'
              })
            }
          },
          fail(res) {
            console.log(res)
          }
        })
      },
      fail(res){
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
    
    wx.getStorage({
      key:'token',
      success(res){
        wx.request({
          url: app.globalData.api_url + '/v1/user/authlist',
          header:{
            'content-type':'application/json',
            'token':res.data
          },
          success(res) {
            // that.setData({
            //   btnShow: res.data.data.mobile
            // })
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    })
  },
  inputValue(e){
    this.setData({
      telInput: e.detail.value
    })
  },
  bindCodeValue(e){
    this.setData({
      codeInput: e.detail.value
    })
  },
  bindCodeInput(){
    let that = this
    this.smsAsync()
  },
  bindTelInput(){
    let that = this
    if(that.data.codeInput !== ''){
      wx.getStorage({
        key:'token',
        success(res){
          wx.request({
            url: app.globalData.api_url +'/v1/user/bindmobile',
            data:{
              mobile: that.data.telInput,
              code:that.data.codeInput,
              msg_id: that.data.msg_id
            },
            header:{
              'content-type':'application/json',
              'token': res.data
            },
            method:'POST',
            success(res){
              console.log(res)
              that.setData({
                modalShow: false
              })
              if(res.data.code == 0){
                wx.showToast({
                  title: '绑定成功',
                  icon: 'none',
                  duration: 2000
                })
              }else{
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
              
            },
            fail(res){
              console.log(res)
            }
          })
          
        }
      })
    }
  },
  codeQr(){
    this.setData({
      codeShow: true
    })
  },
  closeModal(){
    this.setData({
      modalShow: false
    })
  },
  closeCode(){
    this.setData({
      codeShow:false
    })
  },
  copyWechat(){
    wx.setClipboardData({
      data: this.data.wechat
    })
  },
  savePictures(){
    let that = this
    var imgSrc = ['https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/app-load.png','https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/app-load.png']
    wx.previewImage({
      current: imgSrc, // 当前显示图片的http链接   
      urls: imgSrc // 需要预览的图片http链接列表   
    })

    // wx.downloadFile({
    //   url: imgSrc,
    //   success: function (res) {
    //     console.log(res);
    //     //图片保存到本地
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath,
    //       success: function (data) {
    //         wx.showToast({
    //           title: '保存成功',
    //           icon: 'success',
    //           duration: 2000
    //         })
    //       },
    //       fail: function (err) {
    //         console.log(err);
    //       },
    //       complete(res) {
    //         console.log(res);
    //       }
    //     })
    //   }
    // })
  },
  toLogin(){
    wx.navigateTo({
      url: '../login/login'
    })
  },
  download(){
    wx.navigateTo({
      url: '../out/sj'
    })
  },
  smsAsync(){
    let that = this
    if (that.data.telInput){
      var p = new Promise(function (resolve, reject) {
        wx.request({
          url: app.globalData.api_url + '/v1/sms/send', //仅为示例，并非真实的接口地址
          data:{
            mobile: that.data.telInput,
            event:'bind'
          },
          header: {
            'content-type': 'application/json', // 默认值
            'token': app.data.token
          },
          method:'POST',
          success(res) {
            if (res.data.code == 0){
              that.setData({
                msg_id: res.data.data.msg_id,
                modalShow: true
              })
            }else{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
            
            //resolve()
          },
          fail(res) {
            console.log(res)
          }
        })
      })
      return p
    }else{
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 2000
      })
    }
  },
  introduce(){
    wx.navigateTo({
      url:'../introduce/introduce'
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