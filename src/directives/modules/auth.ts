import type { Directive } from 'vue'
import { checkPermission } from '@/utils'

const auth: Directive<HTMLElement, string | undefined> = {
	mounted(el, binding) {
		if (!checkPermission(binding.value)) {
			el.remove()
		}
	},
}

export default auth
