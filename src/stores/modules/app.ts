import { defineStore } from 'pinia'

import store from '@/stores'

export const useAppStore = defineStore('app', {
	state: () => ({
		count: 0,
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
	},
})

// 在组件外使用store
// 比如如果在其他ts，js文件中使用appStore，需要使用useAppStoreWithOut，而不是useAppStore
export const useAppStoreWithOut = () => useAppStore(store)
