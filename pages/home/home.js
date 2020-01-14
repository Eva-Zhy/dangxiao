const app = getApp()
Component({ 
  options: {
    addGlobalClass: true,
  },
  properties: {
    imgUrls: {
      type: Array,//类型
      value: []//默认值
    },
    newsList: {
      type: Array,//类型
      value: []//默认值
    },
    huodongList: {
      type: Array,//类型
      value: []//默认值
    },
    activityList: {
      type: Array,//类型
      value: []//默认值
    }
  },
  data: {
    gridCol: 4,
    baseRes: app.globalData.baseRes,
    PageCur: 'home',
  
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cardNum: 2,
    iconList: [{
      icon: '../../images/home_tzgg.png',
      color: 'red',
      badge: 0,
      name: '通知公告'
    }, {
      icon: '../../images/home_djxx.png',
      color: 'orange',
      badge: 0,
      name: '党建学习'
    }, {
      icon: '../../images/home_dyhd.png',
      color: 'yellow',
      badge: 0,
      name: '党员活动'
    }, {
      icon: '../../images/home_wjbl.png',
      color: 'olive',
      badge: 0,
      name: '文件办理'
    }],
    swiperIndex: 0
  },
 
  // onLoad: function (options) {
  //   let that = this;
  //   console.log(1)
  //   that.getSwiper()
  // },
  
  methods:{
    goHuodong:function(e){
      console.log(123);
      let value = JSON.stringify(e.currentTarget.dataset.value);
      wx.navigateTo({
        url: '../activity/info/info?value=' + value,
      })
    },
    bindchange: function (e) {
      this.setData({
        swiperIndex: e.detail.current
      })
    },
    goNewsInfo:function(e){
      console.log(e);
      let type = 1;
      let value = JSON.stringify(e.currentTarget.dataset.value);
      wx.navigateTo({
        url: '../notice/info/info?type=' + type + '&value=' + value,
      })
    },
    goNews: function(){
      wx.navigateTo({
        url: '../notice/notice?index=1',
      })
    },
    goVR:function(){
      wx.navigateTo({
        url: '../vrStudy/vrStudy',
      })
    },
   
    goNotice: function (e) {
      console.log(e);
      let index = e.currentTarget.dataset.index;
      if (index == 0) {
        wx.navigateTo({
          url: '../notice/notice?index=0',
        })
      } else if (index == 1) {
        wx.navigateTo({
          url: '../vrStudy/vrStudy',
        })
      } else if (index == 2) {
        wx.navigateTo({
          url: '../activity/activity',
        })
      } else if (index == 3) {
        wx.navigateTo({
          url: '../readFile/readFile',
        })
      }
    }
  }
})

