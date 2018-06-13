Page({
    data: {
        gradeName: ['', 'A级意向', 'B级意向', 'C级意向'],
        detail: {
            title: '融创金成未来海',
            address: '浙江 杭州 余杭 西溪',
            grade: 1,
            name: ' 冯先生',
            phone: ' 188****6479',
            status: '1',
            price: '50积分',
            userDate: '2018.05.12 11:05:25',
            buyDate: '2018.05.16 12:38:45',
            channel: '网络来客',
            phoneNum: '15356712319',
        }
    },
    callPhone: (e) => {
        let phoneNumber = e.currentTarget.dataset.phonenum;
        wx.makePhoneCall({
            phoneNumber: phoneNumber //仅为示例，并非真实的电话号码
        })
    }
})