<script lang="ts" setup>
import HeaderBar from './components/HeaderBar.vue'
import SideBar from './components/SideBar.vue'
import { useAppStore, useBreadcrumbStore } from '@/stores'
import { useRouter } from 'vue-router'

const appStore = useAppStore()
const breadcrumbStore = useBreadcrumbStore()
const router = useRouter()
const isCollapse = computed(() => appStore.isCollapse)

// 面包屑导航处理
const breadcrumbList = computed(() => breadcrumbStore.getBreadcrumbList)

// 点击面包屑项进行路由跳转
const handleBreadcrumbClick = item => {
	if (!item.disabled) {
		router.push(item.path)
	}
}
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
				<!-- 添加面包屑导航 -->
				<div class="breadcrumb-container">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="item.path">
							{{ item.title }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="main-content w-full">
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

		// 面包屑样式
		.breadcrumb-container {
			margin-bottom: 16px;
			padding: 8px 16px;
			background-color: var(--main-bg-color);
			border-radius: 4px;
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

			:deep(.el-breadcrumb) {
				font-size: 14px;
				line-height: 24px;

				.el-breadcrumb__item {
					.el-breadcrumb__inner {
						color: var(--el-text-color-regular);
						font-weight: normal;

						&.is-link {
							color: var(--el-color-primary);
							cursor: pointer;

							&:hover {
								color: var(--el-color-primary-light-3);
							}
						}
					}

					&:last-child {
						.el-breadcrumb__inner {
							color: var(--el-text-color-secondary);
							cursor: default;
						}
					}
				}
			}
		}

		.main-content {
			height: calc(100% - 46px);
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
