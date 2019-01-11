// pages/voting-group/voting-group.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    match_id: '',
    group: {},
    groupId:[],
    groupPic:[],
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      match_id: app.data.tmpMatchId
    })
    let that = this
    wx.request({
      url: app.globalData.api_url + '/v1/match/votegrouplist',
      data:{
        match_id: app.data.tmpMatchId
      },
      header: {
        'content-type': 'application/json',
        'token': app.data.token
      },
      success(res){
        if (res.data.code == 0){
        let str = JSON.stringify(res.data.data),
            picArr = [],
            idArr = []
        
        res.data.data.map(item => {
          if (item.name.indexOf('初中') != -1){
            picArr.push('https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/group1.png')
          }else if(item.name.indexOf('高中') != -1){
            picArr.push('https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/group2.png')
          }else if(item.name.indexOf('青年') != -1){
            picArr.push('https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/group3.png')
          }else{
            picArr.push('https://image-smteat.oss-cn-beijing.aliyuncs.com/static/xiaochengxu/images/group4.png')
          }
          idArr.push(item.group_id)
        })
        that.setData({
          group: JSON.parse(str),
          groupId: idArr,
          groupPic: picArr
        })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tovotinglist(e){
    app.data.tmpGroupId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../voting-list/voting-list?match_id=' + this.data.match_id + '&group_id=' + app.data.tmpGroupId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
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