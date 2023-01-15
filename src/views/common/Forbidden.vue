<script lang="ts" setup>
import imgForbidden from '@/assets/icons/forbidden.svg'
</script>

<template>
	<div class="flex flex-col items-center pt-20">
		<el-image class="img" :src="imgForbidden" alt="" />
		<div class="text-gray-400 text-3xl mt-5">没有操作权限</div>
	</div>
</template>

<style scoped>
.img {
	width: 400px;
	height: 400px;
}
</style>
