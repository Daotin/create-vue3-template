import { defineStore } from 'pinia'
import { type RouteLocationMatched } from 'vue-router'
import store from '@/stores'

export interface BreadcrumbItem {
	path: string
	title: string
	disabled: boolean
}

export const useBreadcrumbStore = defineStore('breadcrumb', {
	state: () => ({
		breadcrumbList: [] as BreadcrumbItem[],
	}),
	getters: {
		getBreadcrumbList: state => state.breadcrumbList,
	},
	actions: {
		// 设置面包屑数据
		setBreadcrumb(matched: RouteLocationMatched[]) {
			const breadcrumbList: BreadcrumbItem[] = []

			matched.forEach((route, index) => {
				// 获取路由的meta信息中的title
				const title = (route.meta?.title as string) || (route.name as string) || '未命名'

				// 生成面包屑项
				const breadcrumbItem: BreadcrumbItem = {
					path: route.path,
					title,
					disabled: index === matched.length - 1, // 最后一项不可点击
				}

				breadcrumbList.push(breadcrumbItem)
			})

			this.breadcrumbList = breadcrumbList
		},

		// 清空面包屑
		clearBreadcrumb() {
			this.breadcrumbList = []
		},
	},
})

// 在组件外使用store
export const useBreadcrumbStoreWithOut = () => useBreadcrumbStore(store)
