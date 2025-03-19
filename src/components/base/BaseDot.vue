<script lang="ts" setup>
interface IProps {
	type?: string
	// 指定颜色
	color?: string
	// dot的大小，单位为px
	size?: number
	// dot是否为空心
	hollow?: boolean
}

withDefaults(defineProps<IProps>(), {
	type: 'info',
	hollow: false, // 默认空心
})
</script>

<template>
	<div class="base-dot">
		<div
			:class="['circle', `circle-${type}`]"
			:style="{
				'background-color': hollow ? '#fff' : color,
				'border-color': color,
				width: size + 'px',
				height: size + 'px',
			}"
		></div>
		<div :style="{ color }">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
.base-dot {
	display: flex;
	align-items: center;

	.circle {
		flex: none;
		width: 8px;
		height: 8px;
		margin-right: 8px;
		border-radius: 50%;
		border: 1px solid transparent;

		&-primary {
			background-color: @theme;
			border-color: @theme;
			color: @theme;
		}

		&-success {
			background-color: @green;
			border-color: @green;
			color: @green;
		}

		&-info {
			background-color: @black9;
			border-color: @black9;
			color: @black9;
		}

		&-warning {
			background-color: @orange;
			border-color: @orange;
			color: @orange;
		}

		&-danger {
			background-color: @red;
			border-color: @red;
			color: @red;
		}
	}
}
</style>
