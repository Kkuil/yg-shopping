// goods_detail
import getGoodsDetail from '../../api/Data/goods_detail'
Page({

    data: {
        // 购物车是否为空
        isEmpty: false,
        // 用户地址详情
        address: {},
        // 购物车商品详情
        goods: [],
        // 选中商品
        checked_goods: [],
        // 总金额
        sum_price: 0,
        // 是否全选
        isAllChecked: false
    },

    onLoad() {
        // 关闭数据加载
        wx.hideLoading()
        // 设置缓存地址
        this.setData({
            address: wx.getStorageSync('address') ? wx.getStorageSync('address') : {}
        })        
        // 取本地数据
        const localCartGoods = wx.getStorageSync('cart')
        // 判断是否存在购物车商品
        this.setData({
            goods: [],
            isEmpty: !localCartGoods
        })
        // 初始化渲染cart页面
        if(!localCartGoods) return 
        else {
            // 初始化数据
            localCartGoods.forEach(async (goods, index) => {
                // 循环发送请求获取数据
                const res = await getGoodsDetail({ goods_id: goods.goods_id })
                // 存储数据
                const temp = {
                    isChecked: goods.isChecked,
                    goods_big_logo: res.goods_big_logo,
                    goods_name: res.goods_name,
                    goods_price: res.goods_price,
                    goods_num: goods.goods_num,
                    goods_id: goods.goods_id
                }
                // 改变goods
                this.setData({
                    goods: [...this.data.goods, temp],
                })
                // 改变checked_goods 计算总金额
                if(goods.isChecked) {
                    this.setData({
                        sum_price: this.data.sum_price + goods.goods_num * res.goods_price * 1,
                        checked_goods: [...this.data.checked_goods, temp]
                    })
                }
            })
            // 是否全选
            const isAllChecked = localCartGoods.every(goods => goods.isChecked)
            this.setData({
                isAllChecked
            })
            // 关闭数据加载
            wx.hideLoading()
        }
    },

    // 获取收货地址
    choose_address() {
        wx.chooseAddress({
            success: (result)=>{
                this.setData({
                    address: result
                })
                // 本地存储
                wx.setStorageSync('address', result);
                wx.showNavigationBarLoading()
            },
            fail: ()=>{
            },
            complete: () => {
                wx.hideNavigationBarLoading()
            }
        });
    },

    // 商品是否选中事件
    handleIsChecked(e) {
        // 获取当前点击的商品id
        const { goods_id } = e.currentTarget.dataset
        // 获取goods数据
        const { goods } = this.data
        // 映射出新的本地存储数据
        const mapGoods = goods.map((good, index) => {
            if(good.goods_id == goods_id) {
                // 修改goods
                this.setData({
                    // 修改金额
                    sum_price: !good.isChecked 
                    ? this.data.sum_price + good.goods_price * good.goods_num 
                    : this.data.sum_price - good.goods_price * good.goods_num,
                    [`goods[${index}].isChecked`]: !good.isChecked,
                })
            }
            return {
                goods_id: good.goods_id,
                goods_num: good.goods_num,
                isChecked: good.isChecked
            }
        })
        // 重新本地存储
        wx.setStorageSync('cart', mapGoods)
        // 修改checked_goods
        const temp_checked_goods = []
        goods.forEach(good => {
            if(good.isChecked) temp_checked_goods.push(good)
        })
        this.setData({
            // 修改isAllChecked
            isAllChecked: temp_checked_goods.length == goods.length,
            checked_goods: temp_checked_goods
        })
    },

    // 是否全选事件
    all_checked() {
        const { isAllChecked, goods } = this.data
        // 循环改变goods
        goods.forEach((good, index) => {
            this.setData({
                [`goods[${index}].isChecked`]: !isAllChecked
            })
        })
        // goods or [] => checked_goods
        this.setData({
            checked_goods: !isAllChecked ? goods : [],
            sum_price: !isAllChecked ? goods.map(good => good.goods_price).reduce((pre, next) => pre + next) : 0,
            isAllChecked: !isAllChecked
        })
    },

    // 加商品
    increment(e) {
        const { goods } = this.data
        // 商品id
        const { goods_id } = e.currentTarget.dataset
        // 商品购买上限
        goods.forEach((good, index) => {
            if(good.goods_id == goods_id) {
                if(good.goods_num == 10) wx.showToast({
                    title: '已达到商品数量上限',
                    duration: 800,
                });
                else this.setData({
                    // 增加总金额
                    sum_price: good.isChecked ? this.data.sum_price + good.goods_price : this.data.sum_price,
                    // 增加商品数量
                    [`goods[${index}].goods_num`]: good.goods_num + 1
                })
            }
        })
        // 修改本地存储
        wx.setStorageSync('cart', goods)
    },

    // 减商品
    decrement(e) {
        const { goods } = this.data
        // 商品id
        const { goods_id } = e.currentTarget.dataset
        // 商品购买上限
        const tempGoods = goods.map((good, index) => {
            if(good.goods_id == goods_id) {
                if(good.goods_num == 1) wx.showToast({
                    title: '已达到商品数量下限',
                    duration: 800,
                });
                else this.setData({
                    // 增加总金额
                    sum_price: good.isChecked ? this.data.sum_price - good.goods_price : this.data.sum_price,
                    // 增加商品数量
                    [`goods[${index}].goods_num`]: good.goods_num - 1
                })
            }
            return {
                isChecked: good.isChecked,
                goods_num: good.goods_num,
                goods_id: good.goods_id
            }
        })
        // 修改本地存储
        wx.setStorageSync('cart', tempGoods)
    },

    // 长按删除商品
    deleteGoods(e) {
        var checked_goods = this.data.checked_goods
        // 删除商品
        wx.showModal({
            content: '是否删除商品',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#ff5861',
            success: (result) => {
                if(result.confirm){
                    const { goods_id } = e.currentTarget.dataset
                    var goods = this.data.goods
                    // 删除商品
                    // 用来判断是否有选中商品
                    let isSelectedGoods
                    goods.forEach((good, index) => {
                        if(good.goods_id == goods_id) {
                            if(good.isChecked) isSelectedGoods = true
                            else isSelectedGoods = false
                            goods.splice(index, 1)
                            return 
                        }
                    })
                    // 判断是否需要改变需要改变checked_goods和sum_price
                    if(isSelectedGoods) {
                        let temp_sum_price
                        // 修改checked_goods
                        checked_goods.forEach((good, index) => {
                            if(good.goods_id == goods_id) {
                                temp_sum_price = good.goods_price * good.goods_num
                                checked_goods.splice(index, 1)
                                return
                            }
                        })
                        this.setData({
                            goods,
                            checked_goods,
                            sum_price: this.data.sum_price - temp_sum_price
                        })
                    } else {
                        // 重新设置details.goods
                        this.setData({
                            goods
                        })
                    }
                }
            }
        });
    },

    // 跳转支付页面
    paying() {
        const { address, checked_goods, sum_price } = this.data
        if(!address.userName) {
            wx.showToast({
                title: '请选择地址',
                duration: 800,
            })
        } else if(!sum_price) {
            wx.showToast({
                title: '请选择商品',
                duration: 800,
            })
        } else wx.navigateTo({
            url: `/pages/pay/index?needPay=${JSON.stringify(checked_goods)}&address=${JSON.stringify(address)}&sum_price=${sum_price}`,
        });
    }
})