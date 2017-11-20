const app = getApp();

Page({
  data: {
    devs: [{
      userName: '加入我们',
      url: '../../images/joinus.png',
      detail: '工作室采用会员制，会员费1,000元,永久有效，退出工作室则全额退费。'
    },{
      userName : 'Hank',
      detail   : '小韩工作室发起人'
    }, {
      userName : 'MoMo',
      url: 'https://wx.qlogo.cn/mmopen/vi_32/K4Yk9ftx4XP7tmdjEgt5cF5qhvLSH64cFhUZUH32pu0VAkgqGJ5RsJcE0hL8iamPScpcVkL6acibrf5wZT3ZSbcg/0'
    }, {}, {}, {}, {}, {}],
    userInfo   : {},
    hasUserInfo: false,
    canIUse    : wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad(options) {
    console.log(app);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse && app.userInfoReadyCallback) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
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
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
