// pages/detail.ts

import { GhostHost } from "../../service/const";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    html:'',
    feature_image: undefined,
    title: undefined,
    domain: GhostHost
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let html = decodeURIComponent(options?.html ?? '');
    let feature_image = options?.feature_image ?? ''
    let title = options?.title ?? '';
    console.log('enter detail: ', title);
    this.setData({
      html,
      feature_image,
      title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})