// pages/CircleFriends/CircleFriends.js
// pages/vrStudy/vrStudy.js
import {
  Config
} from '../../utils/config.js';
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // DataSource: [1],
    showBtn: false,
    inputShowed:false,
    sendMessage:'',
    name: "党员001",
    time: "2019年12月21日",
    icon: '../../images/image_1.png',
    content: '9月25日下午，自治区党委书记、人大常委会主任李纪恒在呼和浩特看望慰问',
 
    // photoWidth: wx.getSystemInfoSync().windowWidth / 5,
    photoWidth: 88,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getList()
  },
  sendInput: function (e) {
    this.setData({
      sendMessage: e.detail.value
    })
  },
  send:function(){
    let that = this;
    console.log(that.data.sendMessage);
    wx.request({
      url: Config.restUrl + 'feedback', //仅为示例，并非真实的接口地址
      data: {
        token: wx.getStorageSync('token'),
        action:1,
        feedback_id: that.data.feedback_id,
        feedback: that.data.sendMessage
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.status.state == 1000) {
          that.getList()
        }
      }
    })
  },
  getList: function(){
    let that = this;
    wx.request({
      url: Config.restUrl + 'readface', //仅为示例，并非真实的接口地址
      data: {
        token: wx.getStorageSync('token')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.status.state == 1000) {
          that.data.list = res.data.content;
          that.data.sendMessage = "";
          that.data.inputShowed = false;
          that.data.showBtn = false;
          that.setData({
            sendMessage: "",
            showBtn: false,
            inputShowed: false,
            list: that.data.list
          });
          that.getList();
        }
      }
    })
  },
  huifu:function(e){
    console.log(e);
    this.data.showBtn = true;
    this.data.inputShowed = true;
    this.data.feedback_id = e.currentTarget.dataset.id;
    this.setData({
      showBtn: this.data.showBtn,
      inputShowed: this.data.inputShowed
    })
  },
  // 点击图片进行大图查看
  LookPhoto: function (e) {
    console.log(e.currentTarget.dataset.photurl);
    console.log(this.data.resource);
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls: this.data.resource,
    })
  },

  // 点击点赞的人
  TouchZanUser: function (e) {
    wx.showModal({
      title: e.currentTarget.dataset.name,
      showCancel: false
    })
  },

  // 删除朋友圈
  delete: function () {
    wx.showToast({
      title: '删除成功',
    })
  },

  // 点击了点赞评论
  TouchDiscuss: function (e) {
    // this.data.isShow = !this.data.isShow
    // 动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0,
    })

    if (that.data.isShow == false) {
      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: true
      })

      // 0.3秒后滑动
      setTimeout(function () {
        animation.width(0).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)
    } else {
      // 0.3秒后滑动
      setTimeout(function () {
        animation.width(120).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)

      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: false
      })
    }
  }
})