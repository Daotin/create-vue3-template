import { enumMng } from '@/utils'

const success = '#00caa2'
const warning = '#ffae00'
const danger = '#fe1e67'
const info = '#333'

export const enum enumState {
	enabled = 'enabled',
	disabled = 'disabled',
}

export const enumAssemblyStatus = enumMng([
	{
		id: enumState.enabled,
		name: '已启动',
	},
	{
		id: enumState.disabled,
		name: '已停止',
	},
])

export const enumRuleEngineStatus = enumMng([
	{
		id: 1,
		name: '未启动',
	},
	{
		id: 2,
		name: '已启动',
	},
])

export const enum enumOptionType {
	add,
	edit,
	detail,
	update,
}
// 用户短信/邮箱获取验证码 -- 操作类型
export const enum enumCaptchaOperat {
	phoneLogin = 1, // 短信登录
	emailReg, // 邮箱注册
	phoneReg, // 手机注册
	phoneReset, // 手机重置密码
	emailReset, // 邮箱重置密码
	phoneBind, // 绑定手机
	emailBind, // 绑定邮箱
}

export const enumFunType = enumMng([
	{
		id: 1,
		name: '属性',
	},
	{
		id: 2,
		name: '事件',
	},
	{
		id: 3,
		name: '服务',
	},
])

export const enumPendingType = enumMng([
	{
		id: '1',
		name: '实名认证-企业待审核',
	},
	{
		id: '2',
		name: '实名认证-个人待审核',
	},
	{
		id: '3',
		name: '机构管理-机构待审核',
	},
	{
		id: '4',
		name: '成员管理-用户待审核',
	},
])
// 任务类型
export const enumTaskType = enumMng([
	{
		id: '1',
		name: '日常任务',
	},
	{
		id: '0',
		name: '预置任务',
	},
])

// 任务发布范围
export const enumTaskPublishScope = enumMng([
	{
		id: '0',
		name: '全部',
	},
	{
		id: '1',
		name: '部分发布',
	},
	{
		id: '2',
		name: '指定SN',
	},
])

// 任务主表状态
export const enumTaskStatus = enumMng([
	{
		id: '0',
		name: '禁用',
	},
	{
		id: '1',
		name: '启用',
	},
])

// 任务执行状态
export const enumTaskLogoStatus = enumMng([
	{
		id: '0',
		name: '成功',
	},
	{
		id: '1',
		name: '失败',
	},
])

// 任务发布内容
export const enumTaskBussinessType = enumMng([
	{
		id: '01',
		name: '应用',
	},
	{
		id: '02',
		name: '商店广告位',
	},
	{
		id: '03',
		name: 'android参数配置',
	},
	// {
	//   id: '04',
	//   name: '交易参数配置',
	// },
	{
		id: '05',
		name: 'LOGO',
	},
	{
		id: '06',
		name: '开机动画',
	},
	{
		id: '07',
		name: '壁纸',
	},
	{
		id: '08',
		name: '补丁',
	},
])

// 证件类型
export const enumCertificateType = enumMng([
	{
		id: '1',
		name: '身份证',
	},
	{
		id: '2',
		name: '驾驶证',
	},
	{
		id: '3',
		name: '护照',
	},
])

// 审核状态
export const enumAuthStatus = enumMng([
	{
		id: '0',
		name: '待审核',
	},
	{
		id: '1',
		name: '审核通过',
	},
	{
		id: '2',
		name: '审核不通过',
	},
])

// 应用操作类型
export const enumTaskOperation = enumMng([
	{
		id: '11',
		name: '商店发布',
	},
	{
		id: '12',
		name: '强制安装',
	},
	{
		id: '13',
		name: '静默安装',
	},
	{
		id: '22',
		name: '强制卸载',
	},
	{
		id: '23',
		name: '静默卸载',
	},
])

export const enumInstructionType = {
	1: '属性上报',
	2: '事件上报',
}

export const enumWeek = {
	2: '一',
	3: '二',
	4: '三',
	5: '四',
	6: '五',
	7: '六',
	1: '天',
}

