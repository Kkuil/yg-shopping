// goods_detail
import getGoodsDetail from '../../api/Data/goods_detail'
Page({

    data: {
        details: {},
        isCollected: false
    },

    // 页面加载
    onLoad(options) {
        getGoodsDetail(options).then(data => {
            this.setData({
                details: {
                    pics: data.pics,
                    goods_price: data.goods_price,
                    goods_name: data.goods_name,
                    goods_introduce: data.goods_introduce,
                    goods_id: data.goods_id,
                    isCollected: wx.getStorageSync('collections')?.includes(data.goods_id) || false
                },
                isCollected: wx.getStorageSync('collections').includes(data.goods_id) || false
            })
            wx.hideLoading()
        })
    },

    // 预览大图
    handlePreviewImage(e) {
        const currentUrl = e.currentTarget.dataset.url
        // 轮播图数组
        const pics = this.data.details.pics.map(pic => pic.pics_mid)
        wx.previewImage({
            current: currentUrl,
            urls: pics
        });
    },

    // 商品收藏
    collect() {
        const { goods_id, isCollected } = this.data.details
        const collections = wx.getStorageSync('collections')
        // 判断商品是否收藏
        if(isCollected) {
            // 取消收藏
            this.setData({
                ['details.isCollected']: false,
                isCollected: false
            })
            collections.splice(collections.indexOf(goods_id), 1)
            wx.setStorageSync('collections', collections)
            wx.showToast({
                title: '取消收藏',
                duration: 800
            })
        } else {
            // 收藏
            this.setData({
                ['details.isCollected']: true,
                isCollected: true
            })
            wx.setStorageSync('collections', [...collections, goods_id])
            wx.showToast({
                title: '收藏成功',
                duration: 800
            })
        }
    },

    // 添加购物车
    add_cart(_, isChecked = false) {
        const { goods_id } = this.data.details
        // 判断是否有购物车
        const goods = wx.getStorageSync('cart')
        if(!goods) {
            // 新增本地存储
            wx.setStorageSync('cart', [{goods_id: goods_id, isChecked, goods_num: 1}])
        } else {
            // 判断购物车中是否存在
            const goods = wx.getStorageSync('cart')
            for (let i = 0; i < goods.length; i++) {
                if(goods[i].goods_id == goods_id) {
                    wx.showToast({
                        title: '已在购物车中',
                        duration: 700
                    });
                    return 
                }
            }
            // 原来的购物车值
            const originCarts = wx.getStorageSync('cart');
            // 添加本地存储购物车
            wx.setStorageSync('cart', [...originCarts, {goods_id: goods_id, isChecked, goods_num: 1}]);
        }
        // 弹框
        wx.showToast({
            title: '添加成功',
            duration: 700,
        });
    },

    // 立即购买
    purchase() {
        this.add_cart('', true)
        // wx.navigateTo({
        //     url: '/pages/cart/index'
        // })
    }
})