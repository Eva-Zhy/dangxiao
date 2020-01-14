import {
  Config
} from '../../utils/config.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabValue: ["政策文件", "时事动态", "公告信息", "文件库"],
    TabCur: 0,
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    scrollLeft: 0
  },
  preview(e) {
    let that = this;
    console.log(e)
    let pdf = e.currentTarget.dataset.value.file_path;
    console.log(pdf);
    wx.downloadFile({
      url: pdf,
      success: function(res) {
        console.log(res)
        var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
        that.webview = Path
        wx.openDocument({
          filePath: Path,
          success: function(res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  goInfo(e) {
    console.log(e);
    let type = e.currentTarget.dataset.type;
    let value = JSON.stringify(e.currentTarget.dataset.value);
    wx.navigateTo({
      url: './info/info?type=' + type + '&value=' + value,
    })
  },
  goMsgInfo(e) {
    console.log(e);
    let type = e.currentTarget.dataset.type;
    let value = JSON.stringify(e.currentTarget.dataset.value);
    wx.navigateTo({
      url: './info/info?type=' + type + '&value=' + value,
    })
  },
  tabSelect(e) {
    let now_index = e.currentTarget.dataset.id
    console.log(now_index)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      TabCur: options.index
    })
    this.getList()
  },
  getList: function() {
    let that = this;
    wx.request({
      url: Config.restUrl + 'document', //仅为示例，并非真实的接口地址
      data: {
        token: wx.getStorageSync('token'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.status.state == 1000) {
          that.data.list1 = res.data.content;
          that.setData({
            list1: that.data.list1
          })
        }
      }
    })
    // 事实动态
    wx.request({
      url: Config.restUrl + 'event', //仅为示例，并非真实的接口地址
      data: {
        token: wx.getStorageSync('token'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.status.state == 1000) {
          that.data.list2 = res.data.content;
          that.setData({
            list2: that.data.list2
          })
        }
      }
    })
    // 公告信息
    wx.request({
      url: Config.restUrl + 'notice', //仅为示例，并非真实的接口地址
      data: {
        token: wx.getStorageSync('token'),
        action: 0
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.status.state == 1000) {
          that.data.list3 = res.data.content;
          that.setData({
            list3: that.data.list3
          })
        }
      }
    })
    // 文件库
    wx.request({
      url: Config.restUrl + 'attachment', //仅为示例，并非真实的接口地址
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
          that.data.list4 = res.data.content;
          that.setData({
            list4: that.data.list4
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})