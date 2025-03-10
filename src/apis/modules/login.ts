import request from '@/utils/request'
import type { ILoginParams, ILoginResponse } from '@/models/common'

// 登录
export const login = (data: ILoginParams) => request.post<ILoginResponse>('/sys/login', data)
export const logout = () => request.post('/sys/logout')
