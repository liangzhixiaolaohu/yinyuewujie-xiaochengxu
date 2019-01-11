// pages/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headurl:'',
    groupList:['初中组','高中组','青年组'],
    group:'请选择',
    gender: 0,
    user:{},
    region: ['北京市', '北京市', '东城区'],
    nickname:'',
    realname:'',
    idcode:'',
    mobile:'',
    email:'',
    school:'',
    teacher:'',
    major:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      avatarUrl: app.data.avatarUrl || 'https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/head.png'
    })
    wx.getStorage({
      key:'token',
      success(res){
        wx.request({
          url: app.globalData.api_url + '/v1/user/profile',
          header: {
            'content-type': 'application/json',
            'token':res.data
          },
          success(res) {
            console.log(res.data)
            let str = JSON.stringify(res.data.data)
            that.setData({
              user: JSON.parse(str),
              gender: res.data.data.gender
            })
          }
        })
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
  chooseImg(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          headurl: tempFilePaths
        })
      }
    })
  },
  actionSheet(){
    let that = this
    wx.showActionSheet({
      itemList: that.data.groupList,
      success(res) {
        that.setData({
          group: that.data.groupList[res.tapIndex]
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  gender(e){
    let sex = e.currentTarget.dataset.sex
    this.setData({
      gender: sex
    })
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit(e) {
    let str = JSON.stringify(e.detail.value)
    let obj = JSON.parse(str)
    obj.region = this.data.region
    obj.group = this.data.group
    this.setData({
      nickname: obj.nickname,
      realname: obj.realname,
      idcode: obj.idcode,
      mobile: obj.mobile,
      email: obj.email,
      school:obj.school,
      teacher:obj.teacher,
      major:obj.major
    })
    if (this.data.nickname !== '' && this.data.realname !== '' && this.data.idcode !== '' && this.data.mobile !== '' && this.data.email !== '' && this.data.school !== '' && this.data.teacher !== '' && this.data.major !== '' && this.data.group !== '请选择'){
      wx.request({
        url: app.globalData.api_url + '/v1/user/updateprofile',
        data: obj,
        header: {
          'content-type': 'application/json',
          'token': app.data.token
        },
        success(res) {
          console.log(res)
          console.log(res.data.code)
          if (res.data.code == 0){
            wx.showToast({
              title: '保存成功',
              icon: 'none',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
          
        }
      })
    }else{
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  inputNickname(e){
    this.setData({
      nickname:e.detail.value,
    })
  },
  inputRealname(e) {
    this.setData({
      realname: e.detail.value,
    })
  },
  inputRealname(e) {
    this.setData({
      realname: e.detail.value,
    })
  },
  inputIdcode(e) {
    this.setData({
      idcode: e.detail.value,
    })
  },
  inputMobile(e){
    this.setData({
      mobile: e.detail.value,
    })
  },
  inputEmail(e) {
    this.setData({
      email: e.detail.value,
    })
  },
  inputSchool(e) {
    this.setData({
      school: e.detail.value,
    })
  },
  inputTeacher(e) {
    this.setData({
      teacher: e.detail.value,
    })
  },
  inputMajor(e) {
    this.setData({
      major: e.detail.value,
    })
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