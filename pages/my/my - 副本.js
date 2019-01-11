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
    tempFilePath:'../../static/images/code-qr.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // try {
    //   const value = wx.getStorageSync('token')
    //   if (value) {
    //     console.log(value)
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              })
            }
          })
        }else{
          wx.navigateTo({
            url: '../login/login'
          })
        }
      },
      fail(res){
        console.log(res)
      }
    })
    // try {
    //   const value = wx.getStorageSync('avatarUrl')
    //   if (value) {
    //     that.setData({
    //       avatarUrl: value
    //     })
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
    // try {
    //   const value = wx.getStorageSync('nickName')
    //   if (value) {
    //     that.setData({
    //       nickName: value
    //     })
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
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
            that.setData({
              btnShow: res.data.data.mobile
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    })
    
    // wx.getStorage({
    //   key: 'token',
    //   success(res) {
    //     console.log(res.data)
    //     wx.request({
    //       url: app.globalData.api_url + '/v1/user/profile', //仅为示例，并非真实的接口地址
    //       header: {
    //         'content-type': 'application/json', // 默认值
    //         'token': res.data
    //       },
    //       success(res) {
    //         console.log(res.data)
    //       }
    //     })
        
    //   },
    //   fail(res){
    //     wx.navigateTo({
    //       url: '../login/login'
    //     })
    //   }
    // })
    
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
    wx.getStorage({
      key:'token',
      success(res){
        console.log(res)
      }
    })
    if(that.data.codeInput !== ''){
      console.log(that.data.codeInput)
      wx.getStorage({
        key:'token',
        success(res){
          console.log('进入')
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
              that.setData({
                modalShow: false
              })
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
      data: this.data.wechat,
      success(res) {
        wx.getClipboardData({
          success(res) {
            // console.log(res.data) // data
          }
        })
      }
    })
  },
  savePictures(){
    let that = this
    var imgSrc = "https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/code-qr.png"
    wx.downloadFile({
      url: imgSrc,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);
          },
          complete(res) {
            console.log(res);
          }
        })
      }
    })
    // wx.getImageInfo({
    //   src: '../../static/images/code-qr.png',
    //   success(res) {
    //     console.log(res.path)
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.path,
    //       success(resl) {
    //         console.log(resl)
    //       },
    //       fail(resl) {
    //         console.log(resl)
    //       }
    //     })
    //   }
    // })
    
  },
  download(){
    wx.navigateTo({
      url: '../out/sj'
    })
  },
  smsAsync(){
    let that = this
    var p = new Promise(function (resolve, reject) {
      wx.request({
        url: app.globalData.api_url + '/v1/sms/send', //仅为示例，并非真实的接口地址
        data:{
          mobile: that.data.telInput,
          event:'bind'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method:'POST',
        success(res) {
          that.setData({
            msg_id: res.data.data.msg_id,
            modalShow: true
          })
          resolve()
        },
        fail(res) {
          console.log(res)
        }
      })
    })
      return p
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
  onShareAppMessage: function () {

  }
})