export const enumCompareMode = { 1: '>', 2: '>=', 3: '<', 4: '<=', 5: '==', 6: '!=', 7: 'in', 8: 'between', 9: 'like' }
export const enumConditionLine = { 1: '上下线', 2: '上线', 3: '下线' }

export const enumRepeat = {
	1: '仅限一次',
	2: '每天',
	3: '每周',
	4: '每月',
}
export const enumJobType = {
	1: '每天',
	2: '每月',
	3: '每周',
	4: '单次',
}
export const enumRepeatToJobType = {
	1: 4,
	2: 1,
	3: 3,
	4: 2,
}
export const enumJobTypeToRepeat = {
	1: 2, // 每天
	2: 4, // 每月
	3: 3, // 每周
	4: 1, // 单次
}
export const enumRuleOperate = { 1: '触发', 2: '启用', 0: '停用' }

export const enumTimingTrigger = {
	1: '定时',
	0: '手动',
}

export const enumPushType = enumMng([
	{ id: '0', name: '立即推送' },
	{ id: '1', name: '规定时间' },
])

// 消息分类来源
export const enumMsgSource = enumMng([
	{
		id: '1',
		name: '系统消息',
	},
	{
		id: '2',
		name: '用户消息',
	},
	{
		id: '3',
		name: '第三方消息',
	},
])

// 消息分类来源
export const enumNoticeLevel = enumMng([
	{
		id: 1,
		name: '高',
	},
	{
		id: 2,
		name: '中',
	},
	{
		id: 3,
		name: '低',
	},
])
// 消息是否已读
export const enumReadFlag = enumMng([
	{
		id: '0',
		name: '未读',
	},
	{
		id: '1',
		name: '已读',
	},
])

// 发布对象类型
export const enumPublishType = enumMng([
	{
		id: '1',
		name: '全部',
	},
	{
		id: '2',
		name: '机构分组',
	},
	{
		id: '3',
		name: '机构',
	},
	{
		id: '4',
		name: '指定用户',
	},
])

// 通知渠道
export const enumNoticeChannel = enumMng([
	{
		id: '1',
		name: '消息中心',
	},
	{
		id: '2',
		name: '弹框提醒',
	},
	{
		id: '3',
		name: '邮件通知',
	},
])

// 通知发布状态
export const enumNoticeStatus = enumMng([
	{
		id: '0',
		name: '未发布',
		status: 'warning',
	},
	{
		id: '1',
		name: '已发布',
		status: 'success',
	},
	{
		id: '2',
		name: '发布中',
		status: 'primary',
	},
	{
		id: '3',
		name: '部分发布',
		status: 'warning',
	},
])

// 物模型相关
export const enumPropType = {
	int: 'int',
	float: 'float',
	double: 'double',
	enum: 'enum',
	bool: 'bool',
	text: 'text',
	date: 'date',
	struct: 'struct',
	array: 'array',
}

