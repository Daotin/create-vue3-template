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
	<div class="echarts-index">echarts-index</div>
</template>

<style lang="less" scoped>
.echarts-index {
}
</style>
