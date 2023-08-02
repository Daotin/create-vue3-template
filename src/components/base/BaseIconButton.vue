<script lang="ts" setup>
import { ref, onUnmounted, onBeforeUnmount, onDeactivated, onActivated } from 'vue'
import BaseIcon from './BaseIcon.vue'
const props = defineProps({
	tip: String,
	icon: String,
	disabled: {
		type: Boolean,
		default() {
			return false
		},
	},
})
const emit = defineEmits(['click'])
const handleClick = () => {
	if (props.disabled) return
	emit('click')
}
const showAfter = 1000
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
		<el-tooltip :content="tip" placement="top" :show-after="showAfter" :hide-after="0" :disabled="disabledTooltip">
			<BaseIcon
				:name="icon"
				@click="handleClick"
				:class="`${disabled ? 'cursor-not-allowed	black9' : 'cursor-pointer text-theme'}`"
			/>
		</el-tooltip>
	</div>
</template>
