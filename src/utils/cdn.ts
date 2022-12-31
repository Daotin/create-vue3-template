const isCDN = false // 静态资源是否上CDN
const CDNUrl = 'http://res.xxx.com'
const nodeEnv = process.env.NODE_ENV || 'development'

// 如果项目需要上CDN，需要将图片放在public/cdn/images目录下
export const getImageSrc = (path: string) => {
	if (nodeEnv === 'development' || isCDN === false) {
		// 注意，此方式不支持SSR
		return new URL(`../assets/images/${path}`, import.meta.url).href
	} else {
		return `${CDNUrl}/xxx/${path}`
	}
}
