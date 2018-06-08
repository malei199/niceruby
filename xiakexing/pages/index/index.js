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
    list2H3: '9000',
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
    proList: {
      data: [{
          proName: '融创金成未来海',
          proImg: 'http://huicye.image.alimmdn.com/upfile/proImg.png',
          address: '浙江 杭州 余杭 西溪',
          proType: '住宅',
          proPrice: '23000 元/m²',
          proAdm: '观塘地产  沈经理',
          minPrice: '25000-50000'
        }, {
          proName: '融创金成未来海',
          proImg: 'http://huicye.image.alimmdn.com/upfile/proImg.png',
          address: '浙江 杭州 余杭 西溪',
          proType: '住宅',
          proPrice: '23000 元/m²',
          proAdm: '观塘地产  沈经理',
          minPrice: '25000-50000'
        },
        {
          proName: '融创金成未来海',
          proImg: 'http://huicye.image.alimmdn.com/upfile/proImg.png',
          address: '浙江 杭州 余杭 西溪',
          proType: '住宅',
          proPrice: '23000 元/m²',
          proAdm: '观塘地产  沈经理',
          minPrice: '25000-50000'
        }, {
          proName: '融创金成未来海',
          proImg: 'http://huicye.image.alimmdn.com/upfile/proImg.png',
          address: '浙江 杭州 余杭 西溪',
          proType: '住宅',
          proPrice: '23000 元/m²',
          proAdm: '观塘地产  沈经理',
          minPrice: '25000-50000'
        },
      ]
    },
    hasUserInfo: false,
  },
  //事件处理函数
  onLoad: function () {

  },
})