// Content
import indexRequest from '../../api/Data/Category/Content'
Page({
    data: {
        Contents: [],
        scrollTop: 0,
    },
    onLoad() {
        indexRequest(0).then(data => {
            this.setData({
                Contents: data
            })
        })
        wx.hideLoading()
    },
    // 从Menu中获取数据
    getContents({ detail: { index, items } }) {
        if (!items) {
            indexRequest(index).then(data => {
                const items = {
                    expireTime: Date.now(),
                    items: data
                }
                wx.setStorageSync('items' + index, items)
                this.setData({
                    Contents: data
                })
            })
            wx.hideLoading()
        } else {
            this.setData({
                Contents: items.items
            })
        }
    },
    // 内容区置顶
    getScrollTop() {
        this.setData({
            scrollTop: 0
        })
    }
})