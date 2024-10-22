//index.js
//获取应用实例
const app = getApp()
const api = require('../../service/ApiService').default;
const FakeTagAll = require('../../service/ApiService').FakeTagAll;
const PAGE_FIRST = 1;

Page({
  data: {
    motto: 'Hello World!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tag_list:[],
    latestTag: null,
    post_list:[],
    page: 1,
    loadingMore: false,
    hasMore: false,
    hasReachFinalPost: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('home page onload');
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
    this.prepareFirstPage();
  },

    /** 下拉刷新 */
    onPullDownRefresh: function() {
      console.log('onPullDownRefresh');
      var that = this;
      var page = PAGE_FIRST;
      this.getPages(page, () => {
        that.setData({
          page: page,
        });
      }, null, () => {
        wx.stopPullDownRefresh()
      });
    },

    onReachBottom: function() {
      console.log('onReachBottom:', this.data.hasMore);
      if (!this.data.hasMore) {
        return
      }
      var that = this;
      this.setData({
        loadingMore: true
      });
      var next = this.data.page + 1;
      this.getPages(next, () => {
        that.setData({
          page: next
        });
      }, null, () => {
        that.setData({
          loadingMore: false
        });
      });
    },

    prepareFirstPage: function() {
      this.onPullDownRefresh();
      this.getTags();
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

  getPages: function(page, success, fail, complete) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var tags = undefined;
    if (!!this.data.latestTag && this.data.latestTag.name !== '全部') {
      tags = this.data.latestTag.name;
    }
    api.getLatestBlog(page, tags).then((res) => {
      that.hanleData(page, res);
      wx.hideLoading()
      success?.();
      complete?.();
    }).catch((err) => {
      console.log('err' + err);
      wx.hideLoading()
      fail?.(err);
      complete?.();
    });
  },

  getTags: function(page, success, fail, complete) {
    var that = this;
    api.getTags().then((res) => {
      console.log('tag_list: ', res.data.length);
      that.setData({
        tag_list: [FakeTagAll].concat(res.data),
        latestTag: FakeTagAll
      });
      success?.();
      complete?.();
    }).catch((err) => {
      console.log('err' + err);
      fail?.(err);
      complete?.();
    });
  },

  hanleData: function (page, res) {
    var posts = res.data;
    posts.forEach((item) => {
      item.publishedTimeText = item.published_at.slice(0,10);
    });
    let pages = res.meta.pagination.pages;
    let hasMore = page < pages;
    let hasReachFinalPost = page === 1 ? false : !hasMore; // 首页强制不展示
    console.log(`[page]: ${page}, [pages]: ${pages} [posts]: ${ posts.length}, [hasMore]: ${hasMore}`);
    let curPostList = page === 1 ? posts : this.data.post_list.concat(posts);
    this.setData({
      post_list: curPostList,
      hasMore: hasMore,
      hasReachFinalPost: hasReachFinalPost,
    });
  },

  changeTabs: function(event) {
    console.log('changeTabs: ', event.detail);
    var latestTag = FakeTagAll;
    if (!!event.detail.currentIndex && !!this.data.tag_list && event.detail.currentIndex < this.data.tag_list) {
      latestTag = this.data.tag_list[event.default.currentIndex]
    }
    this.setData({
      latestTag: latestTag
    });
  },

  enterDetail: function(event) {
    let item = event.currentTarget.dataset.item;
    var url = '../detail/detail?id=' + item.id;
    if (item?.html) {
      url += '&html=' + encodeURIComponent(item?.html)
    }
    if (item?.feature_image) {
      url += '&feature_image=' + item.feature_image ?? ''
    }
    if (item?.title) {
      url += '&title=' + item.title;
    }
    wx.navigateTo({
      url: url,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      },
      fail: function(err) {
        console.log('enter detail fail: ', err);
      }
    })
  }
})
