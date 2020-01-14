import {
  Config
} from '../../../utils/config.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: null,
    imgList: [],
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  sure(){
    let that = this;
    
    console.log(that.data.textareaAValue);
    // wx.request({
    //   url: Config.restUrl + 'addfreepic', //仅为示例，并非真实的接口地址
    //   data: {
    //     token: wx.getStorageSync('token'),
    //     text: that.data.textareaAValue
    //   },
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     if (res.data.status.state == 1000) {
       
    //     }
    //   }
    // })
    console.log(that.data.imgList[0]);
    wx.uploadFile({
      url: Config.restUrl + 'addmoment', //仅为示例，非真实的接口地址
      filePath: that.data.imgList[0],
      name: 'file_image',
      formData: {
        token: wx.getStorageSync('token'),
        text: that.data.textareaAValue
      },
      success(res) {
        const data = res.data
      }
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除该照片？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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