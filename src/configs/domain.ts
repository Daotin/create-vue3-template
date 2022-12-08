/**
 * 存放地址域名
 */

const nodeEnv = process.env.NODE_ENV || 'development'

const target = '/xxx/'

const getBaseURL = () => {
	// 本地开发环境
	if (nodeEnv === 'development') {
		return `${location.origin}/api`
	}
	// 线上生产环境
	return target
}

export const baseURL = getBaseURL()
