import Mock from 'mockjs'
import './modules/common'
import './modules/login'
import './modules/daotin'
import './modules/upload'
import './modules/user'

//延时数据返回
Mock.setup({
	timeout: '100-500',
})
