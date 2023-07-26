// getSearch
import getSearch from '../../api/Data/getSearch'
Page({

    data: {
        isSearch: false,
        goods_keywords: [],
        search_history: [],
        empty: ''
    },

    onLoad() {
        const search_history = wx.getStorageSync('search_history')
        if(search_history) {
            this.setData({
                search_history
            })
        } else {
            this.setData({
                empty: '无历史记录'
            })
        }
        wx.hideLoading()
    },

    // 获取关键词
    async getKeywords(e) {
        const { value } = e.detail
        const search_history = wx.getStorageSync('search_history') || []
        const goods_keywords = await getSearch({ query: value })
        this.setData({
            goods_keywords
        })
        this.setData({
            isSearch: true
        })
        search_history.includes(value) ? '' : search_history.push(value)
        wx.setStorageSync('search_history', search_history);
        wx.hideLoading()
    },

    // 取消
    handleCancel() {
        this.setData({
            isSearch: false
        })
    }
})