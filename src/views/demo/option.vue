<script setup lang="ts">
import { onMounted, reactive, ref, watch, computed } from 'vue'
import type { PropType } from 'vue'
import apis from '@/apis'
import { enumOptionType, enumUploadFileType } from '@/configs/enum'
import uploadIcon from '@/assets/images/common/upload-icon.png'
import message from '@/utils/message'
import useOption from '@/hooks/business/useOption'
import { useI18n } from 'vue-i18n'
// import BaseUpload from '@/components/base/BaseUpload.vue'
import { FormRules } from 'element-plus'
import { isSetType, checkFileNameLength } from '@/utils'
import { N64, N128 } from '@/configs/const'

const option = useOption()
const { t } = useI18n()

/***************************************************************
 * props,emits相关
 ****************************************************************/
const props = defineProps({
	record: {
		type: Object,
		default: () => {},
	},
	optionType: {
		type: Number as PropType<enumOptionType>,
		validator(value: enumOptionType) {
			return [enumOptionType.add, enumOptionType.edit].includes(value)
		},
	},
})

const emits = defineEmits(['refresh'])

defineExpose({
	open() {
		option.visible.value = true
	},
})

/******************************************************************
 * 表单数据操作相关
 ******************************************************************/
const initFormData = (): any => {
	return {
		productName: '',
		number: '',
		fileList: [],
	}
}
const formData = ref<any>(initFormData())

const rules = computed<FormRules>(() => {
	return {
		productName: [{ required: true, message: t('page.common.pleaseEnter'), trigger: 'blur' }],
		fileList: [{ required: true, message: t('page.common.pleaseEnter'), trigger: 'change' }],
		xxx: [{ required: true, validator: validateAge, trigger: 'blur' }],
	}
})

const validateAge = (rule: any, value: any, callback: any) => {
	console.log('⭐validate value==>', value)
	if (value === '') {
		callback(new Error(t('page.common.pleaseEnter')))
	} else {
		callback()
	}
}

function handleFileChange(file: any) {
	console.log('⭐file==>', file)
	if (!file.name) return
	// 格式限制
	if (!isSetType(file.name, ['.xlsx', '.xls'])) {
		formData.value.fileList.value.pop()
		return message.msgError(t('page.device.onlyExcel'))
	}
	// 文件名长度限制
	if (!checkFileNameLength(file, N64)) {
		formData.value.fileList.value.pop()
		return message.msgError(`${t('page.common.fileNameExceed')} ${N64}`)
	}
	// 大小限制？
	formData.value.fileList.value = [file]
}
function handleFileRemove() {}

const tempImage = computed(() => {
	// console.log('tempImage computed==>')
	if (formData.value.fileList?.length) {
		return [
			{
				id: formData.value.fileList[0]?.picId || '',
				url: formData.value.fileList[0]?.url || '',
			},
		]
	} else {
		return []
	}
})

const handleRule = (uploadFile: any) => {
	if (!isSetType(uploadFile.name, ['.png', '.jpg'])) {
		message.msgError(t('page.public.tipPngOrJpg'))
		return false
	}
	if (uploadFile.size > 5 * 1024 * 1024) {
		message.msgError(t('page.product.rulesForSize'))
		return false
	}
	if (!checkFileNameLength(uploadFile, N64)) {
		message.msgError(`${t('page.common.fileNameExceed')} ${N64}`)
		return false
	}
	return true
}
// 如果file是有值的，那代表上传成功，如果没有值代表上传失败
const handleImageChange = (file: File, fileList = []) => {
	console.log('handleImageChange==>', file, fileList)
	if (file != null) {
		formData.value.fileList = [{ code: '0', picId: file.id as number }]
	}
	option.formRef.value?.validateField('fileList')
}

/*******************************************************************
 * 弹框操作相关
 *******************************************************************/
function handleOpen() {
	formData.value = initFormData()
	if (props.optionType == enumOptionType.edit) {
		formData.value = _.cloneDeep(props.record) as any
	}
}

const submitLoading = ref<boolean>(false)

async function handleSubmit() {
	try {
		await option.formRef.value?.validate()
		submitLoading.value = true
		// await apis.daotin.apiDaotin1
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
	<!-- TODO：当rules里面有change触发的时候，需要使用destroy-on-close，否则在open的时候会懒加载el-form，触发rule校验 -->
	<el-drawer
		:title="optionType == enumOptionType.edit ? '编辑' : '新增'"
		:model-value="option.visible.value"
		@open="handleOpen"
		@closed="option.handleClosed"
		@close="option.handleCancel"
		:close-on-click-modal="false"
		append-to-body
		:size="560"
	>
		<el-form
			:model="formData"
			:rules="rules"
			:ref="option.formRef"
			label-position="top"
			label-width="120px"
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
			<el-form-item label="产品名称" prop="productName">
				<el-input-number v-model="formData.number" :controls="false" :step="1" step-strictly placeholder="请输入" />
			</el-form-item>
			<el-form-item label="el-upload上传文件" prop="fileList">
				<el-upload
					class="w-full"
					action="/"
					:on-change="handleFileChange"
					drag
					:file-list="formData.fileList"
					:auto-upload="false"
					accept=".xlsx,.xls"
					:multiple="false"
					:on-remove="handleFileRemove"
				>
					<div class="el-upload__text">
						<div>
							<el-image :src="uploadIcon" class="mt-2"></el-image>
						</div>
						<div>点击上传/拖拽文件</div>
					</div>
					<!-- <template #tip>
				<div class="el-upload__tip">{{ t('page.device.maxDeviceImport') }}</div>
			</template> -->
				</el-upload>
			</el-form-item>
			<!-- <BaseUpload
				label="BaseUpload上传文件"
				propName="fileList"
				ref="xxxRef"
				requestUrl="10"
				accept=".png,.jpg"
				:fileType="enumUploadFileType.IMAGE_WATERMARK"
				localKey="IDPHOTO_ORG"
				:previewList="tempImage"
				:handleRule="handleRule"
				image-box-size="large"
				@handleChange="handleImageChange"
			>
			</BaseUpload> -->
			<el-form-item label="备注" prop="description">
				<el-input
					type="textarea"
					v-model="formData.description"
					maxlength="500"
					placeholder="请输入备注"
					show-word-limit
				></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="text-center">
				<el-button @click="option.handleCancel()">{{ t('page.common.cancel') }}</el-button>
				<!-- TODO daotin：设置权限 setAuth('xxx', props.optionType == enumOptionType.add)" -->
				<el-button type="primary" :loading="submitLoading" @click="handleSubmit()"
					>{{ t('page.common.comfirm') }}
				</el-button>
			</div>
		</template>
	</el-drawer>
</template>

<style lang="less" scoped></style>
