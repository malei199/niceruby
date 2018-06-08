//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isNoClock: 1,
    minNavList: [{
        img: '../../images/index_nav_icon_1.png',
        text: '抢客户'
      },
      {
        img: '../../images/index_nav_icon_2.png',
        text: '代理项目'
      },
      {
        img: '../../images/index_nav_icon_3.png',
        text: '附近项目'
      },
      {
        img: '../../images/index_nav_icon_4.png',
        text: '附近中介'
      },
      {
        img: '../../images/index_nav_icon_5.png',
        text: '大宗物业'
      },
    ],
    list1H3: '7000',
    payList: {
      gradeName: ['', 'A级意向', 'B级意向', 'C级意向'],
      data: [{
        grade: 1,
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }, {
        grade: 2,
        title: '需求项目: 这个名字应该很长很长很长很长',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '30',
      }, {
        grade: 3,
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }]
    },

    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})