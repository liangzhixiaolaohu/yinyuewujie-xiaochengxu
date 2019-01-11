// pages/ipa/ipa.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log(res.data)
      }
    })
  },
  toLoad(){
    console.log(12)
    this.setData({
      codeShow:true
    })
  },
  closeCode() {
    this.setData({
      codeShow: false
    })
  },
  savePictures() {
    let that = this
    var imgSrc = ['https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/app-load.png', 'https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/app-load.png']
    wx.previewImage({
      current: imgSrc, // 当前显示图片的http链接   
      urls: imgSrc // 需要预览的图片http链接列表   
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
      imageUrl: '../../static/images/share2.jpg'
    }
  }
})