import request from '@/utils/request'
import type { ILoginParams, ILoginResponse } from '@/models/common'

// 登录
export const apiLogin = (data: ILoginParams) => request.post<ILoginResponse>('/sys/login', data)

export const apiGetUserInfo = () => request.post('/sys/user/info')
export const apiGetMenuList = () => request.post('/sys/menus')
