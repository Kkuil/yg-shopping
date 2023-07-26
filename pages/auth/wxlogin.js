// getToken
import getToken from '../../api/Data/getToken'
export default function wxlogin(config) {
    wx.login({
        timeout:10000,
        success: async (result)=>{
            const { code } = result
            const res = await getToken({...config, code})
        }
    })
}