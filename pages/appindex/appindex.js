//获取应用实例  
var app = getApp()
Page({
  data: {
    movies: [
      { url: 'http://img.pems.cn/app/mobile/images/silder_one.jpg' },   
      { url: 'http://img.pems.cn/app/mobile/images/silder_two.jpg' }
    ]
  },
  onLoad: function (options) {
    this.setData({"userid":options.userid});
    wx.setStorage({
      key: "userid",
      data: options.userid
    })
  },
  ganyulist: function (){
    wx.reLaunch({
      url: "../../pages/ganyu/ganyu",
      fuccess: function () { 
        
      },
      fail:function () { 
        
      },
      complete:function () {

      }
   })
  },  
  begintests:function(e){
    var __this = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        __this.setData({
          'userid':res.data
        })
      }
    })
    wx.navigateTo({
      url: "../../pages/begintest/begintest?userid=" + __this.data.userid
    })
  },
  meditation:function(){
    wx.navigateTo({
      url: '../../pages/intervention/intervention?packageid=200000008',
    })
  }
}) 