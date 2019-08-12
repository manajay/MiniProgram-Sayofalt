// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[
      {commentId:1,
      comment:"天气真是非常好, 一起出去郊游",
      userId:"xxxxx",
      userName:"张三",
      commentTime:"2019-09-12 10:32",
      type : 1
      },
      {
        commentId: 2,
        comment: "天气真是非常好, 一起出去郊游",
        userId: "xxxxx",
        userName: "张三",
        commentTime: "2019-09-12 10:32",
        type: 0
      },
      {
        commentId: 3,
        comment: "天气真是非常好, 一起出去郊游",
        userId: "xxxxx",
        userName: "张三",
        commentTime: "2019-09-12 10:32",
        type: 0
      },
      {
        commentId: 4,
        comment: "天气真是非常好, 一起出去郊游",
        userId: "xxxxx",
        userName: "张三",
        commentTime: "2019-09-12 10:32",
        type: 1
      },
      
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
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