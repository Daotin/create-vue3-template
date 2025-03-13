import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/daotin',
		name: 'daotin',
		redirect: '/daotin/form',
		meta: {
			title: '业务模块',
		},
		children: [
			{
				path: 'form',
				name: 'daotinForm',
				component: () => import('@/views/daotin/search-index.vue'),
				meta: {
					title: '表单搜索',
					// keepAlive: true,
				},
			},
			{
				path: 'upload',
				name: 'daotinUpload',
				component: () => import('@/views/daotin/upload/index.vue'),
				meta: {
					title: '分片上传',
					// keepAlive: true,
				},
			},
			{
				path: 'echarts',
				name: 'daotinEcharts',
				component: () => import('@/views/daotin/echarts/index.vue'),
				meta: {
					title: 'echarts案例',
					// keepAlive: true,
				},
			},
		],
	},
]

export default routes
