<script setup lang="ts">
import { onMounted, reactive, ref, watch, computed, type PropType } from 'vue'
import apis from '@/apis'
import { enumOptionType, enumUploadFileType } from '@/configs/enum'
import uploadIcon from '@/assets/images/common/upload-icon.png'
import message from '@/utils/message'
import useOption from '@/hooks/business/useOption'
import { useI18n } from 'vue-i18n'
import type { FormRules } from 'element-plus'
import { isSetType, checkFileNameLength } from '@/utils'
import { N64, N128 } from '@/configs/const'

const option = useOption()
const { t } = useI18n()

/******************************************************************
 * 表单数据操作相关
 ******************************************************************/
const initFormData = (): any => {
	return {
		fileList: [],
	}
}
const formData = ref<any>(initFormData())

const rules = computed<FormRules>(() => {
	return {
		fileList: [{ required: true, message: t('page.common.pleaseEnter'), trigger: 'change' }],
	}
})

const fileTypes = ['.xlsx', '.xls', '.exe']

function handleFileChange(file: any) {
	console.log('⭐file==>', file)
	if (!file.name) return
	// 格式限制
	if (!isSetType(file.name, fileTypes)) {
		formData.value.fileList.value.pop()
		return message.error(t('page.device.onlyExcel'))
	}
	// 文件名长度限制
	if (!checkFileNameLength(file, N64)) {
		formData.value.fileList.value.pop()
		return message.error('文件名长度不能超过64个字符')
	}
	// 大小限制？
	formData.value.fileList = [file]
	console.log('file==>', file)
}
function handleFileRemove() {
	console.log('⭐handleFileRemove==>')
}

/******************************************************************
 * 切片上传
 ******************************************************************/
// 切片大小
const ChunkSize = 5 * 1024 * 1024

// 上传并发数
const Concurrent = 3

// 总切片
const chunks = ref([])

// 计算分片的hash数组
const chunkHashes = ref<string[]>([])

// 总文件hash
const fileHash = ref('')

// 已上传的切片数（最好使用后端数据）
const hasUploadCount = ref(0)

// 是否显示取消按钮
const showCancel = ref(false)

// 上传进度（最好使用后端数据）
const progress = computed(() => {
	if (!chunks.value.length) return 0
	return parseInt((hasUploadCount.value / chunks.value.length) * 100 + '')
})

// 使用web worker计算文件hash
const worker = new Worker('/hash.js')

/**
 * 接收到切片数组后，计算切片的hash值
 * @param chunks 切片数组
 */
async function calculateHashes(chunks: any[]) {
	return new Promise(resolve => {
		worker.onmessage = function (e) {
			if (e.data.hashes) {
				resolve(e.data.hashes)
			} else if (e.data.progress) {
				console.log(`Progress: ${e.data.progress}%`) // 可以用于显示进度
			} else if (e.data.fileHash) {
				fileHash.value = e.data.fileHash
			}
		}
	})
}

/**
 * 生成切片，然后向worker发送切片进行计算
 * @param file 文件对象
 * @param chunkSize 切片大小
 */
function generateChunks(file: any, chunkSize: number) {
	const chunks = []
	let start = 0
	const fileRaw = file.raw
	while (start < fileRaw.size) {
		chunks.push({
			file: fileRaw.slice(start, start + chunkSize),
		})
		start += chunkSize
	}
	worker.postMessage({ fileRaw, chunks }) // 向 worker 发送 chunks
	return chunks
}

/**
并发限制函数：
假设你有9个请求在数组 `requests` 中，并且并发限制 `limit` 为3。那么我们期望在任何时刻，
都最多有3个请求在同时进行，并且当其中的某个请求完成时，我们希望从队列中取出下一个请求来进行处理。
下面是代码执行过程的分解：
1. **初始化阶段**: 初始化一个空的 `results` 数组来存储每个请求的结果，并创建一个函数 `processRequest`，用于逐个处理队列中的请求。
2. **并发执行阶段**: 通过`Array.from`创建一个 `Promise` 数组 `concurrent`，该数组包含3个执行中的 `processRequest` 调用的Promise。这3个Promise代表了同时执行的3个请求。
3. **递归处理阶段**: 每次调用 `processRequest`，它都会从 `requests` 队列中取出一个请求，并用 `await` 执行它。一旦请求完成，结果会被推入 `results` 数组，并且函数会再次递归调用自身，检查队列中是否还有更多的请求。
   - 如果队列中还有请求，则取出下一个请求并递归处理。
   - 如果队列为空，则递归调用将停止。
4. **等待所有并发请求完成**: 通过 `await Promise.all(concurrent)`，我们等待所有并发的请求完成。由于我们的递归处理方式，这包括等待任何后续从队列中取出的请求。
5. **返回结果**: 返回包含所有请求结果的数组 `results`。
关于如何补充新的请求，每次一个请求完成并将结果添加到 `results` 数组后，`processRequest` 函数就会再次递归调用自身。如果 `requests` 队列中还有请求，则会立即取出并开始处理下一个请求。
`concurrent` 数组存储的内容是并发执行中的3个 `processRequest` 调用的Promise。这3个Promise会同时开始处理，每个都处理 `requests` 队列中的一个请求，并在其中一个请求完成后立即补充新的请求（如果队列中还有请求）。
 */
