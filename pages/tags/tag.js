// pages/tags/tag.js
const app = getApp()
var Data = require('../../data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTags();
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
  
  },

  getTags: function () {
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    wx.request({
      url: Data.getGhostHost() + '/ghost/api/v2/content/tags/?key=' + Data.getContentKey(),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        that.setData({
          tag_list: res.data.tags,
        });
      }
    })
  },
})