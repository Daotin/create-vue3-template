import type { App, Directive } from 'vue'
import auth from './modules/auth'

const directives = { auth: auth }

export default {
	install(app: App) {
		Object.keys(directives).forEach(key => {
			app.directive(key, directives[key])
		})
		console.log('==directive install==')
	},
}
