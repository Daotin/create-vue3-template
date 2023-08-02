import { EnumModel, EnumResult } from '@/utils/index'
/**
 * date: 时间换行 示例：2019-01-01 12:00:00
 * dot: BaseDot组件
 * enum: 枚举，使用国际化
 * --: 占位符
 * 0.0: 保留一位小数
 * 0.00: 保留两位小数
 * Function: 自定义处理函数
 */
type TtableFormatter = 'date' | 'dot' | 'enum' | '--' | '0.0' | '0.00' | Function
export interface IColumnConfig {
	id?: number // 数据库中的id
	key: string // 列唯一标识
	value?: string // 字段名（需国际化）
	display?: '0' | '1' // 是否显示 0不显示 1显示
	sort?: number // 排序字段
	flag?: '0' | '1' // 是否必须显示 0非必须 1必须显示
	width?: string // 列宽度
	minWidth?: string // 列最小宽度
	visible?: Function
	formatter?: TtableFormatter
	enumModel?: EnumResult<EnumModel>
	enumModelDic?: string
}

export interface ITableConfig {
	id?: number
	code?: string // 表格唯一标识 // TODO daotin 不需要自定义设置的时候可以不传
	size?: number // 一页展示多少条
	isSingleLine?: boolean // 是否单行显示
	configs: IColumnConfig[]
	i18nDisable?: boolean // 是否禁用国际化
}
