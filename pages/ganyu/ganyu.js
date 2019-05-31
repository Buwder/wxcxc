//获取应用实例  
var app = getApp();
Page({
  onLoad:function(){
    var __this = this;
    wx.request({
      url: getApp().data.servsers +'/user/searchpack',
      header: {
        'content-type': 'application/json'
      },
      type: 'get',
      success: function (res) {
        __this.setData({
          'ganyulistarray':res.data
        });
      }
    });
   
  },
  ganyulinks: function (e) {
    wx.navigateTo({
      url: '../../pages/intervention/intervention?packageid=' + e.currentTarget.dataset.id,
    })
  },
  backindex:function(){
    wx.navigateBack();
  }
}) 
