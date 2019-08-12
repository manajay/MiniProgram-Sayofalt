//index.js
//获取应用实例
const app = getApp()
var Data = require('../../data.js');

Page({
  data: {
    loading: false,
    userInfo: {},
    page: 1,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    post_list: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    recommend_list: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        loading: false
      })
    } else if (this.data.canIUse) {
      wx.hideTabBar();
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        if (res.userInfo) {
          wx.showTabBar();
        }
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          loading: false,
        });
        let page = 1;
        this.getPages(page);
      }
    } else {
      wx.hideTabBar();
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          if (res.userInfo) {
            wx.showTabBar();
          }
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            loading: false,
          });
          let page = 1;
          this.getPages(page);
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getPages: function (page) {

    if (page == 1) {
      this.setData({
        loading: true,
      });
    }

    var that = this;
    wx.request({
      url: Data.getGhostHost() + '/ghost/api/v2/content/posts/?key=' + Data.getContentKey() + '&limit=10&page=' + page,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // 
        var datas = that.data.post_list;
        var recommends = [];
        if (page == 1) {
          datas = res.data.posts;
          let count = datas.length > 5 ? 5 : datas.length;
          recommends = datas.splice(0, count);
        } else {
          datas = datas.concat(res.data.posts);
        }

        console.log("推荐数量: " + recommends.length);

        let p = page;
        that.setData({
          post_list: datas,
          page: p,
          loading: false,
          recommend_list: recommends,
        });
        wx.stopPullDownRefresh();
      },
      fail(res) {
        wx.stopPullDownRefresh(); 
      }
    })
  },

  showPostDetail(e) {
    let index = e.currentTarget.dataset.index;
    var post = this.data.post_list[index];
    var post_url = post.url
    wx.navigateTo({
      url: '../web/web?url=' + post_url,
      success: function (res) {
        console.log(res);
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  // 分享
  onShareAppMessage(e) {
    if (e.from === "button") {
      console.log("未实现");
      wx.showToast({
        title: '分享未实现',
        icon: 'warn',
      })
    } else {
      return {
        title: 'JAY 站',
        path: '/pages/index/index',
        imageUrl: '/images/tags_01.png',
        success:function (res) {
          wx.showToast({
            title: '分享成功',
            icon: 'success',
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '分享失败',
            icon: 'fail',
          })
        }
      }
    }
  },

  onPullDownRefresh(option) {
    let page = 1;
    this.getPages(page);
  },
  onReachBottom(option) {
    let page = this.data.page + 1;
    this.getPages(page);
  }
})
