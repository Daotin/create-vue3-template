<script lang="ts" setup>
/**
 * @description: 搜索表单组件
 * @created: 2021-04-29 10:00:00
 * @updated: 2021-04-29 10:00:00
 * @example 使用示例：
 *  <TySearchForm
			ref="searchForm"
			:search-form-ref="search.formRef"
			:search-config="searchConfig"
			@handle-search="search.handleSearch"
			@reset-search="search.resetSearch"
		>
			<template #opt>
				<el-button type="primary" @click="handleAdd">新增</el-button>
			</template>
		</TySearchForm>
 */

import { reactive, ref, onMounted, type VNodeRef, type PropType } from 'vue'
import { EnumFormType, type ISearchFromItem } from '@/models/searchForm'
import type { DatePickType } from 'element-plus'
import { isEmpty } from '@/utils/index'

/*******************************************************
 * prop,emits,expose
 *******************************************************/
const props = defineProps({
	// 【必填】表单配置数组
	searchConfig: {
		type: Array as PropType<ISearchFromItem[]>,
		default: () => [],
	},
	// 【必填】从外部传入formRef，便于从外部控制重置、校验
	searchFormRef: {
		type: Object as PropType<VNodeRef>,
		default: null,
	},
	// 【非必填】每个表格的唯一标识
	tableCode: {
		type: String,
		default: '',
	},
	// 【非必填，如果传入了tableCode则必填】更新搜索配置后的更新函数
	handleUpdateConfig: {
		type: Function,
		default: () => {},
	},
	// 【非必填】是否显示折叠按钮
	showFold: {
		type: Boolean,
		default: true,
	},
	// 【非必填】默认是否折叠
	isFold: {
		type: Boolean,
		default: true,
	},
	// 【非必填】默认显示表单个数
	searchCount: {
		type: Number,
		default: 2,
	},
})

const emits = defineEmits(['handleSearch', 'resetSearch'])

defineExpose({
	// 获取查询条件
	getQuerys: () => {
		return querys
	},
	getCriteriaQuerys: () => {
		return props.searchConfig.map(item => {
			// 如果是级联选项，则取最后一个值
			if (item.mode === EnumFormType.cascader) {
				return {
					type: 'equals',
					key: item.prop,
					value: querys[item.prop]?.[querys[item.prop]?.length - 1],
				}
			}
			return {
				type: item.comparator,
				key: item.prop,
				value: querys[item.prop],
			}
		})
	},
})

/*******************************************************
 * 表单操作
 *******************************************************/
// 选择日期后，默认时间从00:00:00到23:59:59
const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])

const querys = reactive({} as any)
const querysBak = reactive({}) // 保存一份初始值

const ElDateMap = {
	[EnumFormType.date]: 'date',
	[EnumFormType.dateRange]: 'daterange',
	[EnumFormType.datetime]: 'datetime',
	[EnumFormType.datetimeRange]: 'datetimerange',
} as {
	[x: string]: DatePickType
}

// 初始化查询querys
const initParams = () => {
	if (props.searchConfig.length) {
		props.searchConfig.forEach((ele: ISearchFromItem) => {
			// 设置默认值
			querys[ele.prop] = ''
			// 获取传入的默认值
			const { defaultValue } = ele
			if (!isEmpty(defaultValue)) {
				querys[ele.prop] = defaultValue
			}
		})
		console.log('initParams==>', JSON.stringify(querys))
		// 保存一份初始值
		Object.assign(querysBak, querys)
	}
}
const resetSearch = () => {
	initParams()
	console.log('initParams2==>', JSON.stringify(querys))
	emits('handleSearch')
}

// 修改查询条件之后，是否触发查询
const handleChangeSearch = (item: ISearchFromItem) => {
	const { refresh } = item
	if (refresh) emits('handleSearch')
}

/*******************************************************
 *  搜索折叠
 *******************************************************/
const showFoldButton = ref(props.searchConfig.length <= props.searchCount ? false : props.showFold) // 是否显示折叠按钮
const isFold = ref(showFoldButton.value ? props.isFold : false) // 是否折叠

