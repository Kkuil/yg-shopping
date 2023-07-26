// wxlogin
import wxlogin from './wxlogin'
Page({
    onLoad(options) {
        wx.hideLoading()
    },

    // 获取用户信息
    getUserInfo(e) {
        const { encryptedData, iv, rawData, signature } = e.detail
        const getTokenParams = {
            encryptedData, 
            iv, 
            rawData, 
            signature
        }
        const token = wxlogin()
        wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: '',
            paySign: '',
            success: (result)=>{
                
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    }
})