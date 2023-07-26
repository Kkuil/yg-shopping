export default function(config) {
    // baseURL
    const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中'
        })
        wx.request({
            ...config,
            url: baseURL + config.url,
            success: result => resolve(result),
            fail: err => reject(err)
        })
    })
}