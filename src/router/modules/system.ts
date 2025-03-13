import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
	{
		path: '/system',
		name: 'system',
		component: () => import('@/views/system/index.vue'),
		meta: {
			title: '系统管理',
			icon: 'setting',
			sort: 100,
		},
		redirect: '/system/user',
		children: [
			{
				path: 'user',
				name: 'systemUser',
				component: () => import('@/views/system/user/index.vue'),
				meta: {
					title: '用户管理',
					icon: 'user',
					keepAlive: true,
				},
			},
			// {
			// 	path: 'role',
			// 	name: 'systemRole',
			// 	component: () => import('@/views/system/role/index.vue'),
			// 	meta: {
			// 		title: '角色管理',
			// 		icon: 'role',
			// 		keepAlive: true,
			// 	},
			// },
			// {
			// 	path: 'permission',
			// 	name: 'systemPermission',
			// 	component: () => import('@/views/system/permission/index.vue'),
			// 	meta: {
			// 		title: '权限管理',
			// 		icon: 'permission',
			// 		keepAlive: true,
			// 	},
			// },
		],
	},
]

export default route