// 清空querys中除了前searchCount个元素的其他字段的值
function clearAfterSearchCount() {
	// 获取searchConfig中前searchCount个元素的prop
	const searchCount = props.searchCount
	const searchConfig = props.searchConfig
	const searchConfigProps = searchConfig.slice(0, searchCount).map(item => item.prop)

	// 清空querys中除了searchConfigProps的其他字段
	Object.keys(querys).forEach(key => {
		if (!searchConfigProps.includes(key)) {
			delete querys[key]
		}
	})
	// console.log('querys==========', querys)
	// console.log('querysBak==========', querysBak)
	// console.log('searchConfigProps==========', searchConfigProps)

	let existQuery = {} as any
	searchConfigProps.forEach(key => {
		existQuery[key] = querys[key]
	})
	Object.assign(querys, querysBak, existQuery)
}

// 切换折叠状态
function toggleFold() {
	isFold.value = !isFold.value
	// 如果是折叠状态，则清空搜索条件
	if (isFold.value) {
		clearAfterSearchCount()
		emits('handleSearch')
	}
}

/*******************************************************
 * 生命周期
 *******************************************************/
onMounted(() => {
	initParams()
})
</script>

<template>
	<el-form class="search-con" :inline="true" :model="querys" :ref="searchFormRef" @submit.native.prevent>
		<template v-for="(item, index) in searchConfig">
			<template v-if="!isFold || index < searchCount">
				<slot :name="`search-${item.prop}`">
					<el-form-item :prop="item.prop">
						<!-- 文本框 -->
						<el-input
							v-if="item.mode === EnumFormType.input"
							v-model.trim="querys[item.prop]"
							v-bind="item.attrs"
							:placeholder="item.label"
							:clearable="item.clearable === false ? false : true"
						></el-input>
						<!-- 下拉框 -->
						<el-select
							v-else-if="item.mode === EnumFormType.select"
							v-model="querys[item.prop]"
							v-bind="item.attrs"
							:placeholder="item.label"
							@change="() => handleChangeSearch(item)"
							:clearable="item.clearable === false ? false : true"
							filterable
						>
							<el-option
								v-for="option in item.selectOption?.origin"
								:key="option.id"
								:label="$t(`dic.${item.selectOptionDic}_${option.id}`)"
								:value="option.id"
							></el-option>
						</el-select>

						<!-- 级联选择器 -->
						<el-cascader
							v-else-if="item.mode === EnumFormType.cascader"
							:placeholder="item.label"
							v-model="querys[item.prop]"
							v-bind="item.attrs"
							:options="item.cascaderOption"
							@change="() => handleChangeSearch(item)"
							:clearable="item.clearable === false ? false : true"
							filterable
						/>
						<!-- 时间、日期选择器 -->
						<el-date-picker
							v-else-if="
								[EnumFormType.date, EnumFormType.dateRange, EnumFormType.datetime, EnumFormType.datetimeRange].includes(
									item.mode
								)
							"
							:type="ElDateMap[item.mode]"
							v-bind="item.attrs"
							:placeholder="item.label"
							v-model="querys[item.prop]"
							value-format="YYYY-MM-DD HH:mm:ss"
							:default-time="item.attrs?.defaultTime || defaultTime"
							@change="() => handleChangeSearch(item)"
							:clearable="item.clearable === false ? false : true"
							:range-separator="item.attrs?.['range-separator'] || $t('page.common.to')"
							:start-placeholder="item.attrs?.['start-placeholder'] || $t('page.common.startTime')"
							:end-placeholder="item.attrs?.['end-placeholder'] || $t('page.common.endTime')"
						></el-date-picker>
					</el-form-item>
				</slot>
			</template>
		</template>
		<el-form-item>
			<BaseSearchButton
				:table-code="tableCode"
				@config="handleUpdateConfig"
				@search="emits('handleSearch')"
				@reset="resetSearch"
			/>
			<el-button v-if="showFoldButton" class="toggle-btn" :class="{ active: !isFold }" @click="toggleFold">
				<BaseIcon name="search-expand" :size="12" />
				<span class="ml-1">{{ isFold ? '展开筛选' : '收起筛选' }}</span>
			</el-button>
		</el-form-item>
		<el-form-item>
			<slot name="opt"></slot>
		</el-form-item>
	</el-form>
</template>
<style lang="less" scoped>
.toggle-btn {
	margin-left: -8px;
	padding: 10px;
	&.active {
		color: @blue;
		background-color: @bgc-blue;
		border-color: @blue;
	}
}
</style>
