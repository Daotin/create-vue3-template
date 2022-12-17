<script lang="ts" setup>
interface IProps {
	menus: any
}
defineProps<IProps>()
</script>

<template>
	<el-sub-menu v-if="menus.children" :index="menus.url">
		<template #title>
			<BaseIcon v-if="menus.icon" :name="menus.icon" />
			<span class="ml-2">{{ menus.name }}</span>
		</template>
		<MenuItem v-for="childMenus in menus.children" :key="childMenus.id" :menus="childMenus" />
	</el-sub-menu>

	<el-menu-item v-else class="flex items-center" :index="menus.url">
		<BaseIcon v-if="menus.icon" :name="menus.icon" />
		<span v-else class="text-lg">•</span>
		<template #title>
			<span class="ml-2">{{ menus.name }}</span>
		</template>
	</el-menu-item>
</template>
<style lang="less" scoped>
.el-menu-item {
	&.is-active {
		background-color: @blue;
		color: #fff;
	}
}
</style>