export const enumPropUnit = [
	{
		label: 'page.model.timeUnit',
		options: {
			// 温度单位
			ms: '毫秒',
			s: '秒',
			min: '分钟',
			hour: '小时',
		},
	},
	{
		label: 'page.model.tempUnit',
		options: {
			// 温度单位
			'℃': '摄氏度',
			K: '开尔文',
			'℉': '华氏度',
		},
	},
	{
		label: 'page.model.airQualityUnit',
		options: {
			'%RH': '相对湿度',
			Lux: '照度',
			'ug/m³': '微克每立方米',
			'mg/m³': '毫克/立方米',
			'g/m³': '克/立方米',
			'kg/m³': '千克/立方米',
			// 'ppm': '10-6',
			// 'ppb': '10-9',
			// 'ppt': '10-12',
		},
	},
	{
		label: 'page.model.electricityUnit',
		options: {
			uA: '微安',
			mA: '毫安',
			A: '安',
			kA: '千安',
			mV: '毫伏',
			V: '伏特',
			uW: '微瓦',
			mW: '毫瓦',
			W: '瓦特',
			kW: '千瓦特',
		},
	},
	{
		label: 'page.model.powerUnit',
		options: {
			'kW.h': '千瓦时',
			'W.h': '瓦时',
		},
	},
	{
		label: 'page.model.lengthUnit',
		options: {
			nm: '纳米',
			μm: '微米',
			mm: '毫米',
			cm: '厘米',
			m: '米',
			km: '千米',
		},
	},
	{
		label: 'page.model.acreageUnit',
		options: {
			'㎡': '平方米',
		},
	},
	{
		label: 'page.model.voiceUnit',
		options: {
			dB: '分贝',
		},
	},
	{
		label: 'page.model.angleUnit',
		options: {
			'°': '度（角度）',
		},
	},
	{
		label: 'page.model.concentrationUnit',
		options: {
			'g/mL': '克每毫升',
			'g/L': '克每升',
			'mg/L': '毫克每升',
		},
	},
	{
		label: 'page.product.signalStrength',
		options: {
			dBm: '信号强度',
		},
	},
	{
		label: 'page.product.spaceUnit',
		options: {
			Byte: '字节',
			KB: 'KB',
			MB: 'MB',
			GB: 'GB',
			TB: 'TB',
		},
	},
	{
		label: 'page.model.otherUnit',
		options: {
			'%': '百分比',
			time: '次数',
		},
	},
]

export const enumAccessMode = enumMng([
	{
		id: '0',
		name: '读写',
	},
	{
		id: '1',
		name: '只读',
	},
])

// 锁定状态（选项用）
export const enumLockStatusOption = enumMng([
	{
		id: '01',
		name: '待锁定',
	},
	{
		id: '02',
		name: '锁定中',
	},
	{
		id: '03',
		name: '已锁定',
	},
	{
		id: '04',
		name: '待解锁',
	},
	{
		id: '05',
		name: '解锁中',
	},
])
// 锁定状态（全）
export const enumLockStatus = enumMng([
	{
		id: '00',
		name: '已解锁',
		color: '',
	},
	{
		id: '01',
		name: '待锁定',
		color: 'green',
	},
	{
		id: '02',
		name: '锁定中',
		color: 'orange',
	},
	{
		id: '03',
		name: '已锁定',
		color: 'red',
	},
	{
		id: '04',
		name: '待解锁',
		color: 'green',
	},
	{
		id: '05',
		name: '解锁中',
		color: 'orange',
	},
])
export enum enumLockStatusKey {
	HasUnlocked = '00',
	WaitLock = '01',
	Locking = '02',
	HasLocked = '03',
	WaitUnLock = '04',
	UnLocking = '05',
}
// 是否已解决问题
export const enumSolved = enumMng([
	{
		id: '0',
		name: '否',
	},
	{
		id: '1',
		name: '是',
	},
])

/************************************
 * 标签管理
 *************************************/
export const enumTransLabelTabs = enumMng([
	// {
	// 	id: '1',
	// 	name: '数据中心',
	// },

	{
		id: '4',
		name: '页面',
	},
	{
		id: '5',
		name: '字典',
	},
	{
		id: '6',
		name: '提示语',
	},
	{
		id: '7',
		name: '业务参数',
	},
	{
		id: '8',
		name: '国家',
	},
	{
		id: '3',
		name: '菜单',
	},
	// {
	// 	id: '9',
	// 	name: '日志翻译',
	// },
])

