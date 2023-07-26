import request from '../../utils/index'

export default function indexRequest(index) {
    return request({url: '/categories'}).then(({ data: { message } }) => {
        const contents = message.map(content => content.children)
        return contents[index]
    })
}