import Mock from 'mockjs'
import { basicSuccess } from './common'

const login = () => {
	return Mock.mock({
		code: 200,
		message: '操作成功',
		body: {
			token: 'XIAOYIILOVEYOU',
		},
	})
}

// 拦截 Ajax 请求，返回模拟的响应数据。
Mock.mock(/sys\/login/, 'post', login)
Mock.mock(/sys\/logout/, 'post', basicSuccess)
