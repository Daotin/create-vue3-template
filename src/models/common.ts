import type { ElForm } from 'element-plus'
export type ElFormInstance = InstanceType<typeof ElForm>

export interface IObject {
	[x: string]: any
}

// 登录请求参数接口
export interface ILoginParams {
	username: string
	password: string
	// 如果有验证码等其他字段也可以在这里添加
	captcha?: string
}

// 登录响应数据接口
export interface ILoginResponse {
	token: string
	// 可能还会包含一些基础用户信息
	userId: string | number
	username: string
	// 其他可能的字段
	roles?: string[]
	permissions?: string[]
}

/**
 * 枚举基类
 */
export class EnumClassBase {
	value: number
	label: string
	type: string

	constructor(value: number, label: string, type: string) {
		this.value = value
		this.label = label
		this.type = type
	}

	getColor(val: number): string {
		const items = Object.getOwnPropertyNames(this.constructor)
			.filter(item => item !== 'length' && item !== 'prototype' && item !== 'name')
			.map(item => (this.constructor as any)[item])

		const target = items.find(item => item.value === val)
		return target ? target.type : ''
	}

	getLabel(val: number): string {
		const items = Object.getOwnPropertyNames(this.constructor)
			.filter(item => item !== 'length' && item !== 'prototype' && item !== 'name')
			.map(item => (this.constructor as any)[item])

		const target = items.find(item => item.value === val)
		return target ? target.label : ''
	}

	getOptions(): { label: string; value: number }[] {
		return []
	}
}
