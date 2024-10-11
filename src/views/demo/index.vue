<script setup lang="ts">
import { onMounted, reactive, ref, watch, computed } from 'vue'
import type { PropType } from 'vue'
import apis from '@/apis'
import useSearch from '@/hooks/business/useSearch'
import type { IGetQuerys, ISearchOption } from '@/models/search'
import message from '@/utils/message'
import TyTable from '@/components/business/TyTable.vue'
import type { ITableConfig } from '@/models/table'
import { useAppStore } from '@/stores'
import { BaseSearchButton, BaseIconButton } from '@/components/base/index'
import { enumOptionType, enumLockStatusOption, enumLockStatus, enumDeviceStatus } from '@/configs/enum'
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
// 默认值，近30天
const querys = reactive({
	productName: '',
	status: '',
	lockStatus: '',
	deptId: '',
	dateRange: [
		// dayjs(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD 00:00:00'),
		// subtract：第二个参数单位：
		// type Base = (
		//   "year" | "years" | "y" |
		//   "month" | "months" | "M" |
		//   "week" | "weeks" | "w" |
		//   "day" | "days" | "d" |
		//   "hour" | "hours" | "h" |
		//   "minute" | "minutes" | "m" |
		//   "second" | "seconds" | "s" |
		//   "millisecond" | "milliseconds" | "ms"
		// );
		dayjs(dayjs().subtract(30, 'd').format('YYYY-MM-DD 00:00:00')),
		dayjs(new Date()).format('YYYY-MM-DD 23:59:59'),
	],
})

const getQuerys: IGetQuerys = () => {
	return [
		{
			type: 'contains',
			key: 'productName',
			value: querys.productName,
		},
	]
}

const search = useSearch<ISearchOption>({
	size: 10,
	loadListApi: apis.daotin.apiDaotin1, // 搜索接口
	sort: 'createdTime,desc',
	getQuerys,
})

// 选择日期后，默认时间从00:00:00到23:59:59
const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])

const pickDay = ref() // 选中的第一个时间
// 禁止选择的日期
function disabledDate(time: Date) {
	// 30天内（可以使用dayjs().subtract方法）
	// return time.getTime() > new Date().getTime() || time.getTime() < new Date().getTime() - 30 * 24 * 60 * 60 * 1000
	// return time.getTime() > new Date().getTime() || time.getTime() < dayjs().subtract(30, 'days') // 从当前时间倒推30天

	// 最多30天
	let disableFlag1 = time.getTime() > new Date().getTime()
	let disableFlag2 = pickDay.value
		? // ? time.getTime() < new Date(pickDay.value).getTime() - 30 * 24 * 60 * 60 * 1000
		  time.getTime() < dayjs(pickDay.value).subtract(30, 'days')
		: false
	// console.log('disabledDate==>', disableFlag1, disableFlag2)
	return disableFlag1 || disableFlag2
}

// 记录选择的第一个日期
function dateCalendarChange(val: Date[]) {
	console.log('dateCalendarChange==>', val)
	if (val[0]) {
		console.log('==>', new Date(val[0]).getTime())
		pickDay.value = val[0]
	}
}

const statusOption = computed(() => {
	return [
		{ label: '是', value: '1' },
		{ label: '否', value: '0' },
	]
})

/*******************************************************************
 * 搜索列表项配置
 *******************************************************************/
const tableCode = ref('xxx')
const tableConfig = ref<ITableConfig>({
	code: tableCode.value,
	size: 10,
	isSingleLine: true,
	// i18nDisable: false, // 是否禁用国际化
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
	refOption.value.open()
}

function handleEdit(row: any) {
	optionType.value = enumOptionType.edit
	optionRecord.value = _.cloneDeep(row)
	refOption.value.open()
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
onMounted(async () => {
	console.log('⭐import.meta.env==>', import.meta.env)
})
</script>

<template>
	<div class="page-content xxx">
		<div>el-form模板</div>
		<el-form class="search-con" inline :model="querys" :ref="search.formRef" @submit.native.prevent>
			<el-form-item prop="productName">
				<el-input v-model="querys.productName" placeholder="产品名称" clearable></el-input>
			</el-form-item>
			<!-- 普通的select -->
			<el-form-item prop="status">
				<el-select class="w-full" v-model="querys.status" :placeholder="t('page.common.pleaseSelect')" clearable>
					<el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<!-- 国际化枚举的select -->
			<el-form-item prop="lockStatus">
				<el-select v-model="querys.lockStatus" placeholder="锁定状态" clearable>
					<el-option
						v-for="item in enumLockStatusOption.origin"
						:key="item.id"
						:label="$t(`dic.enumLockStatus_${item.id}`)"
						:value="item.id"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<!-- 机构树级联选择 -->
			<!-- <el-form-item prop="deptId" v-if="isManager">
				<SearchDeptCascader v-model="querys.deptId"></SearchDeptCascader>
			</el-form-item> -->
			<el-form-item prop="dateRange">
				<el-date-picker
					v-model="querys.dateRange"
					:default-time="defaultTime"
					:disabled-date="disabledDate"
					value-format="YYYY-MM-DD HH:mm:ss"
					type="datetimerange"
					@calendar-change="dateCalendarChange"
					:range-separator="t('page.common.to')"
					:start-placeholder="t('page.common.startTime')"
					:end-placeholder="t('page.common.endTime')"
				/>
			</el-form-item>
			<el-form-item>
				<BaseSearchButton
					@search="search.handleSearch"
					@reset="search.resetSearch"
					@config="handleUpdateConfig"
					:table-code="tableCode"
				/>
				<!-- TODO daotin: 添加权限 v-auth -->
				<el-button type="primary" @click="handleAdd">添加</el-button>
			</el-form-item>
		</el-form>

		<div>TyTable模板</div>
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
					label="锁定状态"
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

		<div>el-table el-pagination模板</div>
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
