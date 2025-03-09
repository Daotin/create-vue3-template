/**
 * 本地存储的读取往往分散在各个不同的地方，会显得很乱。
 * 使用本地存储的时候推荐统一采用该方式，同时在这里记录每个key和它的作用。
 */

import { TokenName } from '@/configs/const'

// 项目中所有存储在localStorage中的数据
const localKeys = [
	// 是否折叠侧边菜单 true：折叠
	'sideCollapse',
	// token
	TokenName,
	// 主题模式
	'theme_mode',
]

// 项目中所有存在sessionStorage中的数据的名称
const sessionKeys = <string[]>[]

type localKeyName = (typeof localKeys)[number]
type sessionKeyName = (typeof sessionKeys)[number]
type keyName = localKeyName | sessionKeyName
type storageData = {
	value: any
	expiryTime: number
}

class StorageMng {
	// key名称前缀
	private prefix: string
	// 使用localStorage还是sessionStorage
	private mode: Storage

	constructor(mode: Storage, prefix: string = '') {
		this.prefix = prefix
		this.mode = mode
	}

	public setItem(key: keyName, value: any, duration?: number) {
		try {
			const data: storageData = {
				// 存储的值
				value: value,
				// 过期时间
				expiryTime: duration ? this.getCurrentTimeStamp() + duration : 0,
			}
			this.mode.setItem(`${this.prefix}${key}`, window.JSON.stringify(data))
		} catch (err) {
			console.warn(`Storage ${key} set error`, err)
		}
	}

	public getItem(key: keyName) {
		const result = this.mode.getItem(`${this.prefix}${key}`)
		if (!result || result === 'null') return null
		const now = this.getCurrentTimeStamp()
		let obj: storageData
		try {
			obj = window.JSON.parse(result)
		} catch (error) {
			return null
		}
		// 如果过期时间为0，或者过期时间大于当前时间，则返回存储的值
		if (obj.expiryTime === 0 || obj.expiryTime > now) {
			return obj.value
		}
		return null
	}

	public removeItem(key: keyName) {
		this.mode.removeItem(`${this.prefix}${key}`)
	}

	public clear() {
		this.mode.clear()
	}

	public getKey(index: number) {
		return this.getKeys()[index]
	}

	// 获取所有数据的名称
	public getKeys() {
		const keys: keyName[] = []
		Array.from({ length: this.mode.length }, (item, index) => {
			const k = this.mode.key(index)
			if (k?.startsWith(this.prefix)) {
				keys.push(k.slice(this.prefix.length) as keyName)
			}
		})
		return keys
	}

	// 获取所有数据
	public getAll() {
		return Object.fromEntries(this.getKeys().map(key => [key, this.getItem(key)]))
	}

	private getCurrentTimeStamp() {
		return +new Date()
	}
}

const localMng = new StorageMng(localStorage)
const sessionMng = new StorageMng(sessionStorage)

export { StorageMng, localMng, sessionMng }