export const enumPageModule = enumMng([
	{
		id: 'common',
		name: 'common-公共',
	},
	{
		id: 'login',
		name: 'login-登录',
	},
	{
		id: 'reg',
		name: 'reg-注册',
	},
	{
		id: 'bi',
		name: 'bi-首页',
	},
	{
		id: 'certAudit',
		name: 'certAudit-认证',
	},
	{
		id: 'notice',
		name: 'notice-通知',
	},
	{
		id: 'message',
		name: 'message-消息',
	},
	{
		id: 'task',
		name: 'task-任务中心',
	},
	{
		id: 'password',
		name: 'password-密码',
	},
	{
		id: 'account',
		name: 'account-账户',
	},
	{
		id: 'ent',
		name: 'ent-企业行业',
	},
	{
		id: 'firm',
		name: 'firm-厂商',
	},
	{
		id: 'devicelogs',
		name: 'devicelogs-设备日志',
	},
	{
		id: 'sysMember',
		name: 'sysMember-系统成员',
	},
	{
		id: 'sysDept',
		name: 'sysDept-系统机构',
	},
	{
		id: 'sysRole',
		name: 'sysRole-系统角色',
	},
	{
		id: 'sysLOg',
		name: 'sysLOg-系统日志',
	},
	{
		id: 'patch',
		name: 'patch-补丁',
	},
	{
		id: 'advert',
		name: 'advert-商店广告位',
	},
	{
		id: 'customization',
		name: 'customization-系统定制',
	},
	{
		id: 'paramstemplate',
		name: 'paramstemplate-设备参数',
	},
	{
		id: 'certificate',
		name: 'certificate-证书',
	},
	{
		id: 'protocol',
		name: 'protocol-协议',
	},
	{
		id: 'merchant',
		name: 'merchant-商户',
	},
	{
		id: 'alertPush',
		name: 'alertPush-告警推送',
	},
	{
		id: 'alert',
		name: 'alert-告警发生',
	},
	{
		id: 'deviceactive',
		name: 'deviceactive-活跃设备',
	},
	{
		id: 'devicemap',
		name: 'devicemap-设备地图',
	},
	{
		id: 'appanalysis',
		name: 'appanalysis-应用分类',
	},
	{
		id: 'gateway',
		name: 'gateway-网关',
	},
	{
		id: 'assembly',
		name: 'assembly-组件',
	},
	{
		id: 'product',
		name: 'product-产品',
	},
	{
		id: 'device',
		name: 'device-设备',
	},
	{
		id: 'rule',
		name: 'rule-规则',
	},
	{
		id: 'dept',
		name: 'dept-机构',
	},
	{
		id: 'application',
		name: 'application-应用',
	},
	{
		id: 'fota',
		name: 'fota-固件管理',
	},
	{
		id: 'public',
		name: 'public-公共',
	},
	{
		id: 'route',
		name: 'route-路由',
	},
	{
		id: 'model',
		name: 'model-模型',
	},
	{
		id: 'remoteLock',
		name: 'remoteLock-远程锁定',
	},
	{
		id: 'remoteAssist',
		name: 'remoteAssist-远程协助',
	},
	{
		id: 'fotaOfModule',
		name: 'fotaOfModule-模块管理',
	},
])
export const enumParseStatus = enumMng([
	{
		id: '0',
		name: '未解析',
	},
	{
		id: '1',
		name: '已解析',
	},
])

// 操作类型的type 设备接入-设备网关
export enum handleType {
	del,
	enabled,
	paused,
	disabled,
}

//订阅类型
export const enumSubType = enumMng([
	{
		id: 'Exclusive',
		name: 'Exclusive',
	},
	{
		id: 'Shared',
		name: 'Shared',
	},
	{
		id: 'Failover',
		name: 'Failover',
	},
	{
		id: 'Key_Shared',
		name: 'Key_Shared',
	},
])

// 网关类型
// TODO 龚明权 看有没有更好的方式
export enum enumProviderType {
	COAPSERVER = 'coap-server',
	SOCKETSERVER = 'socket-server',
	TUYAPULSARCLIENTGATEWAY = 'tuya-pulsar-client-gateway',
	HTTPSERVER = 'http-server',
	MICROSERVICE = 'micro-service',
	MQTTCLIENTGATEWAY = 'mqtt-client-gateway',
	MQTTSERVERGATEWAY = 'mqtt-server-gateway',
	TCPSERVERGATEWAY = 'tcp-server-gateway',
}

