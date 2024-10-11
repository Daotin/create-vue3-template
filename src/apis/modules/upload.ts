import request from '@/utils/request'

// 增加取消请求的功能
export const uploadChunk = (data: any, config) => request.post('/daotin/uploadChunk', data, { ...config })
// export const mergeChunks = () => request.post('/daotin/mergeChunks')
