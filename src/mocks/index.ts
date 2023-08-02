import Mock from 'mockjs'
import './modules/common'
import './modules/login'
import './modules/daotin'

//延时数据返回
Mock.setup({
	timeout: '100-1000',
})
