// pages/begintest/begintest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var __this = this;
    if(options.userid == "undefined" || options.userid == undefined){
      wx.getStorage({
        key: 'userid',
        success: function(res) {
        } 
      })
    }
    wx.request({
      url: getApp().data.servsers +'/user/userinfos?userid=' + options.userid,
      success: function (data) {
        __this.setData({"infolist": data})
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.setData({
    //   "userinfo":userinfo
    // });
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
    wx.stopPullDownRefresh()
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
  begintest:function(e){
    wx.navigateTo({
      url: '../../pages/testbegin/testbegin?itemid=' + e.currentTarget.dataset.id
    })
  },
  begintestreport:function(e){
    wx.navigateTo({
      url: '../../pages/webreport/webreport?itemid=' + e.currentTarget.dataset.id
    })
  }
})