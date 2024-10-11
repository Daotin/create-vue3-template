<script setup lang="ts">
import { onMounted, reactive, ref, watch, computed, type PropType } from 'vue'
import apis from '@/apis'
import useSearch from '@/hooks/business/useSearch'
import type { ISearchOption } from '@/models/search'
import message from '@/utils/message'
import TyTable from '@/components/business/TyTable.vue'
import TySearchForm from '@/components/business/TySearchForm.vue'
import type { ITableConfig } from '@/models/table'
import { EnumFormType, type ISearchFromItem } from '@/models/searchForm'
import { enumOptionType, enumTaskPublishScope, enumDeviceStatus } from '@/configs/enum'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// TODO daotin：搜索 xxx
/********************************************************************
 * 表单搜索区域
 ********************************************************************/
const searchForm = ref()
const searchConfig = ref<ISearchFromItem[]>([
	{
		label: '产品名称',
		prop: 'productName',
		comparator: 'contains',
		mode: EnumFormType.input,
		defaultValue: 'P30',
	},
	{
		label: '产品型号',
		prop: 'pn',
		comparator: 'equals',
		mode: EnumFormType.cascader,
		cascaderOption: [
			{
				value: 'P30',
				label: 'P30',
				children: [
					{
						value: 'P30-1',
						label: 'P30-1',
					},
					{
						value: 'P30-2',
						label: 'P30-2',
					},
				],
			},
			{
				value: 'S30',
				label: 'S30',
				children: [
					{
						value: 'S30-1',
						label: 'S30-1',
					},
				],
			},
		],
		attrs: {
			props: {
				checkStrictly: true, // 可以单独选中父级
			},
		},
	},
	// {
	// 	label: '枚举',
	// 	prop: 'enum',
	// 	comparator: 'equals',
	// 	mode: EnumFormType.enum,
	// 	enumModel: enumTaskPublishScope,
	// },
	// {
	// 	label: '下拉框',
	// 	prop: 'select',
	// 	comparator: 'equals',
	// 	mode: EnumFormType.select,
	// 	selectModel: {
	// 		1: '张三',
	// 		2: '李四',
	// 		3: '王五',
	// 	},
	// },
	{
		label: '发布范围',
		prop: 'publishScope',
		comparator: 'equals',
		mode: EnumFormType.select,
		selectOption: enumTaskPublishScope,
		selectOptionDic: 'enumTaskPublishScope',
		// defaultValue: '2',
	},

	// {
	// 	label: '日期选择',
	// 	prop: 'date',
	// 	comparator: 'equals',
	// 	mode: EnumFormType.date,
	// },
	// {
	// 	label: '时间选择',
	// 	prop: 'datetime',
	// 	comparator: 'equals',
	// 	mode: EnumFormType.datetime,
	// },
	// {
	// 	label: '日期范围选择',
	// 	prop: 'daterange',
	// 	comparator: 'than',
	//   mode: EnumFormType.dateRange,
	//   attrs: {
	// 		'range-separator': '至',
	// 		'start-placeholder': '开始时间',
	// 		'end-placeholder': '结束时间',
	// 	},
	// },
	{
		label: '日期时间范围选择',
		prop: 'timeRange',
		comparator: 'than',
		mode: EnumFormType.datetimeRange,
		attrs: {
			// 'range-separator': '至',
			// 'start-placeholder': '申请开始时间',
			// 'end-placeholder': '申请结束时间',
		},
	},
])

const search = useSearch<ISearchOption>({
	size: 10,
	loadListApi: apis.daotin.apiDaotin1, // 搜索接口
	sort: 'createdTime,desc',
	getQuerys: () => {
		return searchForm.value?.getCriteriaQuerys()
	},
})

/*******************************************************************
 * 搜索列表项配置
 *******************************************************************/
const tableCode = ref('xxx')
const tableConfig = ref<ITableConfig>({
	code: tableCode.value,
	size: 10,
	isSingleLine: true,
	i18nDisable: true, // 是否禁用国际化
	configs: [
		// { key: 'status', value: '状态', flag: '1', width: '140px' },
		{ key: 'productId', value: '产品id' },
		{
			key: 'deviceStatus',
			value: '设备状态',
			formatter: 'dot',
			enumModel: enumDeviceStatus,
			enumModelDic: 'enumDeviceStatus',
		},
		{ key: 'count', value: '数量', formatter: '0.0' },
		{ key: 'lastTime', value: '更新时间', formatter: 'date' },
		{ key: 'remark', value: '备注', formatter: '--' },
	],
})
const handleUpdateConfig = (config: ITableConfig) => {
	if (config.size && config.size !== tableConfig.value.size) {
		search.handleChangeSize(config.size || 10)
	}
	tableConfig.value = config
}

/***********************************************************************
 * 列表操作
 ************************************************************************/
const refOption = ref() // 弹框的ref
const optionRecord = ref() // 给弹框的数据
const optionType = ref(enumOptionType.add)

function handleAdd() {
	optionType.value = enumOptionType.add
	optionRecord.value = {}
	refOption.value!.open()
}

function handleEdit(row) {
	optionType.value = enumOptionType.edit
	optionRecord.value = window._.cloneDeep(row)
	refOption.value!.open()
}
async function handleDelete(row) {
	try {
		await message.confirm('确认删除吗？')
		search.loadData()
	} catch (error) {
		console.error(error)
	}
}

/***********************************************************************
 * 生命周期
 ************************************************************************/
onMounted(() => {
	search.handleSearch()
})
</script>
<template>
	<div class="page-content xxx">
		<div class="f20 font-bold mb-4">TySearchForm模板</div>

		<TySearchForm
			ref="searchForm"
			:search-form-ref="search.formRef"
			:search-config="searchConfig"
			@handle-search="search.handleSearch"
			@reset-search="search.resetSearch"
		>
			<template #opt>
				<!-- <el-button type="primary" @click="handleAdd">新增</el-button> -->
			</template>
		</TySearchForm>

		<div class="f20 font-bold mb-4">TyTable模板</div>
		<TyTable
			class="minh-500"
			:data="search.tableData.value"
			:loading="search.loading.value"
			:table-config="tableConfig"
			:code="tableCode"
			:total="search.total.value"
			:size="search.size.value"
			:page="search.page.value"
			:showCheckBox="false"
			@handleCurrentChange="search.handleCurrentChange"
		>
			<template #table-status>
				<el-table-column prop="status" label="状态" :show-overflow-tooltip="tableConfig.isSingleLine" min-width="120px">
					<!-- TODO daotin：记得 scope.row.device?.name 要使用问号的形式 -->
					<template #default="scope">
						{{ scope.row.device?.name || 0 }}
						<!-- {{ t(`dic.enumLockStatus_${scope.row.lockStatus}`) }} -->
					</template>
				</el-table-column>
			</template>
			<template #handle>
				<el-table-column :label="t('page.common.operation')" width="160" align="center" fixed="right">
					<template #default="scope">
						<div class="handle-box flex justify-around">
							<BaseIconButton :tip="t('page.common.edit')" icon="edit" @click="handleEdit(scope.row)" />
							<!-- <BaseIconButton tip="查看" icon="view" @click="handleDetail(scope.row)" /> -->
							<!-- TODO daotin: 添加权限 -->
							<BaseIconButton :tip="t('page.common.delete')" icon="delete" @click="handleDelete(scope.row)" />
						</div>
					</template>
				</el-table-column>
			</template>
		</TyTable>
	</div>
</template>

<style scoped lang="less">
.xxx {
}
</style>
