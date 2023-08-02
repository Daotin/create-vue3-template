<script lang="ts" setup>
import HeaderBar from './components/HeaderBar.vue'
import SideBar from './components/SideBar.vue'
import { useAppStore } from '@/stores'
const appStore = useAppStore()
const isCollapse = computed(() => appStore.isCollapse)
</script>
<template>
	<el-container class="layouts-wrap h-full flex flex-col">
		<el-header>
			<HeaderBar />
		</el-header>
		<el-container>
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<SideBar />
			</el-aside>
			<el-main>
				<div class="main-content w-full h-full">
					<router-view></router-view>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>
<style lang="less" scoped>
.layouts-wrap {
}
.el-container {
	:deep(.el-header) {
		padding: 0;
		box-shadow: @shadow-down;
		z-index: 100;
	}
	:deep(.el-aside) {
		box-shadow: @shadow-right;
		z-index: 10;
		transition: width 0.2s;
	}
	:deep(.el-main) {
		padding: 20px;
		padding-bottom: 0;
		background-color: @bgc;
		.main-content {
			padding: 20px;
			background-color: #fff;
			border-radius: 4px;
		}
	}
}
</style>
