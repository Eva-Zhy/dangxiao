const app = getApp()
Page({
  data: {
    gridCol: 4,
    baseRes: app.globalData.baseRes,
    imgUrls: ["https://www.jwnice.com/h5/360/banner_2.png", "https://www.jwnice.com/h5/360/banner_2.png", "https://www.jwnice.com/h5/360/banner_2.png"],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cardNum: 2,
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
    swiperIndex: 0
  },
  bindchange: function(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

})