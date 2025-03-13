import { enumMng } from '@/utils'

// 简单写法
export const enum enumState {
	enabled = 'enabled',
	disabled = 'disabled',
}

// 复杂写法
export const enumApproveStage = enumMng([
	{ id: '1', key: 'stage1', name: '客户确认阶段', color: 'primary' },
	{ id: '2', key: 'stage2', name: '试发布阶段', color: 'purple' },
	{ id: '3', key: 'stage3', name: '全面发布阶段', color: 'dark-blue' },
])
