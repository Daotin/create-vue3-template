<script setup lang="ts">
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
			<el-button type="primary" native-type="submit" @click="handleSearch" class="search-button">
				<template #icon>
					<icon-ep-search />
				</template>
				<span>搜索</span>
			</el-button>
		</el-tooltip>
		<el-tooltip :content="$t('page.public.reset')" :show-after="showAfter">
			<el-button @click="handleReset" class="search-button">
				<template #icon>
					<icon-ep-refresh />
				</template>
				<span>重置</span>
			</el-button>
		</el-tooltip>
		<el-tooltip :content="$t('page.public.configList')" v-if="tableCode" :show-after="showAfter">
			<el-button @click="handleShowConfig" class="search-button">
				<template #icon>
					<icon-ep-setting />
				</template>
				<span>配置</span>
			</el-button>
		</el-tooltip>
	</div>
</template>
<style scoped lang="less">
.search-button {
	padding: 10px 12px;
}
</style>