// 产品类别 废弃20220622
export const enumProductCategoryType = enumMng([
	{
		id: '1',
		name: '智能POS',
	},
	{
		id: '2',
		name: '非智能POS',
	},
	{
		id: '3',
		name: 'mifi设备',
	},
])

// 产品类型
export const enumNodeType = enumMng([
	{
		id: '1',
		name: '直连设备',
	},
	{
		id: '2',
		name: '网关子设备',
	},
	{
		id: '3',
		name: '网关设备',
	},
	// {
	//   id: "4",
	//   name: "南向云接入"
	// }
])

// 产品状态
export const enumProductStatus = enumMng([
	{
		id: '0',
		name: '删除',
	},
	{
		id: '1',
		name: '未发布',
	},
	{
		id: '2',
		name: '已发布',
	},
])

export enum enumAuthMode {
	'一机一密' = 1,
}

// 产品共享状态
export const enumProductUseType = enumMng([
	{
		id: '0',
		name: '否',
	},
	{
		id: '1',
		name: '是',
	},
])

// 南向云接入平台
export const enumNorthClodPlatform = enumMng([
	{
		id: '1',
		name: '电信CTWING平台',
	},
])

//网络协议（通讯协议）
export const enumNetworkType = enumMng([
	{
		id: '1',
		name: 'WIFI',
	},
	{
		id: '2',
		name: '移动蜂窝数据',
	},
	{
		id: '3',
		name: 'NB-IOT',
	},
	{
		id: '4',
		name: '以太网',
	},
	{
		id: '999',
		name: '其他',
	},
])

// 通信协议
export enum enumTransProtocolList {
	'CoAP' = 'CoAP',
	'LWM2M' = 'LWM2M',
	'MQTT' = 'MQTT',
	'Socket' = 'Socket',
	'zigbee' = 'zigbee',
	'blueTooth' = '蓝牙',
	'Modbus' = 'Modbus',
}

// 不同设备接入方式不同通信协议-标准产品-直连设备/网关设备
export const enumTransProtocol1 = enumMng([
	{ id: 'MQTT', name: 'MQTT' },
	{ id: 'Socket', name: 'Socket' },
])

// 不同设备接入方式不同通信协议-标准产品-网关子设备
export const enumTransProtocol2 = enumMng([
	{ id: 'zigbee', name: 'zigbee' },
	{ id: 'blueTooth', name: '蓝牙' },
	{ id: 'Modbus', name: 'Modbus' },
])

// 不同设备接入方式不同通信协议-标准产品-南向云接入设备 || 模组直连设备联网方式为NB-IOT
export const enumTransProtocol3 = enumMng([
	{ id: 'CoAP', name: 'CoAP' },
	{ id: 'LWM2M', name: 'LWM2M' },
])

// 设备状态
export const enumDeviceStatus = enumMng([
	{
		id: '1',
		name: '未激活',
		color: 'warning',
	},
	{
		id: '2',
		name: '离线',
		color: 'danger',
	},
	{
		id: '3',
		name: '在线',
		color: 'success',
	},
	{
		id: '4',
		name: '禁用',
		color: 'info',
	},
])

// 设备上行日志类型
export const enumDeviceUpLogType = enumMng([
	{
		id: '1',
		name: '属性上报',
	},
	{
		id: '2',
		name: '事件上报',
	},
	{
		id: '3',
		name: '服务调用应答',
	},
	{
		id: '4',
		name: '属性设置应答',
	},
	{
		id: '5',
		name: '指令应答',
	},
])
// 设备下行日志类型
export const enumDeviceDownLogType = enumMng([
	{
		id: '1',
		name: '属性设置',
	},
	{
		id: '2',
		name: '服务调用',
	},
])

// 设备批量来源
export const enumDeviceAddType = enumMng([
	{
		id: '1',
		name: '批量导入',
	},
	{
		id: '2',
		name: '单个新增',
	},
	{
		id: '3',
		name: '上级转移',
	},
	{
		id: '4',
		name: '转出撤回',
	},
])

