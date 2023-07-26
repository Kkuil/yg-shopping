import request from '../utils/index'

export default function Request(config) {
    return request({url: '/goods/search', data: {...config}}).then(({ data: { message } }) => {
        return message
    })
}