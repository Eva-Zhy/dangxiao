import {
  Config
} from '../../utils/config.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    userInfo:null,
    check: false,
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;

    if (wx.getStorageSync('token') != "" && wx.getStorageSync('token') != null && wx.getStorageSync('token') != undefined) {
      // 登录
      // that._login();

      wx.request({
        url: Config.restUrl + 'verificatoken', //仅为示例，并非真实的接口地址
        data: {
          token: wx.getStorageSync('token')
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res);
          if (res.data.status.state == 1000) {
            wx.redirectTo({
              url: '../index/index',
            })
          } else {
            that._login();
          }
        }
      })
    } else {
      that._login();
    }


    console.log(wx.getStorageSync('username'));
    console.log(wx.getStorageSync('password'));
    console.log(wx.getStorageSync('1password'));
    if (wx.getStorageSync('username') != '' && wx.getStorageSync('password') != '') {
      that.data.username = wx.getStorageSync('username');
      that.data.password = wx.getStorageSync('password');
      console.log(that.data.password)
      that.setData({
        check: true,
        password: that.data.password,
        username: that.data.username
      })
    }
  },
  login: function() {
    let that = this;
    console.log(wx.getStorageSync('token'));
    that._login();
  },
  _login: function() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              that.data.userInfo = res.userInfo;
              
              if (that.data.username == "") {
                wx.showToast({
                  title: '请输入用户名',
                  icon: 'none',
                  duration: 2000
                })
              } else if (that.data.password == "") {
                wx.showToast({
                  title: '请输入密码',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                wx.showLoading({
                  title: '加载中',
                })
                wx.request({
                  url: Config.restUrl + 'login', //仅为示例，并非真实的接口地址
                  data: {
                    username: that.data.username,
                    password: that.data.password,
                    action: 0
                  },
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  success(res) {
                    wx.hideLoading()
                    console.log(res.data)
                    if (res.data.status.state == 1000) {
                      wx.setStorageSync('token', res.data.content.token);
                      if (that.data.check) {
                        wx.setStorageSync('username', that.data.username);
                        wx.setStorageSync('password', that.data.password);
                      } else {
                        wx.setStorageSync('username', '');
                        wx.setStorageSync('password', '');
                      }

                      that.saveUserInfo();


                      wx.redirectTo({
                        url: '../index/index',
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  saveUserInfo: function() {
    let that = this;
    wx.request({
      url: Config.restUrl + 'wechatinfo', //仅为示例，并非真实的接口地址
      data: {
        token: wx.getStorageSync('token'),
        wechat_name: that.data.userInfo.nickName,
        wechat_headimage: that.data.userInfo.avatarUrl
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.setStorageSync("nickName", that.data.userInfo.nickName);
        wx.setStorageSync("avatarUrl", that.data.userInfo.avatarUrl);
      }
    })
  },
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  niming: function(e) {
    console.log(e);
    if (e.detail.value.length == 0) {
      this.data.check = false
    } else {
      this.data.check = true
    }
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