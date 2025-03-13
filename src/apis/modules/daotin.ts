import request from '@/utils/request'

// 原始写法
export const apiDaotin1 = data => request.post('/daotin1', data)

// body是个对象
export const apiDaotin2 = async () => {
	const res = await request.post('/daotin2')

	res.body = {
		allDuration: res.body?.totalTime || '',
		allCount: res.body?.totalCount || '',
		solved: res.body?.dealRate || '',
		allDevice: res.body?.totalDeviceCount || '',
	}

	return res
}

// body是个对象数组
export const apiDaotin3 = async () => {
	const res = await request.post('/daotin3')
	const body = res.body || []
	const bodyWeb = [] as any

	body.forEach(item => {
		bodyWeb.push({
			id: item.id || '',
			sn: item.sn || '',
			productName: item.productName || '',
			pn: item.pn || '',
			merchantName: item.merchantName || '',
			deptName: item.deptName || '',
			startTime: item.startTime || '',
			remoteDuration: item.processTime || '0',
			solved: item.feedback || '',
			operator: item.operatorName || '',
		})
	})

	res.body = bodyWeb

	return res
}

// 分页列表接口
export const apiDaotin4 = async data => {
	const params = data
	const res = await request.post('/daotin4', params)
	const { content = [] } = res.body
	const contentWeb = [] as any

	content.forEach(item => {
		contentWeb.push({
			id: item.id || '',
			sn: item.sn || '',
			productName: item.productName || '',
			pn: item.pn || '',
			merchantName: item.merchantName || '',
			deptName: item.deptName || '',
			startTime: item.startTime || '',
			remoteDuration: item.processTime || '0',
			solved: item.feedback || '',
			operator: item.operatorName || '',
		})
	})

	if (res.body.content) {
		res.body.content = contentWeb
	}

	return res
}
