// goods_list
import getGoodListData from '../../api/Data/goods_list'
Page({

    data: {
        res: {},
        goods: [],
        isLoading: true,
        isReachBottom: false,
        isEmpty: false
    },

    // 页面加载
    async onLoad(options) {
        const { cid, query = {} } = options
        const res = await getGoodListData({ cid, query, pagenum: 1, pagesize: 10})
        // 隐藏loading
        wx.hideLoading()
        this.setData({
            res,
            goods: res.goods,
            isEmpty: !res.goods.length,
            isLoading: res.goods.length
        })
    },
    // 页面触底
    async onReachBottom() {
        const { total, pagenum } = this.data.res
        // 触底重新发送请求获取数据
        // 判断是否是最后一页
        if (pagenum * 10 >= total) {
            // 显示无下一页
            this.setData({
                isLoading: false,
                isReachBottom: true
            })
            // 弹框
            wx.showToast({
                title: '已经到底了',
                duration: 800
            });
        } else {
            // 拿出之前的页码
            const { res: { pagenum }, goods } = this.data
            // 发送请求获取下一页数据
            const { cid, query } = this.options
            this.setData({
                isLoading: true,
                isReachBottom: false
            })
            const res = await getGoodListData({ cid, query, pagenum: Number(pagenum) + 1, pagesize: 10})
            // 停止显示
            wx.hideLoading();
            // 合并数据
            this.setData({
                res,
                goods: [...goods, ...res.goods],
                isLoading: false,
                isReachBottom: true
            })
        }
    },
    // 下拉刷新
    async onPullDownRefresh() {
        this.setData({
            res: {},
            goods: []
        })
        // 重新发起请求
        const { cid, query } = this.options
        const res = await getGoodListData({ cid, query, pagenum: 1, pagesize: 10})
        // 停止刷新
        wx.stopPullDownRefresh()
        // 隐藏loading
        wx.hideLoading()
        this.setData({
            res,
            goods: res.goods
        })
    },
    // 排序
    sortType({ detail: { index } }) {
        if(index == '2') {
            const goods = this.data.goods
            goods.sort((a, b) => b.goods_price - a.goods_price)
            this.setData({
                goods
            })
        } 
    }
})