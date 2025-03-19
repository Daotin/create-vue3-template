<script setup lang="ts">
// import enums from '@/enums'

// console.log('⭐==>', enums.common.enumState.enabled)
</script>

<template>
	<main>Home</main>
	<el-button type="primary" class="mt-4" v-auth="'home:button'">Home按钮</el-button>
	<icon-ep-edit />
	<!-- <i-ep-edit /> 不能显示的原因是unplugin-icons默认使用i-作为前缀，但项目配置了prefix: 'icon'，所以只有<icon-ep-edit />能正常工作。 -->
	<icon-ep-delete class="custom-icon" style="color: red; font-size: 24px" />

	<BaseIcon name="avatar" size="24" />

	<hr />

	<BaseDot />
	<BaseDot type="success" size="16" />
	<BaseDot type="success" size="12" hollow />
	<BaseDot type="success" size="8" color="red">
		<span>测试</span>
	</BaseDot>
</template>
