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
     icon: '../../../images/image_1.png',
     content: '1.发展基层民主，保障人民享有切实的民主权利，是我国发展社会主义民主政治的重要内容。' +
       '2.发展基层民主，实行村民自治和城市居民自治，以保证人民群众依法直接行使民主权利，管理基层公共事务和公益事业，是人民当家作主的最有效途径。',
     resource: ['https://www.jwnice.com/h5/360/banner_2.png',
       'https://www.jwnice.com/h5/360/banner_2.png'
     ],
     // photoWidth: wx.getSystemInfoSync().windowWidth / 5,
     photoWidth: 88,
     userInfo: {
       nickName: "",
       avatarUrl: ""
     },
     value:{}
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     let that = this;
     that.data.value = JSON.parse(options.value);
     console.log(that.data.value);

     that.data.userInfo.avatarUrl = wx.getStorageSync("avatarUrl");
     that.data.userInfo.nickName = wx.getStorageSync("nickName");
     that.setData({
       userInfo: that.data.userInfo
     })

     that.setData({
       value: that.data.value
     })
   },
   // 点击图片进行大图查看
   LookPhoto: function(e) {
     console.log(e.currentTarget.dataset.photurl);
     console.log(this.data.resource);
     wx.previewImage({
       current: e.currentTarget.dataset.photurl,
       urls: this.data.resource,
     })
   },

   // 点击点赞的人
   TouchZanUser: function(e) {
     wx.showModal({
       title: e.currentTarget.dataset.name,
       showCancel: false
     })
   },

   // 删除朋友圈
   delete: function() {
     wx.showToast({
       title: '删除成功',
     })
   },

   // 点击了点赞评论
   TouchDiscuss: function(e) {
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
       setTimeout(function() {
         animation.width(0).opacity(1).step()
         that.setData({
           animation: animation.export(),
         })
       }, 100)
     } else {
       // 0.3秒后滑动
       setTimeout(function() {
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