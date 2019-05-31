// pages/login/login.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden:true
  },
  login:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit: function (e) {
      var subValue = e.detail.value
      var __this = this;
      if (subValue.user == null || subValue.user == "" ) {
        __this.setData({ popErrorMsg: "用户名不能为空！", shows:"visible" });
        __this.ohShitfadeOut();
        return;
      }else if (subValue.password == null || subValue.password == "") {
        __this.setData({ popErrorMsg: "密码不能为空！", shows: "visible" });
        __this.ohShitfadeOut();
        return;
      }else{
          wx.request({
            url: getApp().data.servsers+'/user/login',
          data: {'loginName':e.detail.value.user, 'password':e.detail.value.password},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res);
            if(res.data.code != 0){
              __this.setData({ popErrorMsg: res.data.msg, shows: "visible" });
              __this.ohShitfadeOut();
              return;
            }else{
              __this.setData({hidden:false});
              wx.reLaunch({
                url: "../../pages/appindex/appindex?userid="+res.data.user_id,
              });
            }
          }
        })
      }
  },
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' ,shows:"hidden"});
      clearTimeout(fadeOutTimeout);
    }, 2000);
  }, 
  onLoad: function (options) {
  
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
  
  }
})