<script lang="ts" setup>
import { ref, onDeactivated, onActivated } from 'vue'
import BaseIcon from './BaseIcon.vue'
const props = defineProps({
	tip: String,
	name: String,
	disabled: {
		type: Boolean,
		default() {
			return false
		},
	},
	size: [String, Number],
	placement: {
		type: String,
		default: 'top',
	},
	delay: {
		type: Number,
		default: 0,
	},
})
const emit = defineEmits(['click'])
const handleClick = () => {
	if (props.disabled) return
	emit('click')
}

const disabledTooltip = ref(false)
onDeactivated(() => {
	disabledTooltip.value = true
})
onActivated(() => {
	disabledTooltip.value = false
})
</script>

<template>
	<div class="inline-block">
		<el-tooltip
			:content="tip"
			:placement="placement"
			:show-after="delay"
			:hide-after="0"
			:disabled="disabledTooltip || !tip"
		>
			<slot
				><BaseIcon
					:name="name"
					@click="handleClick"
					:size="size || 14"
					:class="`${disabled ? 'cursor-not-allowed	black9' : 'cursor-pointer text-theme'}`"
			/></slot>
		</el-tooltip>
	</div>
</template>
