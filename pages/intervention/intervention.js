//获取应用实例  
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    name:"",
    cate:""
  },
  selected: function (e) {
    this.setData({
      selected2: false,
      selected1: false,
      selected: true
    }),
      wx.createAudioContext('myAudio').pause()
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false,
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true,
    }),
      wx.createAudioContext('myAudio').pause()
  },
  //播放音乐
  playmusic:function(e){
    // console.log(e.target.dataset);
    // this.setData({'name':e.target.dataset.name,'cate':e.target.dataset.cate})
    this.audioCtx = wx.createAudioContext('myAudio'),
    this.audioCtx.setSrc('http://img.pems.cn/' + app.musiclist[e.currentTarget.dataset.id].resource_path);
    this.audioCtx.play()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var __this = this;
    wx.request({
      url: getApp().data.servsers +'/user/packdetail?packageid='+options.packageid,
      header: {
        'content-type': 'application/json'
      },
      type: 'get',
      success: function (res) {
          var datas = {};
          __this.setData({ 'listvideo': res.data.decom});
          __this.setData({ 'testdatas': res.data.train});
          __this.setData({'musiclist':res.data.music});
          app.musiclist = res.data.music;
      }
    });
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
    
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  videoplay:function(e){
    wx.navigateTo({
      url: '../../pages/videoplay/videoplay?playid='+
      e.currentTarget.dataset.id + '&desc=' + 
      e.currentTarget.dataset.desc + '&name=' +
      e.currentTarget.dataset.name + '&path=' +
      e.currentTarget.dataset.path + '&img='  +
      e.currentTarget.dataset.img
    })
  },
  musicplay:function(e){
    wx.navigateTo({
      url:'../../pages/musicplay/musicplay?playid=' + 
      e.currentTarget.dataset.id + '&desc=' + 
      e.currentTarget.dataset.desc + '&name=' +
      e.currentTarget.dataset.name + '&path=' +
      e.currentTarget.dataset.path + '&img='  +
      e.currentTarget.dataset.img + '&cate=' +
      e.currentTarget.dataset.cate
    })
  },
  backindex: function () {
    wx.navigateBack();
  }
})