// 获取swiper数据
import getItemsData from '../../../../api/Data/Items'
Component({
    lifetimes: {
        attached() {
            this.getItemsData()
        }
    },

    properties: {

    },

    data: {
        itemsList: []
    },

    methods: {
        // 获取分类数据
        getItemsData() {
            getItemsData.then(data => {
                this.setData({
                    itemsList: data
                })
            })
            wx.hideLoading()
        } 
    }
})
