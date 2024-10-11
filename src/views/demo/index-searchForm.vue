<script setup lang="ts">
import { onMounted, reactive, ref, watch, computed } from 'vue'
import type { PropType } from 'vue'
import apis from '@/apis'
import useSearch from '@/hooks/business/useSearch'
import type { IGetQuerys, ISearchOption } from '@/models/search'
import message from '@/utils/message'
import TyTable from '@/components/business/TyTable.vue'
import TySearchForm from '@/components/business/TySearchForm.vue'
import type { ITableConfig } from '@/models/table'
import { EnumFormType, ISearchFromItem } from '@/models/searchForm'
import { useAppStore } from '@/stores'
import BaseIconButton from '@/components/base/BaseIconButton.vue'
import { enumOptionType, enumTaskPublishScope, enumDeviceStatus } from '@/configs/enum'
import dayjs from 'dayjs'
import Option from './option.vue'
// import FormRenderDemo from '@/components/business/FormRender/demo.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const AppStore = useAppStore()

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
	// i18nDisable: true, // 是否禁用国际化
	configs: [
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

// TODO 没用到？
const handleUpdateConfig = (config: ITableConfig) => {
	if (config.size && config.size !== tableConfig.value.size) {
		search.handleChangeSize(config.size || 10)
	}
	tableConfig.value = config
}

/***********************************************************************
 * 列表操作
 ************************************************************************/
const refOption = ref<InstanceType<typeof Option> | null>(null) // 弹框的ref
const optionRecord = ref() // 给弹框的数据
const optionType = ref(enumOptionType.add)

function handleAdd() {
	optionType.value = enumOptionType.add
	optionRecord.value = {}
	refOption.value!.open()
}

function handleEdit(row: any) {
	optionType.value = enumOptionType.edit
	optionRecord.value = window._.cloneDeep(row)
	refOption.value!.open()
}
async function handleDelete(row: any) {
	try {
		await message.confirm('确认删除吗？')
		search.loadData()
	} catch (error) {
		console.error(error)
	}
}

/*********************************************************************
 * 生命周期
 **********************************************************************/
onMounted(async () => {})
</script>

<template>
	<div class="page-content xxx">
		<div class="f20 font-bold">TySearchForm模板</div>

		<TySearchForm
			ref="searchForm"
			:search-form-ref="search.formRef"
			:search-config="searchConfig"
			:table-code="tableCode"
			@handle-search="search.handleSearch"
			@reset-search="search.resetSearch"
		>
			<template #opt>
				<el-button type="primary" @click="handleAdd">新增</el-button>
			</template>
		</TySearchForm>

		<div class="f20 font-bold">TyTable模板</div>
		<TyTable
			class="minh-500"
			:data="search.tableData.value"
			:loading="search.loading.value"
			:table-config="tableConfig"
			:code="tableCode"
			:total="search.total.value"
			:size="search.size.value"
			:page="search.page.value"
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
			<!-- <template #table-deviceStatus>
				<el-table-column
					prop="deviceStatus"
					label="设备状态"
					:show-overflow-tooltip="tableConfig.isSingleLine"
					min-width="120px"
				>
					<template #default="scope">
						<BaseDot :type="enumDeviceStatus.getColor(scope.row.deviceStatus)">{{
							t(`dic.enumDeviceStatus_${scope.row.deviceStatus}`)
						}}</BaseDot>
					</template>
				</el-table-column>
			</template> -->
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

		<div class="f20 font-bold">el-table el-pagination模板</div>
		<el-table border :data="search.tableData.value" v-loading="search.loading.value" style="width: 100%">
			<el-table-column type="expand" v-if="true">
				<template #default="scope"> xxx </template>
			</el-table-column>
			<el-table-column prop="deviceStatus" label="标签名称" min-width="140" show-overflow-tooltip />
			<el-table-column prop="relateModule" label="所属模块" min-width="140" show-overflow-tooltip>
				<template #default="scope">
					{{ scope.row?.relateModule || 'xxx' }}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<!-- TODO daotin: 权限 -->
					<div class="handle-box flex justify-around">
						<BaseIconButton :tip="t('page.common.edit')" icon="edit" @click="handleEdit(scope.row)" />
						<!-- <BaseIconButton tip="查看" icon="view" @click="handleDetail(scope.row)" /> -->
						<BaseIconButton :tip="t('page.common.delete')" icon="delete" @click="handleDelete(scope.row)" />
					</div>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			hide-on-single-page
			background
			layout="total,prev, pager, next"
			:total="search.total.value"
			:page-size="search.size.value"
			:current-page="search.page.value"
			@current-change="search.handleCurrentChange"
		/>

		<!--弹出框-->
		<Option ref="refOption" :record="optionRecord" :optionType="optionType" @refresh="search.loadData()"></Option>
	</div>
</template>

<style scoped lang="less">
.xxx {
}
</style>