// 设备剩余状态
export const enumDeviceCntType = enumMng([
	{
		id: '1',
		name: '未转出',
	},
	{
		id: '3',
		name: '部分转出',
	},
	{
		id: '5',
		name: '全部转出',
	},
	{
		id: '7',
		name: '已撤回',
	},
])

// 设备转移状态
export const enumDeviceExportStatus = enumMng([
	{
		id: '1',
		name: '转出中',
	},
	{
		id: '3',
		name: '已转移',
	},
	{
		id: '5',
		name: '转出失败',
	},
	{
		id: '7',
		name: '撤销中',
	},
	{
		id: '9',
		name: '已撤销',
	},
	{
		id: '11',
		name: '撤销失败',
	},
])

// 应用类型
export const enumClassType = enumMng([
	{
		id: '1',
		name: '金融理财',
	},
	{
		id: '2',
		name: '生活周边',
	},
	{
		id: '3',
		name: '咨询信息',
	},
	{
		id: '4',
		name: '社交网络',
	},
])

// 应用状态
export const enumAppStatus = enumMng([
	{
		id: 0,
		name: '待提交',
	},
	{
		id: 1,
		name: '待审核',
	},
	{
		id: 2,
		name: '审核通过/上架',
	},
	{
		id: 3,
		name: '审核不通过',
	},
	{
		id: 4,
		name: '下架',
	},
])

// 应用共享范围
export const enumShareScopeType = enumMng([
	{
		id: '0',
		name: '不共享',
	},
	{
		id: '1',
		name: '所有人',
	},
	{
		id: '2',
		name: '下级机构',
	},
	{
		id: '3',
		name: '指定机构',
	},
])

//所属平台
export const enumPlatform = enumMng([
	{
		id: 1,
		name: '集中管理平台',
	},
	{
		id: 2,
		name: '设备管理平台',
	},
	{
		id: 3,
		name: '流量连接平台',
	},
])

// 运维类型
export const enumOpsType = enumMng([
	{
		id: '1',
		name: '撤机',
	},
	{
		id: '2',
		name: '现场运维',
	},
	{
		id: '3',
		name: '杀死进程',
	},
	{
		id: '4',
		name: '清除应用数据',
	},
	{
		id: '5',
		name: '远程协助',
	},
	{
		id: '6',
		name: '绑定设备',
	},
])

// 固件包类型
export const enumFiwTyp = enumMng([
	{
		id: 'TA',
		name: '整包',
	},
	{
		id: 'DI',
		name: '差分',
	},
])

// 任务状态
export const enumTaskSts = enumMng([
	{
		id: 'WAIT',
		name: '未推送',
	},
	{
		id: 'PROCESS',
		name: '进行中',
	},
	{
		id: 'FINISH',
		name: '已完成',
	},
])

// 设备接入-证书管理-发布状态
export const enumProtocolType = enumMng([
	{ id: 0, name: '未发布' },
	{ id: 1, name: '已发布' },
])

// 证书类型
export enum enumCertType {
	PFX = 'PFX',
	JKS = 'JKS',
	PEM = 'PEM',
}

// 告警规则配置-消息类型
export const enumNoticeType = enumMng([
	{ id: '1', name: '短信' },
	{ id: '2', name: '邮件' },
])

// 告警规则配置-指定机构
export const enumReceiveType = enumMng([
	{
		id: '1',
		name: '指定用户',
	},
	{
		id: '2',
		name: '对应机构管理员',
	},
	{
		id: '3',
		name: '机构所有用户',
	},
])
// 告警规则配置-快捷tag
export const enumNoticeParam = enumMng([
	{
		id: '1',
		name: '设备昵称',
		key: 'DeviceNickname',
	},
	{
		id: '2',
		name: '设备SN',
		key: 'DeviceSN',
	},
	{
		id: '3',
		name: '产品名称',
		key: 'ProductName',
	},
	{
		id: '4',
		name: '产品型号',
		key: 'ProductModel',
	},
	{
		id: '5',
		name: '机构名称',
		key: 'InstitutionName',
	},
	{
		id: '6',
		name: '触发规则引擎名称,',
		key: 'RuleName',
	},
	{
		id: '7',
		name: '触发时间',
		key: 'TriggerTime',
	},
	{
		id: '8',
		name: '触发条件',
		key: 'TriggerName',
	},
])

