//logs.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    hidden: false,
    sexhide: 'inline-block',
    sexshow: 'none',
    usersex:'',
    usersexs:'usersex',
    marriagehide: 'inline-block',
    marriageshow: 'none',
    usermarriage:'',
    usermarriages:'usermarriage',
    educationhide: 'inline-block',
    educationshow: 'none',
    userEducation:'',
    userEducations:'userEducation',
    incomehide: 'inline-block',
    incomeshow: 'none',
    userEnumIncome:'',
    userEnumIncomes:'userEnumIncome',
    userInfo: {},
    casArray: ['男', '女'], 
    EnumMarriageArray: ['已婚', '未婚', '其它'],
    EnumEducationType: ['初中及以下', '高中', '大专', '本科', '硕士', '博士'],
    EnumIncome: ['1000元以下', '1000-2000元', '2000-3000元', '3000-5000元', '5000元以上']
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  bindCasPickerChangesex: function (e) {
    this.setData({
      casIndex: e.detail.value,
      sexhide: 'none',
      sexshow: 'inline-block',
      usersexs:'',
      usersex:'usersex'
    })
  },
  bindCasPickerChangeEnumMarriage: function (e) {
    this.setData({
      EnumMarriageindex: e.detail.value,
      marriagehide: 'none',
      marriageshow: 'inline-block',
      usermarriage:'usermarriage',
      usermarriages:'',
    })
  },
  bindCasPickerChangeEnumEducationType: function (e) {
    this.setData({
      EnumEducationTypeindex: e.detail.value,
      educationhide: 'none',
      educationshow: 'inline-block',
      userEducation:'userEducation',
      userEducations:'',
    })
  },
  bindCasPickerChangeEnumIncome: function (e) {
    this.setData({
      EnumIncomeindex: e.detail.value,
      incomehide: 'none',
      incomeshow: 'inline-block',
      userEnumIncome:'userEnumIncome',
      userEnumIncomes:'',
    })
  },
  formSubmit: function (e) {
    var __this = this;
    for(var i in __this.data.userinfo.EnumSex){
      if(__this.data.userinfo.EnumSex[i].title == e.detail.value.usersex){
        e.detail.value.usersex = __this.data.userinfo.EnumSex[i].value
      }
    }
    for(var i in __this.data.userinfo.EnumMarriage){
      if(__this.data.userinfo.EnumMarriage[i].title == e.detail.value.usermarriage){
        e.detail.value.usermarriage = __this.data.userinfo.EnumMarriage[i].value
      }
    }
    for(var i in __this.data.userinfo.EnumIncome){
      if(__this.data.userinfo.EnumIncome[i].title == e.detail.value.userEnumIncome){
        e.detail.value.userEnumIncome = __this.data.userinfo.EnumIncome[i].value
      }
    }
    for(var i in __this.data.userinfo.EnumEducationType){
      if(__this.data.userinfo.EnumEducationType[i].title == e.detail.value.userEducation){
        e.detail.value.userEducation = __this.data.userinfo.EnumEducationType[i].value
      }
    }
    __this.setData({ hidden: false });
    wx.request({
      url: getApp().data.servsers +'/user/savememberinfo',
      data:e.detail.value,
      method:'get',
      header: {'content-type': 'application/json'},
      success:function(data){
        __this.setData({ hidden: true });
        if(data.data.code == 0){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
          });
        }else{
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  onLoad: function () {
    var __this = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: getApp().data.servsers +'/user/memberinfo?userid='+res.data,
          success: function (res) {
            const userinfos = res.data[0];
            const enumJson = { "EnumMarriage": { "MARRIED": { "title": "已婚", "value": "MARRIED" }, "UNMARRIED": { "title": "未婚", "value": "UNMARRIED" }, "OTHER": { "title": "其它", "value": "OTHER" } }, "EnumSex": { "MALE": { "title": "男", "value": "MALE" }, "FEMALE": { "title": "女", "value": "FEMALE" } }, "EnumIncome": { "BELOW_TEN_HUN": { "title": "1000元以下", "value": "BELOW_TEN_HUN" }, "TEN_TO_TWENTY_HUN": { "title": "1000-2000元", "value": "TEN_TO_TWENTY_HUN" }, "TWENTY_TO_THIRTY_HUN": { "title": "2000-3000元", "value": "TWENTY_TO_THIRTY_HUN" }, "THIRTY_TO_FIFTY_HUN": { "title": "3000-5000元", "value": "THIRTY_TO_FIFTY_HUN" }, "ABOVE_FIFTY_HUN": { "title": "5000元以上", "value": "ABOVE_FIFTY_HUN" } }, "EnumEducationType": { "JUNIOR": { "title": "初中及以下", "value": "JUNIOR" }, "SENIOR": { "title": "高中", "value": "SENIOR" }, "COLLEGE": { "title": "大专", "value": "COLLEGE" }, "UNDERGRADUATE": { "title": "本科", "value": "UNDERGRADUATE" }, "MASTER": { "title": "硕士", "value": "MASTER" }, "DOCTOR": { "title": "博士", "value": "DOCTOR" } } };
            __this.setData({
              "commeninfo": enumJson
            });
            __this.setData({
              'commenuserinfo': userinfos
            });
            const newuserinfo = Object.assign(__this.data.commeninfo, __this.data.commenuserinfo);
             __this.setData({ 'userinfo': newuserinfo });
          }
        })
      }
    })
    var __this = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      __this.setData({
        userInfo: userInfo
      });
      __this.setData({ hidden: true });
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})