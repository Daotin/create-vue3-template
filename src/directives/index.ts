import type { App } from 'vue'
import auth from './modules/auth'

const directives = { auth } as any

export default {
	install(app: App) {
		Object.keys(directives).forEach(key => {
			app.directive(key, directives[key])
		})
		console.log('==directive install==')
	},
}
