import request from '../utils/index'

export default function Request(config) {
    return request({url: '/user/wxlogin', data: {...config}, method: 'POST'}).then(({ data: { message } }) => {
        return message
    })
}