//  固件升级 签名算法
export const enumSignType = enumMng([
	{
		id: 'MD5',
		name: 'MD5',
	},
	{
		id: 'SHA256',
		name: 'SHA256',
	},
	{
		id: 'Nothing',
		name: '无',
	},
])

// 绑定状态
export enum enumBindType {
	bind,
	unbind,
}

// 固件升级-任务管理-设备状态
export const enumModSts = enumMng([
	{ id: '1', name: '已注销' },
	{ id: '2', name: '未激活' },
	{ id: '3', name: '在线' },
	{ id: '4', name: '离线' },
	{ id: '5', name: '禁用' },
])

// 固件升级-任务管理-设备升级下发状态
export const enumModUpSts = enumMng([
	{ id: '1', name: '未下发' },
	{ id: '2', name: '已下发' },
	{ id: '3', name: '成功' },
	{ id: '4', name: '失败' },
	{ id: '5', name: '超时' },
	{ id: '6', name: '超时成功' },
	{ id: '7', name: '超时失败' },
	{ id: '8', name: '暂停' },
	{ id: '9', name: '取消升级' },
	{ id: '10', name: '设备已删除' },
])

// 固件升级-任务管理-设备升级状态
export const enumFotaDetailStatus = enumMng([
	{ id: '0', name: '成功' },
	{ id: '1', name: '失败' },
	{ id: '2', name: '进行中' },
])

// 设备详情-设备控制与状态
export const enumDeviceEventTyep = enumMng([
	{ id: 0, name: '信息' },
	{ id: 1, name: '告警' },
	{ id: 2, name: '故障' },
])

// 通用文件上传文件类型枚举
export enum enumUploadFileType {
	IMAGE = '1', // 1:图片上传
	IMAGE_WATERMARK = '2', //2：图片上传加水印 不支持分片
	JAR = '3', //3：JAR、ZIP文件上传
	APK = '4', // 4：APK文件上传
	FOTA = '5', //5：固件升级包上传
	MODULE = '6', //6：模块包上传
}

// 通用文件上传-文件所属模块
export const enumUploadReqUrl = enumMng([
	{ id: '01', name: '产品管理' },
	{ id: '02', name: '应用管理' },
	{ id: '03', name: '固件管理' },
	{ id: '04', name: '模块管理' },
	{ id: '05', name: '补丁管理' },
	{ id: '06', name: '商店广告位' },
	{ id: '07', name: 'LOGO' },
	{ id: '08', name: '开机动画' },
	{ id: '09', name: '壁纸' },
	{ id: '10', name: '实名认证' },
	{ id: '11', name: '账户中心' },
	{ id: '12', name: '通知' },
])

// 设备分组-table key
export enum enumDeviceGroupTableKey {
	'BIND_TABLE',
	'UNBIND_TABLE',
}

// 模块固件类型
export const enumModuleType = enumMng([
	{ id: 'GPRSDIF', name: 'GPRS差分包' },
	{ id: 'WIFIDIF', name: 'WIFI差分包' },
	{ id: 'ACCSHIP', name: '从芯片升级包' },
	{ id: 'VOICDIF', name: '录播语音差分包' },
	{ id: 'FONTDIF', name: '字库差分包' },
	{ id: 'FSDIF', name: '文件系统差分包' },
])

// 模块固件升级任务详情-设备升级状态
export const enumModuleTaskStatus = enumMng([
	{ id: '0', name: '下载中' },
	{ id: '1', name: '下载成功' },
	{ id: '2', name: '下载失败' },
])

export const enum enumBindState {
	enabled = 1,
	disabled = 2,
}

