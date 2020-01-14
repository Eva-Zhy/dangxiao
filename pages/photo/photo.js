// pages/photo/photo.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    userInfo:{
      type:Object,
      value:[]
    },
    photoList: {
      type: Array,//类型
      value: []//默认值
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  methods: {
    goNew: function () {
      wx.navigateTo({
        url: '../photo/editor/editor',
      })
    },

    goInfo: function (e) {
      let value = JSON.stringify(e.currentTarget.dataset.value);
      wx.navigateTo({
        url: '../photo/info/info?value=' + value,
      })
    }
  }
})