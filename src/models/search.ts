export interface IQuery {
	type: 'equals' | 'contains' | 'than' | 'in' | 'notEquals' | 'and' | 'or' | 'specified'
	key: string
	value: string | number | Array<string | number | object | Array<object>> | boolean
}

export interface IGetQuerys {
	(): Array<IQuery>
}

export interface ISearchOption {
	size?: number
	loadListFn?: Function
	loadListApi?: Function
	getQuerys?: IGetQuerys
	querys?: Array<IQuery>
	sort?: string
	queryCallBack?: Function // 查询后的回调，用于特殊场景需要对数据二次加工
}
