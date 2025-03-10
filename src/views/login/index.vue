<script lang="ts" setup>
import type { FormRules } from 'element-plus'
import { useAppStore } from '@/stores'
import LoginBg from '@/assets/images/login/login-bg.jpg?url'
import { waitForImageLoad } from '@/utils'
import type { ILoginParams } from '@/models/common'
const appStore = useAppStore()

const formData = reactive<ILoginParams>({
	username: 'daotin',
	password: '123',
})

const rules = reactive<FormRules>({
	username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const formRef = ref()
const submitLoading = ref(false)
async function handleLogin() {
	try {
		await formRef.value.validate()
		submitLoading.value = true
		await appStore.login(formData)
		window.$message.success('登录成功')
		// localMng.setItem(TokenName, Authorization)

		/*
		 * await appStore.getUserInfo(true)
		 * await appStore.loadSysMenuNav()
		 * router.push('/')
		 */
	} catch (error) {
		console.error(error)
	} finally {
		submitLoading.value = false
	}
}

onMounted(async () => {
	// 优化图片加载完成后再替换首页图片
	try {
		const dom = document.querySelector('.login-wrap') as HTMLElement
		await waitForImageLoad(LoginBg)
		dom!.style.backgroundImage = `url(${LoginBg})`
	} catch (error) {
		console.error(error)
	} finally {
	}
})
</script>
<template>
	<div class="login-wrap w-full h-full flex justify-center items-center">
		<div class="login-content p-5">
			<h1 class="f24 font-bold text-center">登录</h1>
			<el-form
				ref="formRef"
				label-position="top"
				label-width="100px"
				:model="formData"
				:rules="rules"
				style="max-width: 460px"
			>
				<el-form-item label="账号" prop="username">
					<el-input v-model="formData.username">
						<template #prefix>
							<icon-ep-user />
						</template>
					</el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formData.password">
						<template #prefix>
							<icon-ep-lock />
						</template>
					</el-input>
				</el-form-item>
			</el-form>
			<p class="black9">Tip: 账号密码随意</p>

			<div class="login-opt mt-3">
				<el-button type="primary" class="w-full" :loading="submitLoading" @click="handleLogin">登录</el-button>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.login-wrap {
	background: url('@/assets/images/login/login-bg-placeholder.jpg') center center no-repeat;
	background-size: cover;

	.login-content {
		width: 500px;
		margin: 0 auto;
		box-shadow: @shadow-down, @shadow-up;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 4px;
	}
}
</style>
