<script lang="ts" setup>
import img404 from '@/assets/icons/404.svg'
</script>

<template>
	<div class="not-found">
		<div>
			<el-image :src="img404" alt="" />
			<div class="f20 mt-5">页面丢失了哟</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.not-found {
	height: 100%;
	background-color: #fff;
	text-align: center;

	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
