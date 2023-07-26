// pages/pay/index.js
Page({

    data: {
        needPayGoods: [],
        address: {},
        sum_price: 0,
        // 支付总件数
        sum_num: 0
    },

    onLoad(options) {
        wx.hideLoading()
        const needPay = JSON.parse(options['needPay'])
        let sum_num = 0
        needPay.forEach(pay => {
            sum_num += pay.goods_num
        });
        this.setData({
            needPayGoods: needPay,
            address: JSON.parse(options['address']),
            sum_price: options['sum_price'] * 1,
            sum_num
        })
    },
})