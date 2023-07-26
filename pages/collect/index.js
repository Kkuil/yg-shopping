import getDetailData from '../../api/Data/goods_detail'
Page({

    data: {
        // 当前的tab
        currentIndex: 0,
        // 面包屑索引
        currentIndex1: 0,
        // collected_goods
        collected_goods: [],
        // history
        history: []
    },

    onLoad(options) {
        const currentIndex = options?.currentIndex
        this.setData({
            currentIndex: currentIndex
        })
        // 从本地读取收藏的商品
        const collected_goods_id = wx.getStorageSync('collections')
        // 从本地读取收藏的商品
        const history_goods_id = wx.getStorageSync('history')
        // 发送请求获取商品
        collected_goods_id.forEach(async goods_id => {
            const goods = await getDetailData({ goods_id })
            const tempCollectGoods = {
                goods_img: goods.goods_big_logo,
                goods_name: goods.goods_name,
                goods_price: goods.goods_price,
                goods_id: goods.goods_id
            }
            this.setData({
                collected_goods: [...this.data.collected_goods, tempCollectGoods]            })
        })
        wx.hideLoading()
        history_goods_id.forEach(async goods_id => {
            const goods = await getDetailData({ goods_id })
            const tempHistoryGoods = {
                goods_img: goods.goods_big_logo,
                goods_name: goods.goods_name,
                goods_price: goods.goods_price,
                goods_id: goods.goods_id
            }
            this.setData({
                history: [...this.data.history, tempHistoryGoods]
            })
        })
        wx.hideLoading()
    },

    // 修改tab index
    changeIndex(e) {
        this.setData({
            currentIndex: e.currentTarget.dataset.index
        })
    },

    // 修改crumb index
    changeCrumbIndex(e) {
        this.setData({
            currentIndex1: e.currentTarget.dataset.index
        })
    } 
})