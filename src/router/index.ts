import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import commonRoute from './modules/common'
import daotinRoute from './modules/daotin'
import { localMng } from '@/utils/storage-mng'
import { TokenName } from '@/configs/const'
import { useAppStoreWithOut } from '@/stores'

// Configure nprogress
NProgress.configure({
	showSpinner: false, // 是否显示加载动画
	easing: 'ease', // 动画效果
	speed: 400, // 动画速度
})

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
	NProgress.start()

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

// Add progress bar complete after navigation
router.afterEach(() => {
	NProgress.done()
})

export default router