async function handleRequests(requests: any[], limit: number) {
	const results = [] as any[] // 存储所有请求的结果

	showCancel.value = true

	// 定义一个递归函数，用于处理请求并控制并发数量
	async function processRequest() {
		if (requests.length > 0 && !signal.value.aborted) {
			// 如果还有请求在队列中
			const request = requests.shift() // 从队列中取出一个请求
			console.log('request剩余==>', requests.length)

			const result = await request(signal.value) // 执行请求并等待其完成，传递signal
			results.push(result) // 将结果存储
			hasUploadCount.value++

			// 递归调用，确保有新的请求补充进去
			await processRequest()
		}
	}

	// 创建一个 Promise 数组，用于执行并发的请求
	const concurrent = Array.from({ length: Math.min(limit, requests.length) }, () => processRequest())

	// 等待所有并发的请求完成
	await Promise.all(concurrent)

	showCancel.value = false

	return results // 返回所有请求的结果
}

/**
 * 上传切片
 * @param chunks 切片数组
 * @param chunkHashes 切片hash数组
 */
function uploadChunks(chunks: any, chunkHashes: any[]) {
	console.log('⭐uploadChunks==>', chunks, chunkHashes)
	const requests = generateRequests(chunks, chunkHashes)
	console.log('requests>>>', requests)
	return handleRequests(requests, Concurrent)
}

/**
 * 将请求封装成请求数组，排除已完成的分片请求
 * @param chunks 切片数组
 * @param chunkHashes 切片hash数组
 */
function generateRequests(chunks: any, chunkHashes: any[]) {
	abortController.value = new AbortController()
	signal.value = abortController.value.signal

	const completedChunks = JSON.parse(localStorage.getItem('completedChunks') || '[]')
	const setCompletedChunks = new Set(completedChunks)

	const requests = chunks
		.map((chunk: any, index: number) => {
			const hash = chunkHashes[index]
			const formData = new FormData()
			// 过滤未上传成功的
			if (!setCompletedChunks.has(hash)) {
				console.log('没有')
				formData.append('chunk', chunk.file)
				formData.append('hash', hash) // 使用 hash 属性
				formData.append('index', index.toString())
				return () =>
					apis.upload.uploadChunk({ index, hash }, { signal: abortController.value.signal }).then(() => {
						// 接口完成，记录在localstorage
						completedChunks.push(hash)
						localStorage.setItem('completedChunks', JSON.stringify(completedChunks))
					})
			} else {
				return null
			}
		})
		.filter(Boolean)
	return requests
}

// 点击按钮上传
async function handleSubmit(resume = false) {
	try {
		// 如果是恢复上传
		if (resume) {
			const completedChunks = JSON.parse(localStorage.getItem('completedChunks') || '[]')
			hasUploadCount.value = completedChunks.length
		}
		chunks.value = generateChunks(formData.value.fileList[0], ChunkSize)
		chunkHashes.value = await calculateHashes(chunks.value) // 等待哈希计算完成
		const res = await uploadChunks(chunks.value, chunkHashes.value)
		console.log('⭐上传完成')
		message.success('上传完成')
	} catch (error) {
		console.error(error)
	} finally {
	}
}

// 取消上传的函数
const abortController = ref()
const signal = ref()

function handleCancel() {
	console.log('⭐取消上传')
	abortController.value.abort() // 取消与该信号相关联的所有请求
	showCancel.value = false
}

// 清空上传分片缓存
function clearUploadProgress() {
	localStorage.removeItem('completedChunks')
}
</script>

<template>
	<el-form
		:model="formData"
		:rules="rules"
		:ref="option.formRef"
		label-position="top"
		label-width="120px"
		:validate-on-rule-change="false"
		@submit.native.prevent
	>
		<el-form-item label="el-upload上传文件" prop="fileList">
			<el-upload
				class="w-full"
				action="/"
				:on-change="handleFileChange"
				drag
				:file-list="formData.fileList"
				:auto-upload="false"
				:accept="fileTypes.join(',')"
				:multiple="false"
				:on-remove="handleFileRemove"
			>
				<div class="el-upload__text">
					<div>点击上传/拖拽文件</div>
				</div>
				<!-- <template #tip>
				<div class="el-upload__tip">{{ t('page.device.maxDeviceImport') }}</div>
			</template> -->
			</el-upload>
			<div class="my-4">
				<el-button type="primary" @click="handleSubmit">点击上传</el-button>
				<el-button type="danger" v-if="showCancel" @click="handleCancel">取消</el-button>
				<el-button @click="clearUploadProgress">清除缓存</el-button>
			</div>

			<div class="upload-progress-box w-full p-4">上传进度：<el-progress :percentage="progress" /></div>
		</el-form-item>
	</el-form>
</template>

<style lang="less" scoped>
.upload-progress-box {
	border: 1px solid @border-color;
	border-radius: @border-radius;
}
</style>
