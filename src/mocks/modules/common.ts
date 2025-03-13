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
		message: '操作成功',
		body: {
			userName: '@cname',
			email: '@email',
			mobile: /^1[345789]\d{9}$/,
			avatar: '',
			createdTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
		},
	})
}
const mockGetMenuList = () => {
	return Mock.mock({
		code: 200,
		message: '操作成功',
		body: [
			{
				id: '1',
				name: 'Home',
				icon: 'avatar',
				url: '/home',
			},
			{
				id: '2',
				name: 'About1',
				icon: 'avatar',
				url: '/about',
			},
			{
				id: '3',
				name: '业务模块',
				icon: 'avatar',
				url: '',
				children: [
					{
						id: '3-1',
						name: '搜索表单',
						url: '/daotin/form',
					},
					{
						id: '3-2',
						name: '分片上传',
						url: '/daotin/upload',
					},
					{
						id: '3-3',
						name: 'echarts案例',
						url: '/daotin/echarts',
					},
				],
			},
			{
				id: '4',
				name: '系统管理',
				icon: 'avatar',
				url: '',
				children: [
					{
						id: '4-1',
						name: '用户管理',
						url: '/system/user',
					},
				],
			},
		],
	})
}
// 拦截 Ajax 请求，返回模拟的响应数据。
Mock.mock(/\/sys\/user\/info/, 'post', getUserInfo)
Mock.mock(/\/sys\/menus/, 'post', mockGetMenuList)
