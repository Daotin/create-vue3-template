<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import { useAppStore } from '@/stores'
import { useRoute } from 'vue-router'
const appStore = useAppStore()
const isCollapse = computed(() => appStore.isCollapse)
const route = useRoute()
const menuList = computed(() => appStore.menuList)

const activeMenu = computed(() => {
	const { meta, path } = route
	console.log('⭐meta==>', meta)
	const activePath = meta.activePath as string
	return activePath || path
})

function handleOpen() {}
function handleClose() {}
function handleSelectMenu(url: string) {
	console.log(url)
	// const url = appStore.menuIdUrl[menuId]
	// if (url) {
	// 	router.push(url)
	// } else {
	// 	router.push('/error/not-found')
	// }
}
onMounted(() => {})
</script>
<template>
	<div class="layouts-side-box">
		<el-menu
			:default-active="activeMenu"
			class="el-menu-vertical-demo"
			:collapse="isCollapse"
			:collapse-transition="false"
			router
			@select="handleSelectMenu"
			@open="handleOpen"
			@close="handleClose"
		>
			<menu-item v-for="menu in menuList" :key="menu.url" :menus="menu"></menu-item>
		</el-menu>
	</div>
</template>
<style lang="less" scoped>
.layouts-side-box {
	.el-menu {
		border-right: 0;
	}
}
</style>
