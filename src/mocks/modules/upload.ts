import Mock from 'mockjs'
import { basicSuccess } from './common'

const mockUpload = () => {
	return Mock.mock({
		code: 200,
		message: '返回成功',
		body: {},
	})
}

Mock.mock(/daotin\/uploadChunk/, 'post', mockUpload)

// tableCode的mock
Mock.mock(/form\/config\/findOne/, 'post', basicSuccess)

// Mock.mock(/notice\/page/, 'post', basicSuccess)
// Mock.mock(/notice\/page1/, 'post', getNoticePage)
// Mock.mock(/merchant\/store\/[a-zA-Z0-9]*\/info/, 'post', basicSuccess)
