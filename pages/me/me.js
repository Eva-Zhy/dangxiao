// pages/me/me.js
Component({
  options: {
    addGlobalClass: true,
  },
  properties:{
    readNum:{
      type: String,//类型
      value: ""//默认值
    },
    userInfo:{
      type: Object,//类型
      value: {}//默认值
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  methods:{
    goFile: function () {
      wx.navigateTo({
        url: '../handleFile/handleFile',
      })
    },
    goQuestion: function () {
      wx.navigateTo({
        url: '../question/question',
      })
    },
    goFeedback: function () {
      wx.navigateTo({
        url: '../feedback/feedback',
      })
    },
    goMyMessage: function () {
      wx.navigateTo({
        url: '../myMessage/myMessage',
      })
    },
  }
})