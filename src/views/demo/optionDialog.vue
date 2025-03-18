<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from 'vue'
import type { PropType } from 'vue'
import apis from '@/apis'
import message from '@/utils/message'
import useOption from '@/hooks/business/useOption'
import { FormRules } from 'element-plus'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

/*********************************************************************
 * props,emits相关
 ********************************************************************/
const option = useOption()

const props = defineProps({
	record: {
		type: Object,
		default: () => {},
	},
})

const emits = defineEmits(['refresh'])

defineExpose({
	open() {
		option.visible.value = true
	},
})

/*********************************************************************
 * 表单数据操作相关
 *********************************************************************/
const initFormData = (): any => {
	return {
		productName: '',
	}
}
const formData = ref<any>(initFormData())

const rules = computed<FormRules>(() => {
	return {
		productName: [{ required: true, message: t('page.common.pleaseEnter'), trigger: 'blur' }],
	}
})

/**********************************************************************
 * 弹框操作相关
 *********************************************************************/
let submitLoading = ref(false)
function handleOpen() {
	formData.value = initFormData()
	// if (props.optionType == enumOptionType.edit) {
	// 	formData.value = _.cloneDeep(props.record) as any
	// }
}
async function handleSubmit() {
	try {
		await option.formRef.value?.validate()
		submitLoading.value = true
		await apis.daotin.apiDaotin1
		option.visible.value = false
		message.msgSuccess(t('page.common.msgSuccess'))
		emits('refresh')
	} catch (err) {
		console.log(err)
	} finally {
		submitLoading.value = false
	}
}
</script>

<template>
	<el-dialog
		title="通知内容"
		:model-value="option.visible.value"
		width="800px"
		:close-on-click-modal="false"
		@open="handleOpen"
		@closed="option.handleClosed"
		@close="option.handleCancel"
		append-to-body
		destroy-on-close
	>
		<div>模板内容</div>

		<el-form
			:model="formData"
			:rules="rules"
			:ref="option.formRef"
			label-position="top"
			:validate-on-rule-change="false"
			@submit.prevent
		>
			<el-form-item label="产品名称" prop="productName">
				<!-- TODO daotin: 输入长度限制 -->
				<el-input
					v-model="formData.productName"
					maxlength="64"
					:placeholder="t('page.common.pleaseEnter')"
					clearable
				></el-input>
			</el-form-item>
		</el-form>

		<template #footer>
			<div class="text-center">
				<el-button @click="option.handleCancel">{{ t('page.common.cancel') }}</el-button>
				<el-button type="primary" :loading="submitLoading" @click="handleSubmit">{{
					t('page.common.comfirm')
				}}</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<style lang="less" scoped></style>
