import type { EnumModel, EnumResult } from '@/utils/index'

import type { CascaderOption } from 'element-plus'
// form表单类型
export enum EnumFormType {
	input,
	select,
	cascader,
	date,
	datetime,
	dateRange,
	datetimeRange,
}

// 搜索条件类型
export type SearchComparator = 'equals' | 'contains' | 'than' | 'in' | 'notEquals' | 'and' | 'or'

interface ICascaderOption extends CascaderOption {
	value: string
	label: string
	children?: ICascaderOption[]
}

// 表单搜索项
export interface ISearchFromItem {
	label: string
	prop: string
	comparator: SearchComparator
	mode: EnumFormType
	selectOption?: EnumResult<EnumModel> // 下拉列表enumMng
	selectOptionDic?: string // 下拉列表翻译字典名称
	cascaderOption?: ICascaderOption[] // 级联下拉列表enumMng
	clearable?: boolean
	defaultValue?: any
	refresh?: boolean // 切换后是否立刻触发刷新
	attrs?: { [key: string]: any }
}
