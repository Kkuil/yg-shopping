import request from '../utils/index'

export default request({url: '/home/catitems'}).then(({ data: { message } }) => {
    return message
})