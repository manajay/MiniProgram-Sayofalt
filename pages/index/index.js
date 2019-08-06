//index.js
//获取应用实例
const app = getApp()
var Data = require('../../data.js');

Page({
  data: {
    motto: 'Hello World!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    post_list:[],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  // 获取首页
    this.getPages();
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getPages: function() {
    var that = this;

    wx.request({
      url: Data.getGhostHost() + '/ghost/api/v2/content/posts/?key=' + Data.getContentKey(),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          post_list: res.data.posts,
        });
      }
    })
  },
  
  showPostDetail(e){
    let index = e.currentTarget.dataset.index;
    var post = this.data.post_list[index];
    var post_url = post.url
    wx.navigateTo({
      url: '../web/web?url=' + post_url,
      success: function(res){
        console.log(res);
      },
      fail: function(){

      },
      complete: function() {

      }
    })
  },
})
