import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
	{
		path: '/about',
		name: 'about',
		component: () => import('@/views/AboutView.vue'),
		meta: {
			title: '关于',
		},
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/HomeView.vue'),
		meta: {
			title: '首页',
		},
	},
	{
		name: 'NotFound',
		path: '/error/not-found',
		component: () => import('@/views/common/NotFound.vue'),
		meta: {
			title: '页面丢失',
		},
	},
	{
		name: 'Forbidden',
		path: '/error/forbidden',
		component: () => import('@/views/common/Forbidden.vue'),
		meta: {
			title: '无权限',
		},
	},
]

export default route
