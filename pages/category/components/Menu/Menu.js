// Category
import getMenuData from '../../../../api/Data/Category/Menu'
Component({
    lifetimes: {
        attached() {
            this.getMenuData()
        }
    },
    properties: {

    },

    data: {
        Menus: [],
        // 现在的选中的索引
        currentIndex: 0
    },

    methods: {
        getMenuData() {
            getMenuData.then(data => {
                this.setData({
                    Menus: data
                })
            })
            wx.hideLoading()
        },
        exchangeItems(e) {
            const { index } = e.currentTarget.dataset
            // 修改index
            this.setData({
                currentIndex: index,
            })
            this.triggerEvent('getScrollTop')
            // 判断是否有缓存
            const items = wx.getStorageSync('items' + index)
            if (!items || Date.now() - items.expireTime > 1000 * 60 * 60) {
                this.triggerEvent('getContents', {index})
            } else this.triggerEvent('getContents', {index, items})
        }
    }
})
