Page({

    data: {
        currentIndex: 0
    },

    onLoad(options) {
        wx.hideLoading()
        const { currentIndex } = options
        this.setData({
            currentIndex
        })
    },
    // 修改currentIndex
    handleIndex(e) {
        const { index } = e.currentTarget.dataset
        this.setData({
            currentIndex: index
        })
    }
})