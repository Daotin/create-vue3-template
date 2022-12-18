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
		async login(data: any) {
			const { token = '' } = await window.$apis.login.login(data)
			this.token = token
			localMng.setItem(TokenName, token)
			request.setHeader({
				Authorization: this.token,
			})
			// await this.getUserInfo()
			router.push('/')
		},
	},
})

// 在组件外使用store
// 比如如果在其他ts，js文件中使用appStore，需要使用useAppStoreWithOut，而不是useAppStore
export const useAppStoreWithOut = () => useAppStore(store)
