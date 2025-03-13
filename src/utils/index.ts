import { useAppStoreWithOut } from '@/stores'
const appStore = useAppStoreWithOut()
/**
 * 校验权限是否存在
 * @param code
 * @returns
 */
export const checkPermission = (code?: string | string[]) => {
	let result = true
	if (!code) {
	} else if (Array.isArray(code)) {
		result = code.every(v => appStore.permissions.includes(v))
	} else if (code.includes('||')) {
		result = code.split('||').some((v: string) => appStore.permissions.includes(v))
	} else {
		result = appStore.permissions.includes(code)
	}
	return result
}

/**
 * 等到图片加载完成
 * @param url 图片链接
 */
export function waitForImageLoad(url: string) {
	return new Promise((request, inject) => {
		const img = new Image()
		img.src = url
		img.addEventListener('load', function () {
			request(url)
			img.remove()
		})
	})
}

export const isEmpty = val => {
	return val === '' || val === undefined || val === null
}

/**
 * 构造枚举字段管理对象
 */
export interface EnumModel {
	id: string | number
	name: string | number
	color?: string
	status?: string
	[key: string]: any
	[key: number]: any
}

// TODO daotin: define enums typescript
interface Enums {
	[x: string]: string
}
export interface EnumResult<T extends EnumModel> {
	ids: Array<T['id']>
	names: Array<T['name']>
	origin: Array<T>
	enums: Enums
	[key: string]: any
	[key: number]: any
	getColor: (id: string) => string
	getStatus: (id: string) => string | undefined
	getNameById: (id: string | number) => string | number
	getNamesByIds: (ids: Array<string | number>) => Array<string | number>
	getFormats: (idAlias: string, nameAlias: string) => any[]
	getFilters: (hides: Array<string | number>) => T[]
}

export const enumMng = <T extends EnumModel>(data: Array<T>): EnumResult<T> => {
	const result: EnumResult<T> = {} as EnumResult<T>
	const ids: Array<string | number> = []
	const names: Array<string | number> = []
	const enums: Enums = {}

	data.forEach(item => {
		result[item.id] = item.name
		ids.push(item.id)
		names.push(item.name)
		enums[item.key || item.id] = item.id + ''
	})

	result.ids = ids
	result.names = names
	result.origin = data
	result.enums = enums
	result.getColor = id => {
		const row = data.find(item => item.id === id)
		return row ? row.color! : ''
	}
	result.getStatus = (id: string) => {
		const row = data.find(item => item.id === id)
		return row ? row.status : undefined
	}
	result.getNameById = id => {
		let name: string | number = ''
		const row = data.find(item => item.id === id)
		name = row ? row.name : ''
		return name
	}
	result.getNamesByIds = ids => {
		const names: Array<string | number> = []
		ids.forEach(id => {
			const row = data.find(item => item.id === id)
			row && names.push(row.name)
		})
		return names
	}
	result.getFormats = (idAlias, nameAlias) =>
		data.map(item => ({
			[idAlias]: item.id,
			[nameAlias]: item.name,
		}))
	result.getFilters = hides => data.filter(item => !hides.includes(item.id))

	return result
}

/**
 * 判断是否是某种类型
 * @param  {[string]} fileName [文件名称]
 * @return {[boolean]}         [返回值]
 */
export const isSetType = (fileName: string, type: string | Array<string>) => {
	if (typeof fileName !== 'string') return false
	const name = fileName.toLowerCase()
	if (Array.isArray(type)) {
		const isFilterArr = type.filter(item => {
			return name.endsWith(item)
		})
		return isFilterArr.length > 0
	} else {
		return name.endsWith(type)
	}
}

/**
 * 校验文件名称长度
 * @param file 文件
 * @param length 比较的长度
 * @returns 是否小于length长度，是则返回true，否则返回false
 */
export const checkFileNameLength = (file, length) => {
	// console.log('⭐checkFileNameLength==>', file.name.split('.')[0] <= length)
	return file.name.split('.')[0]?.length <= length
}
