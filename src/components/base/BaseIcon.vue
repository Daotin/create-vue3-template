<script lang="ts" setup>
import { computed } from 'vue'

interface IProps {
	// 图标名称，就是svg文件的名称
	name?: string
	// 样式
	iconClass?: string
	// 图标大小
	size?: string | number
	//  图标颜色
	color?: string
	// 线条的粗细
	strokeWidth?: string | number
	// 颜色样式（如果传了color，以color为准）
	colorStyle?: 'blue' | 'green' | 'orange' | 'red' | 'gray'
}

const props = withDefaults(defineProps<IProps>(), {
	size: 14,
	strokeWidth: 3,
})

// 图标名称
const iconName = computed(() => '#icon-' + props.name)

//  图标样式
const iconStyle = computed(() => ({
	fontSize: typeof props.size === 'string' ? props.size : `${props.size}px`,
	color: props.color,
}))
</script>

<template>
	<svg class="base-icon" :class="[iconClass, colorStyle]" :style="iconStyle" aria-hidden="true">
		<use :xlink:href="iconName" :stroke-width="strokeWidth"></use>
	</svg>
</template>

<style lang="less" scoped>
.base-icon {
	display: inline-block;
	width: 1em;
	height: 1em;
	vertical-align: middle;
	overflow: hidden;
	fill: currentColor;
	stroke: currentColor;
	outline-style: none;
	&.blue {
		color: @blue;
	}
	&.red {
		color: @red;
	}
	&.green {
		color: @green;
	}
	&.orange {
		color: @orange;
	}
	&.gray {
		color: @gray;
	}
}
</style>
