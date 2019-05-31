// pages/report/report.js
var WxParse = require('../../wxParse/wxParse.js');
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  touchHandler: function (e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var __this = this;
    wx.request({
      url: getApp().data.servsers +'/user/searchitems?itemid=' + options.testid,
      type:'get',
      success:function(res){
        let report = {
          'data':{
            'data':JSON.parse(res.data[0].genescore),
            'reportImage':res.data[0].report_image,
            'title':res.data[0].title
          },
          'item':{
            'answer':res.data[0].answer,
            'createAt':res.data[0].create_at,
            'genescore':res.data[0].genescore,
            'groupId':res.data[0].group_id,
            'id':options.testid,
            'intervene':res.data[0].intervene,
            'modifyAt':res.data[0].modify_at,
            'questionId':res.data[0].id,
            'removed':res.data[0].removed,
            'reportAt':res.data[0].report_at,
            'testAt':res.data[0].test_at,
            'testCenterId':res.data[0].test_center_id,
            'testStatus':res.data[0].test_status,
            'userId':res.data[0].user_id,
            'version':res.data[0].version,
            'warn':res.data[0].warning
          }
        };

        let newreport = [];
        let newsuggestion = "";
        let newcontent = "";
        for (let i = 0; i <= report.data.data.length; i++) {
          try {    
            if (typeof (report.data.data[i].score) !== "undefined" && typeof (report.data.data[i].score) !== undefined){
              newreport.push(report.data.data[i]);
            }
            if(report.data.data[i].suggestion !== "" && report.data.data[i].suggestion !== undefined && report.data.data[i].suggestion !== "undefined"){
              newsuggestion += report.data.data[i].suggestion;
            }
            if(report.data.data[i].content !== ""  && report.data.data[i].content !== undefined && report.data.data[i].content.length>1 && report.data.data[i].suggestion !== "undefined"){
              if(report.data.data[i].title !== ""){
                newcontent += report.data.data[i].title+'：'+report.data.data[i].content + '<br />';
              }else{
                newcontent += report.data.data[i].content + '<br />';
              }
            };
          }
          catch (err) {
            console.log(err);
          };
        };
        WxParse.wxParse('content', 'html', newcontent, __this, 5);
        //建议
        WxParse.wxParse('suggestion', 'html',newsuggestion, __this, 5);
        const reporting = {
          'appraise': newreport,
          'title':report.data.title,
          'reportImage':report.data.reportImage,
          'cardId':report.card,
          'item':report.item,
          'reportAt': report.item.reportAt.substring(0, 10)
        };
        var appra = JSON.parse(res.data[0].gene)
        //console.log(JSON.parse(res.data[0].gene));
        console.log(res.data[0])
        __this.setData({ 'report': reporting });
      }
    });
    var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        ringChart = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas',
            type: 'ring',
            extra: {
                ringWidth: 25,
                pie: {
                    offsetAngle: -45
                }
            },
            title: {
                name: '70%',
                color: '#7cb5ec',
                fontSize: 25
            },
            subtitle: {
                name: '稳定形',
                color: '#666666',
                fontSize: 15
            },
            series: [{
                name: '成交量1',
                data: 15,
                stroke: false
            }, {
                name: '成交量2',
                data: 35,
                 stroke: false
            }, {
                name: '成交量3',
                data: 78,
                stroke: false
            }, {
                name: '成交量4',
                data: 63,
                 stroke: false
            }],
            disablePieStroke: true,
            width: windowWidth,
            height: 200,
            dataLabel: false,
            legend: false,
            background: '#f5f5f5',
            padding: 0
        });
        ringChart.addEventListener('renderComplete', () => {
            console.log('renderComplete');
        });
        setTimeout(() => {
            ringChart.stopAnimation();
        }, 1000);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e,data) {
    // let report = {"code":0,"data":{"data":[{"ascore":58.91,"content":"","key":"E","score":58.91,"suggestion":"","title":"内外向"},{"ascore":66.5,"content":"","key":"N","score":66.5,"suggestion":"","title":"神经质"},{"ascore":47.43,"content":"","key":"P","score":47.43,"suggestion":"","title":"精神质"},{"ascore":47.44,"content":"","key":"L","score":47.44,"suggestion":"","title":"掩饰性"},{"ascore":17,"content":"<p>\n不稳定型\n</p>\n<p>\n优点：\n</p>\n<p>\n（1）您有自己的一群朋友，事前希望能够有计划；\n</p>\n<p>\n（2）适当的参加社会活动，有时会寻求新鲜刺激，但不愿意随便冒险；\n</p>\n<p>\n（3）通常情况下您可以和他人较好的相处，也能适应周围的环境。\n</p>\n<p>\n缺点：\n</p>\n<p>\n（1）您非常容易焦虑、紧张、发火、报有偏见；\n</p>\n<p>\n（2）对外部刺激的反应都强烈，情绪激发后很难平复下来。\n</p>\n<p>\n（3）因为您的情绪不稳定，稍微遇到一点小的事情，您的心情就会变得比较焦躁不安。\n</p>","key":"type","suggestion":"您需要控制好自己的情绪，保持情绪的稳定性。具体的做法是：理智地分析和处理各种现实刺激和生活事件，适当控制情绪反应，避免过于敏感和情绪化；做自己情绪的主导者，不要被情绪牵着鼻子走，任其泛滥；不良的刺激过后要及时平复自己的情绪，及时总结经验教训，快乐地面对目前的生活和工作，避免不良情的蔓延和持续。","title":""}],"reportImage":["var config = {\n    title : {\n        text : ''\n    },\n    yAxis: {\n        //tickPositions: [0, 1, 2, 4, 80],//指定显示的坐标\n        max: 100,\n        min : 0,\n        gridLineWidth : 0,//表格线\n        minorGridLineWidth: 0, //表格刻度\n        //minorTickInterval: 4,\n        //minorTickWidth: 1,\n        plotBands: [{//黄线\n            color: 'rgba(244,243,151, 1)',\n            width: 2,\n            value: 61.5\n        },{\n            color: 'rgba(244,243,151, 1)',\n            width: 2,\n            value: 38.5\n        },{//红线\n            color: 'rgba(148, 66, 56, 0.4)',\n            width: 2,\n            value: 43.3\n        },{\n            color: 'rgba(148, 66, 56, 0.4)',\n            width: 2,\n            value: 56.7\n        },{//绿线\n            color: 'rgba(97, 187, 100, 0.4)',\n            width: 2,\n            value: 50\n        }]\n    },\n    xAxis: {\n        plotBands: [{\n            color: 'rgba(0, 0, 0, 0.5)',\n            width: 2,\n            value: 0\n        },{\n            color: 'rgba(0, 0, 0, 0.5)',\n            width: 2,\n            value: 1\n        },{//红线\n            color: 'rgba(0, 0, 0, 0.5)',\n            width: 2,\n            value: 2\n        },{\n            color: 'rgba(0, 0, 0, 0.5)',\n            width: 2,\n            value: 3\n        }]\n    }\n\n};\nimage(['E', 'N', 'P', 'L'], 'line', config);","image(['E', 'N'],'coord');"],"title":"艾森克个性问卷（成人版 EPQ）"},"item":{"answer":"[[\"A\"],[\"A\"],[\"A\"],[\"B\"],[\"A\"],[\"A\"],[\"A\"],[\"B\"],[\"B\"],[\"A\"],[\"A\"],[\"A\"],[\"B\"],[\"B\"],[\"A\"],[\"B\"],[\"B\"],[\"A\"],[\"A\"],[\"B\"],[\"B\"],[\"B\"],[\"B\"],[\"B\"],[\"B\"],[\"B\"],[\"B\"],[\"A\"],[\"B\"],[\"B\"],[\"A\"],[\"A\"],[\"A\"],[\"A\"],[\"A\"],[\"B\"],[\"A\"],[\"A\"],[\"A\"],[\"A\"],[\"A\"],[\"A\"],[\"A\"],[\"B\"],[\"B\"],[\"B\"],[\"A\"],[\"A\"],[\"A\"],[\"B\"],[\"A\"],[\"B\"],[\"A\"],[\"B\"],[\"B\"],[\"A\"],[\"A\"],[\"B\"],[\"A\"],[\"B\"],[\"B\"],[\"A\"],[\"B\"],[\"A\"],[\"B\"],[\"A\"],[\"B\"],[\"B\"],[\"A\"],[\"A\"],[\"A\"],[\"B\"],[\"A\"],[\"A\"],[\"A\"],[\"B\"],[\"A\"],[\"A\"],[\"B\"],[\"A\"],[\"B\"],[\"A\"],[\"B\"],[\"A\"],[\"B\"],[\"B\"],[\"B\"],[\"A\"]]","createAt":"2015-02-05 10:13:19","genescore":"[{\"key\":\"E\",\"score\":58.91},{\"key\":\"N\",\"score\":66.5},{\"key\":\"P\",\"score\":47.43},{\"key\":\"L\",\"score\":47.44},{\"key\":\"type\",\"score\":17}]","groupId":0,"id":601166891,"intervene":"N","modifyAt":"2017-08-19 12:42:25","questionId":1002,"removed":"N","reportAt":"2016-04-16 00:00:00","testAt":"2016-04-16 20:35:01","testCenterId":59,"testStatus":"REPORTED","userId":165557,"version":0.0060,"warn":"N"},"msg":"success","testCenterName":"测试平台"};
    // let user = {"appuser":{"age":99,"barCode":"2342345","beginAt":1423065600000,"completed":"Y","consult":"Y","consultStatus":"BUSY","createAt":1359783728000,"dealInfoId":0,"educationType":"UNDERGRADUATE","endAt":1582732800000,"groupUser":false,"id":165557,"income":"THIRTY_TO_FIFTY_HUN","interver":"Y","key":"test","loginName":"12345678","marriage":"MARRIED","modifyAt":1455677508000,"password":"123456","peopleType":"USER","phoneNumber":"","printStatus":"N","removed":"N","reportGenerateType":"INSTANT","sex":"MALE","status":"SERVING","testCenterId":59,"useCount":0,"userName":"李智魁"},"userAttributeList":[],"userConfig":[]};
    // let newreport = [];
    // let newsuggestion = "";
    // let newcontent = "";
    // for (let i = 0; i <= report.data.data.length; i++) {
    //   try {    
    //     if (typeof (report.data.data[i].score) !== "undefined" && typeof (report.data.data[i].score) !== undefined){
    //       newreport.push(report.data.data[i]);
    //     }
    //     if(report.data.data[i].suggestion !== "" && report.data.data[i].suggestion !== undefined && report.data.data[i].suggestion !== "undefined"){
    //       newsuggestion += report.data.data[i].suggestion;
    //     }
    //     if(report.data.data[i].content !== ""  && report.data.data[i].content !== undefined && report.data.data[i].content.length>1 && report.data.data[i].suggestion !== "undefined"){
    //       if(report.data.data[i].title !== ""){
    //         newcontent += report.data.data[i].title+'：'+report.data.data[i].content + '<br />';
    //       }else{
    //         newcontent += report.data.data[i].content + '<br />';
    //       }
    //     };
    //   }
    //   catch (err) {
    //     console.log(err);
    //   };
    // };
    // //评语
    // WxParse.wxParse('content', 'html', newcontent, this, 5);
    // //建议
    // WxParse.wxParse('suggestion', 'html',newsuggestion, this, 5);
    // const reporting = {
    //   'appraise': newreport,
    //   'title':report.data.title,
    //   'reportImage':report.data.reportImage,
    //   'cardId':report.card,
    //   'item':report.item,
    //   'reportAt': report.item.reportAt.substring(0, 10),
    //   'listObject': report.listObject
    // };
    // console.log(reporting);
    // this.setData({'user':user});
    // this.setData({ 'report': reporting });
    // var windowWidth = 320;
    //     try {
    //         var res = wx.getSystemInfoSync();
    //         windowWidth = res.windowWidth;
    //     } catch (e) {
    //         console.error('getSystemInfoSync failed!');
    //     }

    //     ringChart = new wxCharts({
    //         animation: true,
    //         canvasId: 'ringCanvas',
    //         type: 'ring',
    //         extra: {
    //             ringWidth: 25,
    //             pie: {
    //                 offsetAngle: -45
    //             }
    //         },
    //         title: {
    //             name: '70%',
    //             color: '#7cb5ec',
    //             fontSize: 25
    //         },
    //         subtitle: {
    //             name: '稳定形',
    //             color: '#666666',
    //             fontSize: 15
    //         },
    //         series: [{
    //             name: '成交量1',
    //             data: 15,
    //             stroke: false
    //         }, {
    //             name: '成交量2',
    //             data: 35,
    //              stroke: false
    //         }, {
    //             name: '成交量3',
    //             data: 78,
    //             stroke: false
    //         }, {
    //             name: '成交量4',
    //             data: 63,
    //              stroke: false
    //         }],
    //         disablePieStroke: true,
    //         width: windowWidth,
    //         height: 200,
    //         dataLabel: false,
    //         legend: false,
    //         background: '#f5f5f5',
    //         padding: 0
    //     });
    //     ringChart.addEventListener('renderComplete', () => {
    //         console.log('renderComplete');
    //     });
    //     setTimeout(() => {
    //         ringChart.stopAnimation();
    //     }, 1000);
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