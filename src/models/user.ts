/**
 * 用户信息接口
 */
export interface IUser {
	id: number | string
	username: string
	realName: string
	email: string
	phone: string
	gender: number
	status: number
	avatar?: string
	createTime: string
	updateTime: string
	lastLoginTime?: string
	roles?: Array<{ id: number | string; name: string }>
}

/**
 * 用户查询参数
 */
export interface IUserQueryParams {
	username?: string
	realName?: string
	email?: string
	phone?: string
	status?: number
	gender?: number
	startTime?: string
	endTime?: string
}

/**
 * 用户查询参数(带分页)
 */
export interface IUserQueryParamsWithPage extends IUserQueryParams {
	page?: number
	size?: number
}

/**
 * 用户列表响应数据
 */
export interface IUserListResponse {
	list: IUser[]
	total: number
	page: number
	size: number
}

/**
 * 用户创建参数
 */
export interface IUserCreateParams {
	username: string
	password: string
	realName: string
	email: string
	phone: string
	gender: number
	status: number
	roleIds?: (number | string)[]
}

/**
 * 用户更新参数
 */
export interface IUserUpdateParams extends Omit<IUserCreateParams, 'password'> {
	id: number | string
	password?: string
}

/**
 * 角色信息接口
 */
export interface IRole {
	id: number | string
	name: string
	code: string
	description: string
	createTime: string
	updateTime: string
}

/**
 * 权限信息接口
 */
export interface IPermission {
	id: number | string
	name: string
	code: string
	type: number
	parentId: number | string | null
	path?: string
	component?: string
	redirect?: string
	icon?: string
	sort: number
	hidden: boolean
	createTime: string
	updateTime: string
	children?: IPermission[]
}
