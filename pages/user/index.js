// pages/user/index.js
Page({

    data: {
        collections: 0,
        history: 0
    },

    onShow() {
        wx.hideLoading()
        // 从本地读取收藏商品数量
        const collections = wx.getStorageSync('collections')?.length
        const history = wx.getStorageSync('history')?.length
        this.setData({
            collections: collections || 0,
            history
        })
    }
})