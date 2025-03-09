<script setup lang="ts">
// 导入并初始化主题
import { useThemeStore } from '@/stores'
useThemeStore().initTheme()
</script>

<template>
	<router-view></router-view>
</template>

<style lang="less">
#app {
	height: 100vh;
}
</style>
