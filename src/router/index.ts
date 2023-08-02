import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

import commonRoute from './modules/common'
import daotinRoute from './modules/daotin'
import { localMng } from '@/utils/storage-mng'
import { TokenName } from '@/configs/const'
import { useAppStoreWithOut } from '@/stores'

// 不需要鉴权的外部界面
const outerPaths: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		name: 'icons',
		path: '/icons',
		component: () => import('@/components/business/iconPreview.vue'),
		meta: {
			title: 'icon预览',
		},
	},
]

// 需要鉴权的界面
const innerPaths: RouteRecordRaw[] = [
	{
		name: 'Portal',
		path: '/portal',
		component: () => import('@/layouts/index.vue'),
		children: [...commonRoute, ...daotinRoute],
	},
]

const routes: RouteRecordRaw[] = [
	...outerPaths,
	...innerPaths,
	{
		path: '/:pathMatch(.*)*',
		redirect: '/error/not-found',
	},
]

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior() {
		return {
			el: '#app',
			top: 0,
			behavior: 'smooth',
		}
	},
})

// 全局路由守卫
router.beforeEach(async to => {
	const appStore = useAppStoreWithOut()
	const title = (to.meta && (to.meta.title as string)) || ''
	if (title) {
		document.title = title
	}
	// 外部界面，直接访问
	const outerPathNames = outerPaths.map(item => item.path)
	if (outerPathNames.includes(to.path)) {
		return true
	}

	const token = localMng.getItem(TokenName)
	console.log(token, to.path)

	if (!token) {
		if (to.path !== '/login') {
			window.$message.warning('登录已超时')
			return '/login'
		}
	} else {
		// 从后端获取菜单（保证菜单是最新的，因为有可能管理员会修改菜单权限）
		appStore.getUserInfo()
		appStore.getMenuList()
	}
})

export default router