export const userCategoryData = enumMng([
	{
		id: 1,
		name: '运维',
	},
	{
		id: 2,
		name: '客户',
	},
])

export const userStatusData = enumMng([
	{
		id: 0,
		name: '启用',
	},
	{
		id: 1,
		name: '禁用',
	},
])
export const isOrganManger = enumMng([
	{
		id: 1,
		name: '是',
	},
	{
		id: 2,
		name: '否',
	},
])
export const isBindDevice = enumMng([
	{
		id: enumBindState.enabled,
		name: '已绑定',
	},
	{
		id: enumBindState.disabled,
		name: '未绑定',
	},
])
export const deptTypeData = enumMng([
	{
		id: 1,
		name: '企业',
	},
	{
		id: 0,
		name: '个人',
	},
])

export const platformData = enumMng([
	{
		id: 1,
		name: '集中平台',
	},
	{
		id: 2,
		name: '设备管理平台',
	},
	{
		id: 3,
		name: '流量连接平台',
	},
])
export const platformTreeData = enumMng([
	{
		id: 1,
		name: '设备平台',
	},
	{
		id: 2,
		name: '流量平台',
	},
])

export const suggestScreenData = enumMng([
	{
		id: 0,
		name: '竖屏',
	},
])

export const patchTypeData = enumMng([
	{
		id: '0',
		name: '整包',
	},
	{
		id: '1',
		name: '差分',
	},
])
export const demandSourceData = enumMng([
	{
		id: '0',
		name: '系统升级',
	},
	{
		id: '1',
		name: '机构需求',
	},
])
export const roleTypeData = enumMng([
	{
		id: '1',
		name: '集中平台角色',
	},
	{
		id: '2',
		name: '设备管理平台角色',
	},
	{
		id: '3',
		name: '流量连接平台角色',
	},
])
export const userTypeData = enumMng([
	{
		id: '1',
		name: '管理员',
	},
	{
		id: '2',
		name: '普通用户',
	},
])

export const alertLevelData = enumMng([
	{
		id: '1',
		name: '一般告警',
	},
	{
		id: '2',
		name: '重要告警',
	},
	{
		id: '3',
		name: '严重告警',
	},
])
export const alertStatusData = enumMng([
	{
		id: '0',
		name: '进行中',
	},
	{
		id: '1',
		name: '已处理',
	},
])
export const pushStatusData = enumMng([
	{
		id: '0',
		name: '推送中',
	},
	{
		id: '1',
		name: '推送成功',
	},
	{
		id: '2',
		name: '推送失败',
	},
])
export const appNamesData = enumMng([
	{
		id: 'financeCount',
		name: '金融理财',
	},
	{
		id: 'livingCount',
		name: '生活周边',
	},
	{
		id: 'seekCount',
		name: '咨询信息',
	},
	{
		id: 'socialCount',
		name: '社交网络',
	},
])

// 认证审核状态
export enum enumStatus {
	unAuth = '0', //未认证
	person = '1', //已个人实名
	org = '2', //已企业实名
	waitPerson = '3', //个人实名申请中
	waitOrg = '4', //企业实名申请中
	timeOutPerson = '5', //已个人实名-过期
	timeOutOrg = '6', //已企业实名-过期
	errorPerson = '7', //个人实名不通过
	errorOrg = '8', //企业实名不通过
	personToOrg = '9', //已个人实名-企业实名申请中
	errorPersonToOrg = '10', //已个人实名-企业实名申请失败
	willTimeOutPerson = '11', //个人实名即将过期
	willTimeOutOrg = '12', //企业实名即将过期
}

// 认证类型
export const enum enumApproveType {
	uncheck, // 未认证
	person, // 个人认证
	org, // 企业认证
}

// 设备绑定状态
export enum enumDeviceBindStatus {
	'merchant_bind' = '1',
	'device_lock' = '2',
	'rule_engine_bind' = '3',
	'task_bind' = '4',
	'firmware_bind' = '5',
	'module_bind' = '6',
}
