import request from '@/utils/request'
import type { IUserQueryParams, IUserCreateParams, IUserUpdateParams, IUser } from '@/models/user'

/**
 * 获取用户列表
 * @param params 查询参数
 */
export const apiGetUserList = (params: IUserQueryParams) => {
	return request.post('/user/list', params)
}

/**
 * 获取用户详情
 * @param id 用户ID
 */
export const apiGetUserById = (id: string | number) => {
	return request.post(`/user/${id}`)
}

/**
 * 创建用户
 * @param data 用户信息
 */
export const apiCreateUser = (data: IUserCreateParams) => {
	return request.post('/user', data)
}

/**
 * 更新用户
 * @param data 用户信息
 */
export const apiUpdateUser = (data: IUserUpdateParams) => {
	return request.post(`/user/${data.id}`, data)
}

/**
 * 删除用户
 * @param id 用户ID
 */
export const apiDeleteUser = (id: string | number) => {
	return request.post(`/user/${id}`)
}

/**
 * 批量删除用户
 * @param ids 用户ID数组
 */
export const apiBatchDeleteUser = (ids: (string | number)[]) => {
	return request.post('/user/batch', { ids })
}

/**
 * 更新用户状态
 * @param id 用户ID
 * @param status 状态值
 */
export const apiUpdateUserStatus = (id: string | number, status: number) => {
	return request.post(`/user/${id}/status`, { status })
}

/**
 * 重置用户密码
 * @param id 用户ID
 */
export const apiResetUserPassword = (id: string | number) => {
	return request.post(`/user/${id}/password/reset`)
}
