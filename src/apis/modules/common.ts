import request from '@/utils/request'

// 登录
export const apiGetUserInfo = () => request.post('/sys/user/info')
export const apiGetMenuList = () => request.post('/sys/menus')
