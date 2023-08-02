<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { ITableConfig, IColumnConfig } from '@/models/table'
import { isEmpty } from '@/utils'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface IProps {
	code?: string // TODO daotin 未使用的变量
	data: Array<any>
	loading: boolean
	tableConfig: ITableConfig
	total: number
	page: number
	size: number
	showCheckBox: boolean
	rowClassName?: Function
	layout?: string
	prevText?: string
	nextText?: string
}
const props = withDefaults(defineProps<IProps>(), {
	loading: false,
	showCheckBox: false,
	layout: 'total,prev,pager,next',
	prevText: undefined,
	nextText: undefined,
})
const emit = defineEmits(['handleCurrentChange', 'selection-change', 'row-click'])

const renderList = computed(() => {
	return props.tableConfig.configs
		.filter(item => {
			if (item.display == '0') return false
			if (item.visible) {
				return item.visible()
			}
			return true
		})
		.sort((a, b) => {
			return (a.sort || 0) - (b.sort || 0)
		})
})

// 匹配"2019-01-01 12:00:00" 时间格式的正则表达式
const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

const renderTableFiled = (row: Object, config: IColumnConfig) => {
	const { formatter, key } = config
	const initValue = row[key]
	if (!formatter) return initValue
	if (formatter === '--' && isEmpty(initValue)) {
		return '--'
	}
	if (formatter === '0.0') {
		return initValue.toFixed(1)
	}
	if (formatter === '0.00') {
		return initValue.toFixed(2)
	}
	if (formatter === 'enum' && config.enumModelDic) {
		return t(`dic.${config.enumModelDic!}_${row[config.key]}`)
	}
	if (typeof formatter === 'function') {
		return formatter(initValue)
	}
	return initValue
}

const handleSelectionChange = val => {
	emit('selection-change', val)
}
const rowClassNameFn = ({ row, rowIndex }) => {
	if (props.rowClassName) return props.rowClassName(row)
	return ''
}
const handleRowClick = row => {
	emit('row-click', row)
}

const handleCurrentChange = (val: number) => {
	emit('handleCurrentChange', val)
}
</script>
<template>
	<el-table
		border
		:data="data"
		v-loading="loading"
		@selection-change="handleSelectionChange"
		:row-class-name="rowClassNameFn"
		@row-click="handleRowClick"
		empty-text="暂无数据"
		v-bind="$attrs"
	>
		<el-table-column type="selection" width="55" v-if="showCheckBox" />
		<template v-for="item in renderList" v-show="item.visible ? item.visible() : true">
			<slot :name="`table-${item.key}`">
				<el-table-column
					:prop="item.key"
					:label="tableConfig.i18nDisable ? item.value : $t(item.value || '')"
					:width="item.width || 'auto'"
					:min-width="item.minWidth || 'auto'"
					:show-overflow-tooltip="tableConfig.isSingleLine"
				>
					<template #default="scope">
						<!-- 日期时间截断 -->
						<template v-if="item.formatter === 'date' && dateRegex.test(scope.row[item.key])">
							<div>{{ scope.row[item.key].split(' ')[0] || '-' }}</div>
							<div>{{ scope.row[item.key].split(' ')[1] || '-' }}</div>
						</template>
						<!-- BaseDot -->
						<template v-else-if="item.formatter === 'dot'">
							<BaseDot :type="item.enumModel!.getColor(scope.row[item.key])">{{
								t(`dic.${item.enumModelDic!}_${scope.row[item.key]}`)
							}}</BaseDot>
						</template>
						<template v-else>{{ renderTableFiled(scope.row, item) }}</template>
					</template>
				</el-table-column>
			</slot>
		</template>
		<slot name="handle"></slot>
	</el-table>
	<el-pagination
		:total="total"
		:page-size="size"
		:current-page="page"
		@current-change="handleCurrentChange"
		:pager-count="5"
		hide-on-single-page
		class="mt-8 text-center mb-2"
		background
		:layout="layout"
		:prev-text="prevText"
		:next-text="nextText"
	>
	</el-pagination>
</template>
