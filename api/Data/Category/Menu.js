import request from '../../utils/index'

export default request({url: '/categories'}).then(({ data: { message } }) => {
    const Menus = message.map(menu => menu.cat_name)
    return Menus
})