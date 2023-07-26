import request from '../utils/index'

export default request({url: '/home/swiperdata'}).then(({ data: { message } }) => {
    return message
})