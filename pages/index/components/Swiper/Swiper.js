import getSwiper from '../../../../api/Data/Swiper'
Component({
    lifetimes: {
        attached: function() {
            // 在组件实例进入页面节点树时执行
            this.getSwiperData()
        }
    },

    properties: {

    },


    data: {
        swiperList: []
    },

    methods: {
        getSwiperData: function() {
            getSwiper.then(data => {
                this.setData({
                    swiperList: data
                })
            })
            wx.hideLoading()
        }
    }
})
