import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/daotin/form',
		name: 'daotin/form',
		component: () => import('@/views/daotin/search-index.vue'),
		meta: {
			title: '表单搜索',
			// keepAlive: true,
		},
	},
	{
		path: '/daotin/upload',
		name: 'daotin/upload',
		component: () => import('@/views/daotin/upload/index.vue'),
		meta: {
			title: '分片上传',
			// keepAlive: true,
		},
	},
	{
		path: '/daotin/echarts',
		name: 'daotin/echarts',
		component: () => import('@/views/daotin/echarts/index.vue'),
		meta: {
			title: 'echarts案例',
			// keepAlive: true,
		},
	},
	// {
	// 	path: '/ra/detail/:id',
	// 	name: 'ra/detail',
	// 	component: () => import('@/views/remoteAssist/detail.vue'),
	// 	props: true,
	// 	meta: {
	// 		title: 'page.route.ra',
	// 		activePath: '/ra/list',
	// 	},
	// },
]

export default routes
