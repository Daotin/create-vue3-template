import request from '@/utils/request'

// 登录
export const login = data => request.post('/sys/login', data)
export const logout = () => request.post('/sys/logout')
