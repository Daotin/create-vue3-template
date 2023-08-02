import Mock from 'mockjs'
import { basicSuccess } from './common'

const mockDaotin1 = () => {
	return Mock.mock({
		code: 200,
		message: '返回成功',
		body: {
			totalElements: 100,
			totalPages: 20,
			number: 1,
			size: 5,
			numberOfElements: 100,
			first: true,
			Last: true,
			'content|10': [
				{
					'sn|+1': 100,
					productId: '@id',
					pn: '@id',
					status: "@pick(['0','1','2'])",
					deviceStatus: "@pick(['1','2','3', '4'])",
					merchantName: '@cname',
					count: '@float(1, 100, 3, 5)',
					lastTime: '@datetime',
					remark: "@pick(['xxxxxx',''])",
				},
			],
		},
	})
}

Mock.mock(/daotin1/, 'post', mockDaotin1)

// tableCode的mock
Mock.mock(/form\/config\/findOne/, 'post', basicSuccess)

// Mock.mock(/notice\/page/, 'post', basicSuccess)
// Mock.mock(/notice\/page1/, 'post', getNoticePage)
// Mock.mock(/merchant\/store\/[a-zA-Z0-9]*\/info/, 'post', basicSuccess)
