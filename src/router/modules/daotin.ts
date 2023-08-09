import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/demo/form',
		name: 'demo/form',
		component: () => import('@/views/demo/search-index.vue'),
		meta: {
			title: '表单搜索',
			// keepAlive: true,
		},
	},
	{
		path: '/demo/upload',
		name: 'demo/upload',
		component: () => import('@/views/demo/upload/upload.vue'),
		meta: {
			title: '分片上传',
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
