<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import apis from '@/apis'
import TyTable from '@/components/business/TyTable.vue'
import TySearchForm from '@/components/business/TySearchForm.vue'
import type { ITableConfig } from '@/models/table'
import { EnumFormType, type ISearchFromItem } from '@/models/searchForm'
import useSearch from '@/hooks/business/useSearch'
import type { IUserQueryParams } from '@/models/user'
import message from '@/utils/message'
import { enumUserStatus, enumGender } from '@/enums/modules/user'
import BaseIconButton from '@/components/base/BaseIconButton.vue'

const { t } = useI18n()

/********************************************************************
 * 表单搜索区域
 ********************************************************************/
const searchForm = ref()
const searchConfig = ref<ISearchFromItem[]>([
	{
		label: '用户名',
		prop: 'username',
		comparator: 'contains',
		mode: EnumFormType.input,
	},
	{
		label: '姓名',
		prop: 'realName',
		comparator: 'contains',
		mode: EnumFormType.input,
	},
	{
		label: '邮箱',
		prop: 'email',
		comparator: 'contains',
		mode: EnumFormType.input,
	},
	{
		label: '手机号',
		prop: 'phone',
		comparator: 'contains',
		mode: EnumFormType.input,
	},
	{
		label: '性别',
		prop: 'gender',
		comparator: 'equals',
		mode: EnumFormType.select,
		selectOption: enumGender,
		selectOptionDic: 'enumGender',
	},
	{
		label: '创建时间',
		prop: 'timeRange',
		comparator: 'than',
		mode: EnumFormType.datetimeRange,
		attrs: {
			// 'range-separator': '至',
			// 'start-placeholder': '开始时间',
			// 'end-placeholder': '结束时间',
		},
	},
])

// 使用搜索hook
const search = useSearch<IUserQueryParams>({
	size: 10,
	loadListApi: apis.user.apiGetUserList,
	sort: 'createdTime,desc',
	getQuerys: () => {
		return searchForm.value?.getCriteriaQuerys()
	},
})

/*******************************************************************
 * 搜索列表项配置
 *******************************************************************/
const tableCode = ref('user_management')
const tableConfig = ref<ITableConfig>({
	code: tableCode.value,
	size: 10,
	isSingleLine: true,
	configs: [
		{ key: 'username', value: '用户名' },
		{ key: 'realName', value: '姓名' },
		{ key: 'email', value: '邮箱' },
		{ key: 'phone', value: '手机号', width: '180' },
		{
			key: 'gender',
			value: '性别',
			enumModel: enumGender,
			enumModelDic: 'enumGender',
		},
		{ key: 'createTime', value: '创建时间', width: '180' },
		{ key: 'updateTime', value: '更新时间', width: '180' },
	],
})

/***********************************************************************
 * 列表操作
 ************************************************************************/
async function handleEdit(row: any) {
	console.log(row)
}

async function handleDelete(row: any) {
	try {
		await message.confirm('确认删除该用户吗？')
		await apis.user.apiDeleteUser(row.id)
		message.success('删除成功')
		search.loadData()
	} catch (error) {
		console.error(error)
	}
}

/*********************************************************************
 * 生命周期
 **********************************************************************/
onMounted(async () => {
	search.loadData()
})
</script>

<template>
	<div class="page-content user-management">
		<TySearchForm
			ref="searchForm"
			:search-form-ref="search.formRef"
			:search-config="searchConfig"
			@handle-search="search.handleSearch"
			@reset-search="search.resetSearch"
		>
		</TySearchForm>

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
			<template #table-gender>
				<el-table-column prop="gender" label="性别" :show-overflow-tooltip="tableConfig.isSingleLine" min-width="120px">
					<template #default="scope">
						{{ t(`dic.enumGender_${scope.row.gender}`) }}
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
.user-management {
	padding: 20px;
}
</style>
