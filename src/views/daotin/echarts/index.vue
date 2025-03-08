<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from 'vue'
import type { PropType } from 'vue'
import apis from '@/apis'
import useSearch from '@/hooks/business/useSearch'
import type { IGetQuerys, ISearchOption } from '@/models/search'
import message from '@/utils/message'
import TyTable from '@/components/business/TyTable.vue'
import type { ITableConfig } from '@/models/table'
import { enumOptionType } from '@/configs/enum'

import { options } from './options'

/**********************************************************************************
 * props,emits相关
 *********************************************************************************/
const props = defineProps({
	record: {
		type: Object,
		default: () => {},
	},
})

const emits = defineEmits(['refresh'])

defineExpose({
	open() {
		// option.visible.value = true
	},
})
</script>

<template>
	<div class="echarts-index h-full">
		<div class="chart-item" v-for="option in options">
			<BaseEcharts :options="option" />
		</div>
	</div>
</template>

<style lang="less" scoped>
.echarts-index {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;

	.chart-item {
		width: 100%;
		height: 400px;

		.base-echarts {
			width: 100%;
		}
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
}
</style>
