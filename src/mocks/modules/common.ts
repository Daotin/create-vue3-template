import Mock from 'mockjs'

// 定义通用的成功返回值
export const basicSuccess = () => {
	return {
		code: 200,
		message: '操作成功',
	}
}

const getUserInfo = () => {
	return Mock.mock({
		code: 200,
		body: {
			id: 1,
			userName: '@email',
			email: '@email',
			mobile: /^1[345789]\d{9}$/,
			avatar: '',
			createdTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
		},
	})
}

// 拦截 Ajax 请求，返回模拟的响应数据。
Mock.mock(/\/sys\/users\/info/, 'post', getUserInfo)
