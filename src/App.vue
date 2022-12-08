<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import IconLogo from '@/assets/icons/common/logo'

import { useAppStore } from '@/stores'

const appStore = useAppStore()

const radio1 = ref('1')
</script>

<template>
	<header>
		<div class="wrapper">
			<nav>
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
			</nav>

			<hr />

			<span class="mr-5">111</span>
			<span class="flex">222</span>

			<el-radio-group v-model="radio1" class="ml-4">
				<el-radio label="1" size="large">Option 1</el-radio>
				<el-radio label="2" size="large">Option 2</el-radio>
			</el-radio-group>

			<hr />

			<div>
				<span class="count">app-count: {{ appStore.count }}</span>
				<el-button type="primary" @click="appStore.increment()">+1</el-button>
			</div>

			<hr />

			1111

			<icon-logo></icon-logo>

			<!-- <BaseIcon color="#000" :size="22">
				<IconCustomCommonLogo />
			</BaseIcon> -->
		</div>
	</header>

	<RouterView />
</template>

<style lang="less" scoped>
header {
	line-height: 1.5;
	max-height: 100vh;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}

nav a.router-link-exact-active {
	color: var(--color-text);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

.count {
	color: @blue;
}
</style>
