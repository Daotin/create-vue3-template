import { defineStore } from 'pinia'
import { localMng } from '@/utils/storage-mng'
import { TokenName } from '@/configs/const'
import request from '@/utils/request'
import store from '@/stores'
import { useRouter } from 'vue-router'
import router from '@/router'

// const router = useRouter() // TIPS: vue组件之外不能使用useRouter，需使用import router from '@/router'方式

export const useAppStore = defineStore('app', {
	state: () => ({
		count: 0,
		isCollapse: false, // 是否收起菜单
		token: '',
		userInfo: {}, // 用户信息
		menuList: [], // 菜单列表
	}),
	getters: {
		doubleCount: state => state.count * 2,
	},
	actions: {
		increment() {
			this.count++
			window.$message.success('+1')
		},
		randomizeCount() {
			this.count = Math.round(100 * Math.random())
		},
		async getUserInfo() {
			try {
				const body = await window.$apis.common.apiGetUserInfo()
				this.userInfo = body || {}
			} catch (error) {
				console.error(error)
			} finally {
			}
		},
		async getMenuList() {
			try {
				const body = await window.$apis.common.apiGetMenuList()
				this.menuList = body || []
			} catch (error) {
				console.error(error)
			} finally {
			}
		},
		async login(data: any) {
			const { token } = await window.$apis.login.login(data)
			this.token = token || ''
			localMng.setItem(TokenName, this.token)
			request.setHeader({
				Authorization: this.token,
			})
			await this.getUserInfo()
			router.push('/')
		},
		async logout() {
			await window.$apis.login.logout()
			router.replace('/login')
			localMng.removeItem(TokenName)
			request.setHeader({
				Authorization: '',
			})
			// 还原store
			this.$reset()
		},
	},
})

// 在组件外使用store
// 比如如果在其他ts，js文件中使用appStore，需要使用useAppStoreWithOut，而不是useAppStore
export const useAppStoreWithOut = () => useAppStore(store)
