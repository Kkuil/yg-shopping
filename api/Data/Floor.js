import request from '../utils/index'

export default request({url: '/home/floordata'}).then(({ data: { message } }) => {
    return message
})