import { enumMng } from '@/utils'

/**
 * 用户状态枚举
 */
export const enumUserStatus = enumMng([
	{ id: '0', key: 'active', name: '正常', color: 'success' },
	{ id: '1', key: 'locked', name: '锁定', color: 'danger' },
	{ id: '2', key: 'disabled', name: '禁用', color: 'warning' },
])

/**
 * 性别枚举
 */
export const enumGender = enumMng([
	{ id: '0', key: 'male', name: '男', color: 'primary' },
	{ id: '1', key: 'female', name: '女', color: 'danger' },
	{ id: '2', key: 'unknown', name: '未知', color: 'info' },
])
