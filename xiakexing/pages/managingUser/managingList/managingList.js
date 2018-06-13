//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    list: {
      gradeName: ['', 'A级意向', 'B级意向', 'C级意向'],
      data: [{
        grade: 1,
        id: '这个是id',
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }, {
        grade: 2,
        id: '这个是id',
        title: '需求项目: 这个名字应该很长很长很长很长',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '30',
      }, {
        grade: 3,
        id: '这个是id',
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }, {
        grade: 3,
        id: '这个是id',
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }, {
        grade: 3,
        id: '这个是id',
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }, {
        grade: 3,
        id: '这个是id',
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }, {
        grade: 3,
        id: '这个是id',
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }, {
        grade: 3,
        id: '这个是id',
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }, {
        grade: 3,
        id: '这个是id',
        title: '需求项目: 融创金成未来海',
        address: '浙江 杭州 余杭 西溪',
        name: ' 冯先生',
        phone: ' 188****6479',
        status: '1',
        price: '50',
      }]
    },
  },
  onLoad: function () {},
  goDetail: (e) => {
    console.log(e);
    let id = e.currentTarget.dataset.thisid;
    //wx.redirectTo({
    wx.navigateTo({
      url: '/pages/managingUser/intentionDeatil/intentionDetail?id=' + id
    })
  }
})