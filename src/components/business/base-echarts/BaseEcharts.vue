<template>
	<div
		class="base-echarts"
		:style="{
			width: width,
			height: height,
		}"
		ref="echartsRef"
	></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type PropType } from 'vue'
import { useEcharts, type EChartsCoreOption } from '@/hooks/business/useEcharts' // 引入hooks

/**********************************************************************************
 * props,emits相关
 *********************************************************************************/
const props = defineProps({
	// echarts配置项
	options: {
		type: Object as PropType<EChartsCoreOption>,
		required: true,
	},
	// 图表高度
	height: {
		type: String,
		default: '100%',
	},
	// 图表宽度
	width: {
		type: String,
		default: '100%',
	},
	// 主题颜色
	themeColors: {
		type: Array as PropType<string[]>,
		default: () => [
			'#138ECE',
			'#DF508A',
			'#3FC8C8',
			'#84D21D',
			'#EAA674',
			'#CC56BF',
			'#BC8133',
			'#975FE5',
			'#FF5B1D',
			'#3F5AC8',
			'#148F5E',
			'#889700',
			'#FFA200',
			'#37C40D',
		],
	},
})

const echartsRef = ref()

const { setOptions, initCharts } = useEcharts(echartsRef, props.options)

/**********************************************************************************
 * 生命周期相关
 *********************************************************************************/
watch(
	() => props.options,
	nVal => {
		let targetOptions: EChartsCoreOption = {}
		if (props.themeColors && props.themeColors.length > 0) {
			targetOptions = { ...nVal }
			targetOptions.color = props.themeColors
		} else {
			targetOptions = { ...nVal }
		}
		setOptions(targetOptions)
	}
)

onMounted(() => {
	initCharts(props.themeColors)
})
</script>
