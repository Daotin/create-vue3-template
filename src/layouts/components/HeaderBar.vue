<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores'
const appStore = useAppStore()

function handleCollapse() {
	appStore.isCollapse = !appStore.isCollapse
}
onMounted(() => {})
</script>
<template>
	<div class="layouts-header-box flex items-center justify-between px-5">
		<div class="logo-box">
			<BaseIcon name="logo" :size="28" />
			<span class="font-bold f20 mx-3">Daotin's System</span>
			<BaseIcon
				:name="appStore.isCollapse ? 'menu-unfold' : 'menu-fold'"
				:size="24"
				class="cursor-pointer"
				@click="handleCollapse"
			/>
		</div>
		<div class="user-info">
			<span class="mr-3">
				<BaseIcon name="avatar" :size="16" />
				<span class="align-middle ml-2">Daotin</span>
			</span>
			<BaseIconTip name="exit" :size="18" tip="退出" class="cursor-pointer" />
		</div>
	</div>
</template>
<style lang="less" scoped>
.layouts-header-box {
	height: 60px;
	background-color: @blue;
	color: #fff;
}
</style>
