import {
  Config
} from '../../utils/config.js';
const app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  new:function(){
    wx.navigateTo({
      url: './new/new',
    })
  },
  goInfo:function(e){
    let value = JSON.stringify(e.currentTarget.dataset.value);
    wx.navigateTo({
      url: './info/info?value=' + value,
    })
  },
  getList: function(){
    let that = this;
    wx.request({
      url: Config.restUrl + 'feedback', //仅为示例，并非真实的接口地址
      data: {
        token: wx.getStorageSync("token")
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
    this.getList();
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