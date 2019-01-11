// pages/voting-list/voting-list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    banner:'',
    match_id:'',
    group_id:'',
    uuid:'',
    showPop:false,
    songArr:[],
    voteArr:[],
    voteNumArr:[],
    inputValue:'',
    nickname:'',
    avatar:'',
    rank:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      match_id: app.data.tmpMatchId,
      group_id: app.data.tmpGroupId
    })
    this.showList(this.data.match_id, this.data.group_id, '')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  showList(mid,gid,name){
    let that = this
    var p = new Promise(function (resolve, reject){
      wx.request({
        url: app.globalData.api_url + '/v1/match/votelist',
        data: {
          match_id: mid,
          group_id: gid,
          realname: name
        },
        header: {
          'content-type': 'application/json',
          'token': app.data.token
        },
        success(res) {
          wx.setNavigationBarTitle({
            title: res.data.data.group.name
          })
          let str = JSON.stringify(res.data.data.vote_rank)
          that.setData({
            banenr: res.data.data.match.image,
            list: JSON.parse(str)
          })
          let arr = [],
              arr2 = []
          that.data.list.forEach(function (item, index) {
            arr[index] = JSON.stringify(item.song)
            arr2[index] = item.vote_num
          })
          that.setData({
            songArr: arr,
            voteNumArr:arr2
          })
          resolve()
        }
      })
    })
    return p
  },
  toVote(e){
    let that = this
    let mid = e.currentTarget.dataset.mid,
      gid = e.currentTarget.dataset.gid,
      uid = e.currentTarget.dataset.uid,
      voteNum = e.currentTarget.dataset.num,
      nickname = e.currentTarget.dataset.name,
      avatar = e.currentTarget.dataset.avatar,
      rank = e.currentTarget.dataset.rank,
      index = e.currentTarget.dataset.index
    app.data.voteNum = e.currentTarget.dataset.num
    this.getMobile().then(function(data){
      if (data != ''){
        wx.request({
          url: app.globalData.api_url + '/v1/match/voteadd',
          data: {
            match_id: mid,
            group_id: gid,
            uuid: uid
          },
          header: {
            'content-type': 'application/json',
            'token': app.data.token
          },
          method: 'POST',
          success(res) {
            if (res.data.code == '1001') {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }else if (res.data.code == '1000'){
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }else if (res.data.code == '0'){
              let str = JSON.stringify(that.data.voteNumArr),
                  arr = JSON.parse(str)
              arr[index] = arr[index] + 1
              //voteNum++
              app.data.voteNum ++
              let sArr = app.data.voteNum.toString().split('')
              that.setData({
                showPop: true,
                voteArr: sArr,
                uuid: uid,
                nickname: nickname,
                avatar: avatar,
                rank: rank,
                voteNumArr: arr
              })
              wx.showToast({
                title: '投票成功',
                icon: 'none',
                duration: 2000
              })
            }else{
              console.log('在投票')
            }
          },
          fail(res){
            console.log(res)
          }
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
  getMobile(){
    var p = new Promise(function (resolve, reject){
      wx.request({
        url: app.globalData.api_url + '/v1/user/profile',
        header: {
          'content-type': 'application/json',
          'token': app.data.token
        },
        success(res) {
          if (res.data.code == 0){
            let mobile = res.data.data.mobile
            resolve(mobile)
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
            return
          }
          
        }
      })
    })
    return p
  },
  toContestant(e){
    let avatar = e.currentTarget.dataset.avatar,
        name = e.currentTarget.dataset.name,
        rank = e.currentTarget.dataset.rank,
        vote = e.currentTarget.dataset.vote,
        uuid = e.currentTarget.dataset.uid,
        song = encodeURIComponent(e.currentTarget.dataset.song)
    app.data.voteNum = vote
    wx.navigateTo({
      url: '../contestant-video/contestant-video?avatar=' + avatar + '&name=' + name + '&rank=' + rank + '&vote=' + vote + '&song=' + song + '&match_id=' + this.data.match_id + '&group_id=' + this.data.group_id + '&uuid=' + uuid
    })
  },
  closePop(){
    this.setData({
      showPop: false
    })
    this.onLoad()
  },
  bindconfirmfn(e) {
    let keywords = e.detail.value
    this.showList(this.data.match_id, this.data.group_id, keywords)
  },
  formReset() {
    this.setData({
      inputValue:''
    })
    this.showList(this.data.match_id, this.data.group_id, '')
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