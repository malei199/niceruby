// 提交项目为0，剩下正常排序
Page({
  data: {
    userName: '马小雷',
    assets: '5000',
    faec_img: '../../images/face_img.png',
    btnList: {
      data: [{
          text: '提交项目',
          img: '',
          state: 0
        },
        {
          text: '已提交的项目',
          img: '',
          state: 1
        },
        {
          text: '管理报备的客户',
          img: '',
          state: 2
        },
        {
          text: '我的收藏',
          img: '',
          state: 3
        },
        {
          text: '关于我们',
          img: '',
          state: 4
        },
        {
          text: '客服热线',
          img: '',
          state: 5
        },
        {
          text: '个人设置',
          img: '',
          state: 6
        },
      ]
    }
  },
  onLoad: function () {}
})