import Mock from 'mockjs'
import { basicSuccess } from './common'

// 获取用户列表
const mockUserList = () => {
	return Mock.mock({
		code: 200,
		message: 'success',
		body: {
			totalElements: 12,
			totalPages: 2,
			number: 1,
			size: 5,
			numberOfElements: 12,
			first: true,
			Last: true,
			'content|12': [
				{
					'id|+1': 1,
					username: '@word(5, 10)',
					realName: '@cname',
					email: '@email',
					'phone|1': [
						'13@integer(100000000, 999999999)',
						'15@integer(100000000, 999999999)',
						'17@integer(100000000, 999999999)',
					],
					'gender|0-2': 0,
					'status|0-2': 0,
					avatar: '@image("100x100", "#4A7BF7", "Avatar")',
					createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
					updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
					lastLoginTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
					'roles|1-3': [
						{
							'id|+1': 1,
							'name|+1': ['管理员', '普通用户', '访客', '运维', '开发'],
						},
					],
				},
			],
		},
	})
}

// 获取用户详情
const mockUserDetail = () => {
	return Mock.mock({
		code: 200,
		message: 'success',
		body: {
			id: '@integer(1, 100)',
			username: '@word(5, 10)',
			realName: '@cname',
			email: '@email',
			'phone|1': [
				'13@integer(100000000, 999999999)',
				'15@integer(100000000, 999999999)',
				'17@integer(100000000, 999999999)',
			],
			'gender|0-2': 0,
			'status|0-2': 0,
			avatar: '@image("100x100", "#4A7BF7", "Avatar")',
			createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
			updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
			lastLoginTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
			'roles|1-3': [
				{
					'id|+1': 1,
					'name|+1': ['管理员', '普通用户', '访客', '运维', '开发'],
				},
			],
		},
	})
}

// 注册mock接口
Mock.mock(/\/user\/list/, 'post', mockUserList)
Mock.mock(/\/user\/\d+$/, 'post', mockUserDetail)
Mock.mock(/\/user\/\d+$/, 'post', basicSuccess)
Mock.mock(/\/user\/batch/, 'post', basicSuccess)
Mock.mock(/\/user\/\d+\/status/, 'post', basicSuccess)
