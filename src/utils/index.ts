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
		var img = new Image()
		img.src = url
		img.addEventListener('load', function () {
			request(url)
			img.remove()
		})
	})
}
