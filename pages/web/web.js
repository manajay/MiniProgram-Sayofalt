// pages/web.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://mp.weixin.qq.com/',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.url);
    this.setData({
      url: options.url,
    });
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

  webViewLoaded: function () {
    console.log("web 页面加载完成");
    var paras = document.getElementsByClassName('go-back');
    for (i = 0; i < paras.length; i++) {
      //删除元素 元素.parentNode.removeChild(元素);
      if (paras[i] != null)
        paras[i].parentNode.removeChild(paras[i]);
    }
  },
})