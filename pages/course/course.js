// pages/course/course.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:[],
    type:1,
    match_id:'',
    simpleCourse:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      match_id: options.match_id
    })
    wx.request({
      url: app.globalData.api_url + '/v1/match/course',
      data: {
        match_id: options.match_id
      },
      header: {
        'content-type': 'application/json',
        'token': app.data.token
      },
      success(res){
        that.setData({
          course: res.data.data
        })
        let str = JSON.stringify(that.data.course)
        let obj = JSON.parse(str)
        let arr = []
        obj.forEach(function(item,index){
          arr[index] = JSON.stringify(item)
        })
        that.setData({
          simpleCourse: arr
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toTab(e){
    let type = e.currentTarget.dataset.type
    this.setData({
      type:type
    })
  },
  courseDetails(e){
    let course_id = e.currentTarget.dataset.id
    let fee = e.currentTarget.dataset.fee
    wx.navigateTo({
      url: '../course-details/course-details?jury_id=' + course_id + '&fee=' + fee
    })
  },
  toBuy(e){
    let str = e.currentTarget.dataset.course,
        obj = JSON.parse(str),
        course = {}
    course.course_id = obj.course_id
    course.type = obj.type
    course.quantity = obj.sale_quantity
    course.fee = obj.fee
    wx.request({
      url: app.globalData.api_url + '/v1/order/add',
      data:{
        mode:'match_course',
        match_id: this.data.match_id,
        course: JSON.stringify(course)
      },
      header:{
        'content-type':'application/json',
        'token':app.data.token
      },
      method:'POST',
      success(res){
        console.log(res)
        if (res.data.code == 0){
          wx.navigateTo({
            url: '../payment/payment',
          })
        }
      }
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