import {
  Config
} from '../../utils/config.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    inputShowed:false,
    sendMessage:"",
    showBtn:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getList();
  },
  sendInput: function (e) {
    this.setData({
      sendMessage: e.detail.value
    })
  },
  send: function () {
    let that = this;
    console.log(that.data.sendMessage);
    wx.request({
      url: Config.restUrl + 'addfile', //仅为示例，并非真实的接口地址
      data: {
        token: wx.getStorageSync('token'),
        action: 1,
        file_id: that.data.file_id,
        opinion: that.data.sendMessage
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.status.state == 1000) {

        }
      }
    })
  },
  showInput:function(e){
    this.data.showBtn = true;
    this.data.inputShowed = true;
    this.data.file_id = e.currentTarget.dataset.id;
    this.setData({
      showBtn: this.data.showBtn,
      inputShowed: this.data.inputShowed
    })
  },
  getList:function(){
    let that = this;
    wx.request({
      url: Config.restUrl + 'smallfile', //仅为示例，并非真实的接口地址
      data: {
        token: wx.getStorageSync("token"),
        action:0
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.status.state == 1000) {
          that.data.list = res.data.content;
          that.setData({
            list: that.data.list
          })
        }
      }
    })
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