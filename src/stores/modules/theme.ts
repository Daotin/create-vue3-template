import { defineStore } from 'pinia'
import { localMng } from '@/utils/storage-mng'
import store from '@/stores'

export type ThemeType = 'light' | 'dark'

// 主题存储的key
const THEME_KEY = 'theme_mode'

export const useThemeStore = defineStore('theme', {
	state: () => ({
		// 默认为亮色主题
		theme: (localMng.getItem(THEME_KEY) || 'light') as ThemeType,
	}),

	getters: {
		// 是否为暗色主题
		isDark: state => state.theme === 'dark',
	},

	actions: {
		// 设置主题
		setTheme(theme: ThemeType) {
			this.theme = theme
			// 同步到localStorage
			localMng.setItem(THEME_KEY, theme)
			// 更新HTML的data-theme属性
			document.documentElement.setAttribute('data-theme', theme)
		},

		// 切换主题
		toggleTheme() {
			const newTheme: ThemeType = this.theme === 'light' ? 'dark' : 'light'
			this.setTheme(newTheme)
		},

		// 初始化主题
		initTheme() {
			// 如果本地存储中有主题设置，则使用该设置
			const savedTheme = localMng.getItem(THEME_KEY) as ThemeType
			if (savedTheme) {
				this.setTheme(savedTheme)
			} else {
				// 否则尝试使用系统偏好
				this.followSystemTheme()
			}

			// 添加系统主题变化监听
			this.listenSystemThemeChange()
		},

		// 跟随系统主题
		followSystemTheme() {
			const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
			const newTheme: ThemeType = darkModeMediaQuery.matches ? 'dark' : 'light'
			this.setTheme(newTheme)
		},

		// 监听系统主题变化
		listenSystemThemeChange() {
			const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

			// 仅当用户没有明确设置主题时，才跟随系统主题
			darkModeMediaQuery.addEventListener('change', e => {
				if (!localMng.getItem(THEME_KEY)) {
					const newTheme: ThemeType = e.matches ? 'dark' : 'light'
					this.setTheme(newTheme)
				}
			})
		},
	},
})

// 在组件外使用store
export const useThemeStoreWithOut = () => useThemeStore(store)
