import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import commonRoute from './modules/common'

// 不需要鉴权的外部界面
const outerPaths: RouteRecordRaw[] = [
	// {
	//   path: "/",
	//   redirect: "/login",
	// },
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
]

// 需要鉴权的界面
const innerPaths: RouteRecordRaw[] = [
	{
		name: 'Portal',
		path: '/portal',
		// redirect: "/welcome",
		component: () => import('@/layouts/index.vue'),
		children: [...commonRoute],
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
})

// 全局路由守卫
router.beforeEach(async to => {
	const title = (to.meta && (to.meta.title as string)) || ''
	if (title) {
		document.title = title
	}
	// const appStore = useAppStoreWithOut();

	// const token = localMng.getItem(TokenName);
	// console.log(token, to.path);
	// if (!token) {
	//   if (to.path !== "/login") {
	//     return "/login";
	//   }
	// } else {
	//   // 从后端获取菜单（保证菜单是最新的，因为有可能管理员会修改菜单权限）
	//   appStore.getMenuList();
	// }
})

export default router
