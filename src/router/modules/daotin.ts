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
