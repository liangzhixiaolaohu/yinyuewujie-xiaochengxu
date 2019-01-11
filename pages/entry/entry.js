// pages/entry/entry.js
const MD5 = require('../../static/js/md5.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    n: 1,
    matchInfo:{},
    id:'',
    order_no:'',
    nonceStr:'',
    package:'',
    paySign:'',
    timeStamp:'',
    appid: '',
    partnerid: '',
    prepayid: '',
    dataStr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.data.tmpMatchId = options.match_id
    this.setData({
      n: options.n,
      id: options.match_id
    })
    wx.request({
      url: app.globalData.api_url + '/v1/matchentry/overview',
      data: {
        match_id: options.match_id
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': app.data.token
      },
      success(res) {
        let str = JSON.stringify(res.data.data)
        that.setData({
          matchInfo: JSON.parse(str)
        })
        wx.setNavigationBarTitle({
          title: that.data.matchInfo.title
        })
      }
    })
  },
  toSong(){
    wx.navigateTo({
      url: '../song/song?match_id='+this.data.id,
    })
  },
  toBuy(){
    let that = this
    this.getMobile().then(function(data){
      if (data != ''){
        that.createOrder()
        .then(function () {
          return that.unifiedOrder()
        })
        .then(function () {
          wx.requestPayment({
            timeStamp: that.data.timeStamp,
            nonceStr: that.data.nonceStr,
            package: that.data.package,
            signType: 'MD5',
            paySign: that.data.paySign,
            success(res) {
              console.log(res)
              wx.request({
                url: app.globalData.api_url + '/v1/pay/notify',
                data: {
                  order_no: that.data.order_no,
                  status: 'wxpay_success'
                },
                header: {
                  'content-type': 'application/json',
                  'token': app.data.token
                },
                method: 'POST',
                success(res) {
                  console.log(res)
                  console.log(res.data.code)
                  if (res.data.code == 1001) {
                    wx.showToast({
                      title: res.data.message,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }
              })
            },
            fail(res) {
              console.log(res)
            }
          })

        })
      }else{
        wx.showToast({
          title: '请先绑定手机号',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  createOrder(){
    let that = this
    let p = new Promise(function(resolve,reject){
      wx.request({
        url: app.globalData.api_url + '/v1/order/add',
        data: {
          mode: 'match_entry',
          match_id: that.data.id,
          fee: that.data.matchInfo.pay.fee,
          pay_fee: that.data.matchInfo.pay.fee,
          type: that.data.n
        },
        header: {
          'content-type':'appliction/json',
          'token':app.data.token
        },
        method: 'POST',
        success(res) {
          if (res.data.code == 1001){
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.code == 0){
            that.setData({
              order_no: res.data.data.order_no
            })
          }else{
            console.log('创建订单未成功')
          }
          
          resolve()
        }
      })
    })
    return p
  },
  unifiedOrder(){
    let that = this
    let p = new Promise(function(resolve, reject){
      wx.request({
        url: app.globalData.api_url + '/v1/pay/unifiedorder',
        data: {
          order_no: that.data.order_no,
          platform: 'wxpay_jsapi'
        },
        header: {
          'content-type': 'application/json',
          'token': app.data.token
        },
        method: 'POST',
        success(res) {
          console.log(res.data)
          if (res.data.code == 0){
            that.setData({
              nonceStr: res.data.data.nonceStr,
              package: res.data.data.package,
              paySign: res.data.data.paySign,
              timeStamp: res.data.data.timeStamp
            })
            resolve()
          }
        }
      })
    })
    return p
  },
  getMobile() {
    var p = new Promise(function (resolve, reject) {
      wx.request({
        url: app.globalData.api_url + '/v1/user/profile',
        header: {
          'content-type': 'application/json',
          'token': app.data.token
        },
        success(res) {
          let mobile = res.data.data.mobile
          resolve(mobile)
        }
      })
    })
    return p
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