<script lang="ts" setup>
import HeaderBar from './components/HeaderBar.vue'
import SideBar from './components/SideBar.vue'
import { useAppStore } from '@/stores'
const appStore = useAppStore()
const isCollapse = computed(() => appStore.isCollapse)
</script>
<template>
	<el-container class="layouts-wrap h-full flex flex-col overflow-hidden">
		<el-header>
			<HeaderBar />
		</el-header>
		<el-container class="overflow-hidden">
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
		box-shadow: var(--shadow-down);
		z-index: 100;
	}

	:deep(.el-aside) {
		box-shadow: var(--shadow-right);
		z-index: 10;
		transition: width 0.2s;
		background-color: var(--bgc);
		will-change: background-color, color;
	}

	:deep(.el-main) {
		padding: 20px;
		padding-bottom: 0;
		background-color: var(--bgc);

		.main-content {
			padding: 20px;
			background-color: var(--main-bg-color);
			will-change: background-color, color;
			border-radius: 4px;
			overflow: hidden;
			overflow-y: auto;
		}
	}
}
</style>
