// 提交项目为0，剩下正常排序
Page({
  data: {
    userName: '马小雷',
    assets: '5000',
    faec_img: '../../images/face_img.png',
    btnList: {
      data: [{
          text: '提交项目',
          img: '../../images/my_list_icon1.png',
          class: 'icon1',
          state: 0
        },
        {
          text: '已提交的项目',
          img: '../../images/my_list_icon2.png',
          class: 'icon2',
          state: 1
        },
        {
          text: '管理报备的客户',
          img: '../../images/my_list_icon3.png',
          class: 'icon3',
          state: 2
        },
        {
          text: '我的收藏',
          img: '../../images/my_list_icon4.png',
          class: 'icon4',
          state: 3
        },
        {
          text: '关于我们',
          img: '../../images/my_list_icon5.png',
          class: 'icon5',
          state: 4
        },
        {
          text: '客服热线',
          img: '../../images/my_list_icon6.png',
          class: 'icon6',
          state: 5
        },
        {
          text: '个人设置',
          img: '../../images/my_list_icon7.png',
          class: 'icon7',
          state: 6
        },
      ]
    }
  },
  onLoad: function () {}
})