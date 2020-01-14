import {
  Config
} from '../../utils/config.js';
const app = getApp();

Page({
  data: {
    gridCol: 4,
    baseRes: app.globalData.baseRes,
    PageCur: 'home',
    imgUrls: [],
    readNum:0,
    photoList:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cardNum: 2,
    newsList:[],
    iconList: [{
      icon: '../../images/home_tzgg.png',
      color: 'red',
      badge: 99,
      name: '通知公告'
    }, {
      icon: '../../images/home_djxx.png',
      color: 'orange',
      badge: 1,
        name: '党建学习'
    }, {
      icon: '../../images/home_dyhd.png',
      color: 'yellow',
      badge: 0,
        name: '文件办理'
    }, {
      icon: '../../images/home_wjbl.png',
      color: 'olive',
      badge: 22,
      name: '通知'
    }],
    userInfo:{
      nickName: "",
      avatarUrl: ""
    },
    swiperIndex: 0
  },
  bindchange: function(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  onLoad:function(){
    let that = this;
    that.data.userInfo.avatarUrl = wx.getStorageSync("avatarUrl");
    that.data.userInfo.nickName = wx.getStorageSync("nickName");
    that.setData({
      userInfo: that.data.userInfo
    })
    console.log(1);
  },
  onShow:function(){
    let that= this;
    that.getPhoto();
    that.getReadNum();
    that.getData();
  },

  
  getPhoto:function(){
    let that = this;
    wx.request({
      url: Config.restUrl + 'moment', //仅为示例，并非真实的接口地址
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
          that.data.photoList = res.data.content.photo_list;

          for (let i = 0; i < that.data.photoList.length;i++){
            let times = that.data.photoList[i].release_time;
            let times_arr = times.split("-");
            that.data.photoList[i].year = times_arr[0]
            that.data.photoList[i].mouth = times_arr[1]
          }
          console.log("photoList", that.data.photoList);
          that.setData({
            photoList: that.data.photoList
          })
        }
      }
    })
  },
  getData: function () {
    let that = this;
    wx.request({
      url: Config.restUrl + 'readrotation', //仅为示例，并非真实的接口地址
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
          that.data.imgUrls = res.data.content;
          console.log("img", that.data.imgUrls)
          that.setData({
            imgUrls: that.data.imgUrls
          })
        }
      }
    })

    

    wx.request({
      url: Config.restUrl + 'event',
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
          that.data.newsList = res.data.content;
          if (that.data.newsList.length > 3) {
            that.data.newsList = that.data.newsList.slice(0, 3)
          }

          that.setData({
            newsList: that.data.newsList
          })
        }
      }
    })

    wx.request({
      url: Config.restUrl + 'experience',
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
          that.data.activityList = res.data.content.vr_list;
          if (that.data.activityList.length > 3) {
            that.data.activityList = that.data.activityList.slice(0, 3)
          }

          that.setData({
            activityList: that.data.activityList
          })
        }
      }
    })

    // 获取通知
    wx.request({
      url: Config.restUrl + 'activity',
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
          that.data.huodongList = res.data.content;
          if (that.data.huodongList.length > 5) {
            that.data.huodongList = that.data.huodongList.slice(0, 5)
          }

          that.setData({
            huodongList: that.data.huodongList
          })
        }
      }
    })
  },
  getReadNum:function(){
    let that = this;
    wx.request({
      url: Config.restUrl + 'unreadnotice',
      data: {
        token: wx.getStorageSync("token"),
        action:1
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.status.state == 1000) {
          that.data.readNum = res.data.content
          that.setData({
            readNum: that.data.readNum
          });
        }
      }
    })
  },
  NavChange(e) {
    let value = e.currentTarget.dataset.cur;
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    
  },
  goNotice: function(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    if (index == 0){
      wx.navigateTo({
      url: '../notice/notice',
      })
    } else if (index == 1) { 
      wx.navigateTo({
        url: '../vrStudy/vrStudy',
      })
    }

  }

})