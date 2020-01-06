// pages/CircleFriends/CircleFriends.js
var app = getApp()
var that

Page({
  /**
   * 页面的初始数据
   */
  data: {
    DataSource: [1],
    name: "党员001",
    time: "2019年12月21日",
    icon: '../../images/image_1.png',
    content: '9月25日下午，自治区党委书记、人大常委会主任李纪恒在呼和浩特看望慰问',
 
    // photoWidth: wx.getSystemInfoSync().windowWidth / 5,
    photoWidth: 88,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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