<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore, useThemeStore } from '@/stores'

const appStore = useAppStore()
const themeStore = useThemeStore()

const userName = computed(() => appStore.userInfo?.userName || '')
const currentTheme = computed(() => themeStore.theme)

const systemName = process.env.VITE_SYSTEM_NAME || "Daotin2's System"

function handleCollapse() {
	appStore.isCollapse = !appStore.isCollapse
}
async function handleLogout() {
	try {
		await window.$message.confirm('确认退出登录？')
		appStore.logout()
	} catch (error) {}
}

function toggleTheme() {
	themeStore.toggleTheme()
}

onMounted(() => {})
</script>
<template>
	<div class="layouts-header-box flex items-center justify-between px-5">
		<div class="logo-box">
			<BaseIcon name="logo" :size="28" />
			<span class="font-bold f20 mx-3">{{ systemName }}</span>
			<BaseIcon
				:name="appStore.isCollapse ? 'menu-unfold' : 'menu-fold'"
				:size="24"
				class="cursor-pointer"
				@click="handleCollapse"
			/>
		</div>
		<div class="user-info">
			<span class="ml-3 mr-5 cursor-pointer" @click="toggleTheme">
				<BaseIcon :name="currentTheme === 'light' ? 'moon' : 'sun'" :size="18" />
				<span class="align-middle ml-2">{{ currentTheme === 'light' ? '暗黑模式' : '亮色模式' }}</span>
			</span>
			<span class="mr-3">
				<BaseIcon name="avatar" :size="16" />
				<span class="align-middle ml-2">{{ userName }}</span>
			</span>
			<BaseIconTip name="exit" :size="18" tip="退出" class="cursor-pointer" @click="handleLogout" />
		</div>
	</div>
</template>
<style lang="less" scoped>
.layouts-header-box {
	height: 60px;
	background-color: var(--blue);
	color: #fff;
}
</style>
