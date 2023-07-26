Component({

    properties: {
        goods: {
            type: Array,
            value: []
        },
        isLoading: {
            type: Boolean,
            value: true
        },
        isReachBottom: {
            type: Boolean,
            value: false
        },
        isEmpty: {
            type: Boolean,
            value: false
        }
    },

    data: {
        currentIndex: 0,
    },

    methods: {
        change(e) {
            const { index } = e.currentTarget.dataset
            this.setData({
                currentIndex: index,
            })
            this.triggerEvent('sortType', { index })
        },
        addHistory(e) {
            const { goods_id } = e.currentTarget.dataset
            // 从本地存储中取出历史记录
            const history = wx.getStorageSync('history') || []
            // 遍历历史记录
            history.includes(goods_id) ? '' : history.push(goods_id)
            wx.setStorageSync('history', history);
        }
    }
})
