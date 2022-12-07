import type { AppContext } from 'vue'
import { ElMessage, type MessageParamsWithType, ElMessageBox } from 'element-plus'

const info = (options: MessageParamsWithType, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.info(options, appContext)
}

const success = (options?: MessageParamsWithType, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.success(options || '操作成功', appContext)
}

const warning = (options?: MessageParamsWithType, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.warning(options, appContext)
}

const error = (options?: MessageParamsWithType, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.error(options, appContext)
}

const confirm = async function (title: string, type: any = 'warning') {
	try {
		await ElMessageBox.confirm(title, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type,
			closeOnClickModal: false,
			customClass: 'common-message-box',
		})
		return Promise.resolve()
	} catch (error) {
		return Promise.reject()
	}
}

const alert = async function (title: string, type: any = 'warning', config = {}) {
	try {
		await ElMessageBox.alert(title, '提示', {
			confirmButtonText: '确定',
			type,
			closeOnClickModal: false,
			customClass: 'common-message-box',
			...config,
		})
		return Promise.resolve()
	} catch (error) {
		return Promise.reject()
	}
}

export default {
	info,
	success,
	warning,
	error,
	alert,
	confirm,
}
