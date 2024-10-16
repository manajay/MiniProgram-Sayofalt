//index.js
//获取应用实例
const app = getApp()
const api = require('../../service/ApiService').default;

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
  onReady: function() {
  },
  // MARK: Private
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
    api.getLatestBlog().then((posts) => {
      console.log('posts: ' + posts.length);
      that.setData({
        post_list: posts,
      });
    }).catch((err) => {
      console.log('err' + err);
    });
  },

  enterDetail: function(event) {
    console.log('enter detail: ', event.currentTarget.dataset.item.title);
    let item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url:'../detail/detail?id=' + item.id + '&html=' + encodeURIComponent(item?.html),
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      },
      fail: function(err) {
        console.log('enter detail fail: ', err);
      }
    })
  }
})
