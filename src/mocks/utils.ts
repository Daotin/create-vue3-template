/**
 * 从请求选项中获取请求参数
 * @param options Mock请求选项
 * @returns 解析后的参数对象
 */
export function getRequestParams(options: any): Record<string, any> {
	// 处理GET请求参数
	if (options.type === 'GET') {
		// 从URL中提取查询参数
		const url = options.url
		const queryString = url.indexOf('?') !== -1 ? url.substr(url.indexOf('?') + 1) : ''
		if (!queryString) {
			return {}
		}

		return queryString.split('&').reduce((params: Record<string, any>, param: string) => {
			const [key, value] = param.split('=')
			params[key] = decodeURIComponent(value)
			return params
		}, {})
	}

	// 处理POST/PUT/DELETE请求参数
	if (options.body) {
		try {
			return JSON.parse(options.body)
		} catch (e) {
			return {}
		}
	}

	return {}
}
