import { ref } from 'vue'
import type { IQuery, ISearchOption } from '@/models/search'
import type { ElForm } from 'element-plus'
import { isEmpty } from '@/utils/index'

type ElFormInstance = InstanceType<typeof ElForm>

/**
 * 通用搜索
 * 模式一：loadListFn 外部传加载方法
 * 模式二：loadListApi + loadListApi 仅需传api和获取参数方法
 * @param options
 * @returns
 */
const useSearch = <T>(options: ISearchOption) => {
	const { loadListFn, loadListApi, getQuerys, sort = 'createdTime,desc', queryCallBack } = options
	const page = ref<number>(1)
	const total = ref<number>(0)
	const size = ref<number>(options.size || 10)
	const loading = ref<boolean>(false)
	const formRef = ref<ElFormInstance>()
	const tableData = ref<Array<T>>([])

	const loadData = () => {
		loading.value = true
		if (loadListApi) {
			loadList()
		} else {
			loadListFn && loadListFn()
		}
	}
	const handleSearch = () => {
		page.value = 1
		loadData()
	}

	const resetSearch = () => {
		page.value = 1
		loading.value = true
		formRef.value && formRef.value.resetFields()
		loadData()
	}
	const loadList = async () => {
		try {
			if (!loadListApi || !getQuerys) return
			const params = {
				page: {
					number: page.value,
					size: size.value,
					sort: [sort],
				},
				criteria: {},
			}
			const querys: Array<IQuery> = getQuerys()
			if (querys && querys.length > 0) {
				querys.forEach((item: IQuery) => {
					if (item.type === 'than') {
						if (Array.isArray(item.value) && item.value.length === 2) {
							const [start, end] = item.value
							params.criteria[item.key] = {
								greaterThanOrEqual: start || '',
								lessThanOrEqual: end || '',
							}
						}
					} else if (item.type === 'in') {
						if (Array.isArray(item.value) && item.value.length > 0) {
							params.criteria[item.key] = {
								in: item.value,
							}
						}
					} else if (!isEmpty(item.value)) {
						params.criteria[item.key] = {
							[item.type]: item.value,
						}
					}
				})
			}
			const body = await loadListApi(params)
			const { totalElements, content = [], number } = body
			tableData.value = content
			total.value = totalElements
			page.value = number
			loading.value = false
			queryCallBack && queryCallBack(content)
		} catch (err) {
			console.log(err)
			loading.value = false
		}
	}
	const handleCurrentChange = (val: number) => {
		page.value = val
		loadData()
	}
	const handleChangeSize = (val: number) => {
		size.value = val
		handleSearch()
	}

	return {
		page,
		size,
		loading,
		handleSearch,
		resetSearch,
		handleCurrentChange,
		total,
		formRef,
		tableData,
		loadData,
		handleChangeSize,
	}
}

export default useSearch
