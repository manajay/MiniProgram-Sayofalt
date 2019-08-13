// pages/comment/comment.js
var time = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    pageIndex: 1,
    loading: false,
    pullingUp: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 处理数据
    this.loadNewiesPage();
  },

  proccessData() {

    let rawData = [{
      action: null,
      approveId: "13704",
      approveType: 1,
      content: "qqqq",
      createUserId: "A325ACCB789711E998137CD30AEB153E",
      createUserName: "吴彦祖",
      createUserPic: "https://testres.alphalawyer.cn/paralegalInfo/d9b9e54d-262b-4a2a-b28a-448a3d13452c",
      feedType: 1,
      gmtCreate: 1563539393000,
      gmtModified: 1563539393000,
      id: 85568,
      modifyUserId: "A325ACCB789711E998137CD30AEB153E"
    }, {
      action: "REJECT",
      approveId: "13708",
      approveType: 0,
      content: "师倩 驳回了审批",
      createUserId: "273D40BD17A811E9B16C6C92BF4645AC",
      createUserName: "张帆",
      createUserPic: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEYTVhaEcHUlob4n5nWpG9ibULtFrXGb2fdlmFDKibBqWSD5fibWiadsAKotgIvRYmtSPPhvhEH9qLUw/132",
      feedType: 2,
      gmtCreate: 1563538987000,
      gmtModified: 1563538987000,
      id: 85566,
      modifyUserId: "C3095D1F789711E998137CD30AEB153E"
    }, {
      action: null,
      approveId: "2004102",
      approveType: 0,
      content: "我喜欢孔子的入世，入得很清晰，有智慧，含幽默，实实在在不标榜。道家则总有点标榜的味道，从古到今，不断地有人用道家来标榜自己，因为实在是太方便了。",
      createUserId: "C3095D1F789711E998137CD30AEB153E",
      createUserName: "张帆",
      createUserPic: "https://testres.alphalawyer.cn/paralegalInfo/5eff20f7-8bab-4a05-a8a8-f7b47b7474a7",
      feedType: 1,
      gmtCreate: 1563538896000,
      gmtModified: 1563538896000,
      id: 85562,
      modifyUserId: "C3095D1F789711E998137CD30AEB153E"
    }, {
      action: null,
      approveId: "13718",
      approveType: 2,
      content: "你们的",
      createUserId: "A325ACCB789711E998137CD30AEB153E",
      createUserName: "吴彦祖",
      createUserPic: "https://testres.alphalawyer.cn/paralegalInfo/d9b9e54d-262b-4a2a-b28a-448a3d13452c",
      feedType: 1,
      gmtCreate: 1563538882000,
      gmtModified: 1563538882000,
      id: 85561,
      modifyUserId: "A325ACCB789711E998137CD30AEB153E"
    }, {
      action: "PASS",
      approveId: "13308",
      approveType: 0,
      content: "姚俊倩 通过了审批",
      createUserId: "A325ACCB789711E998137CD30AEB153E",
      createUserName: "姚俊倩",
      createUserPic: "http://thirdwx.qlogo.cn/mmopen/vi_32/z1DFvtxIn1Ljjicz0iaxCQzTaOwKzc0AoFGXNQTqxvKqBiaRn8vV75xe6e5UnBlrKoRwjWHZL1JfEtzgqkWm3cmrA/132",
      feedType: 2,
      gmtCreate: 1563538872000,
      gmtModified: 1563538872000,
      id: 85560,
      modifyUserId: "A325ACCB789711E998137CD30AEB153E"
    }, {
      action: null,
      approveId: "13608",
      approveType: 2,
      content: "你们，\n",
      createUserId: "A325ACCB789711E998137CD30AEB153E",
      createUserName: "吴彦祖",
      createUserPic: "https://testres.alphalawyer.cn/paralegalInfo/d9b9e54d-262b-4a2a-b28a-448a3d13452c",
      feedType: 1,
      gmtCreate: 1563538866000,
      gmtModified: 1563538866000,
      id: 85559,
      modifyUserId: "A325ACCB789711E998137CD30AEB153E"
    }, {
      action: "CREATE",
      approveId: "13748",
      approveType: 2,
      content: "吴彦祖 发起了审批",
      createUserId: "A325ACCB789711E998137CD30AEB153E",
      createUserName: "吴彦祖",
      createUserPic: "https://testres.alphalawyer.cn/paralegalInfo/d9b9e54d-262b-4a2a-b28a-448a3d13452c",
      feedType: 2,
      gmtCreate: 1563538816000,
      gmtModified: 1563538816000,
      id: 85557,
      modifyUserId: "A325ACCB789711E998137CD30AEB153E"
    }, {
      action: "RESTART",
      approveId: "309522",
      approveType: 2,
      content: "段连洁 重新发起了审批",
      createUserId: "FA52E663303711E894A4446A2ED9E475",
      createUserName: "段连洁",
      createUserPic: "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epmFf2AaupZwCrRESwNgb6EqKibX13E9Z7icTqV4uEjicnsbqhhgPicD0qjQwoNib3icwPiauic9TFwwiakNrA/132",
      feedType: 1,
      gmtCreate: 1560486210000,
      gmtModified: 1560486210000,
      id: 1252571,
      modifyUserId: "FA52E663303711E894A4446A2ED9E475",
    }];

    var commentList = rawData.map(
      function (item) {
        return {
          action: item.action,
          approveId: item.approveId,
          approveType: item.approveType,
          content: item.content,
          createUserName: item.createUserName,
          createUserPic: item.createUserPic,
          feedType: item.feedType,
          id: Math.random(),
          time: time.formatTimeMDHM(new Date(item.gmtCreate))
        }
      }
    );

    console.log(commentList);

    return commentList;
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
    this.loadNewiesPage();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("底部加载");
    this.loadNextPage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  queryCommentList: function (e) {
    wx.request({
      url: 'https://alphalawyer.cn/appro/api/v1/feeds?approveId=' + '344134' + '&approveType=' + '2004102' + '&orderBy=id&orderType=desc' +
        '&pageIndex=1&pageSize=10',
      success(res) {
        console.log("成功的结果: " + res);
      },
      fail(f) {
        console.log("失败的结果: " + f);
      },
    })
  },

  loadNewiesPage() {
    this.setData({
      loading: true
    });

    var that = this;
    var d = this.proccessData();
    setTimeout(function () {
      // 数据
      that.setData({
        pageIndex: 1,
        comments: d,
        loading: false
      });
      wx.stopPullDownRefresh();
    },
      300);


  },

  loadNextPage() {
    this.setData({
      pullingUp: true
    });

    var that = this;
    var pageIndex = that.data.pageIndex;

    var d = that.proccessData();
    var old = that.data.comments;
    console.log("old 总数: " + old.length);
    d = old.concat(d);

    console.log("new 总数: " + d.length);

    setTimeout(function () {
      // 数据
      that.setData({
        pageIndex: pageIndex + 1,
        comments: d,
        pullingUp: false
      });
    },
      300);
  },
})