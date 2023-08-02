<script setup lang="ts">
import { ref } from 'vue'
import { Search, RefreshRight, Setting } from '@element-plus/icons-vue'
import type { ITableConfig } from '@/models/table'

interface IProps {
	tableCode?: string
}

const props = withDefaults(defineProps<IProps>(), {})

const refTableConfig = ref()
const emit = defineEmits(['search', 'reset', 'config'])
const handleSearch = () => {
	emit('search')
}
const handleReset = () => {
	emit('reset')
}
const visibleConfig = ref(false)

const handleShowConfig = () => {
	refTableConfig.value.open()
}
const handleConfig = (config: ITableConfig) => {
	emit('config', config)
}
const showAfter = 1000
</script>

<template>
	<div class="mr-4">
		<el-tooltip :content="$t('page.product.search')" :show-after="showAfter">
			<el-button type="primary" :icon="Search" native-type="submit" @click="handleSearch" class="search-button">
			</el-button>
		</el-tooltip>
		<el-tooltip :content="$t('page.public.reset')" :show-after="showAfter">
			<el-button :icon="RefreshRight" @click="handleReset" class="search-button"> </el-button>
		</el-tooltip>
		<el-tooltip :content="$t('page.public.configList')" v-if="tableCode" :show-after="showAfter">
			<el-button :icon="Setting" @click="handleShowConfig" class="search-button"> </el-button>
		</el-tooltip>
	</div>
</template>
<style scoped lang="less">
.search-button {
	padding: 10px 12px;
}
</style>
