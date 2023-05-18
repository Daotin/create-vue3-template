<script setup lang="ts">
import enums from '@/enums'

console.log('⭐==>', enums.common.enumState.enabled)
</script>

<template>
	<main>Home</main>
	<el-button type="primary" class="mt-4" v-auth="'home:button'">Home按钮</el-button>
</template>
