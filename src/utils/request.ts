import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios'
import { baseURL } from '@/configs/domain'
import { TokenName } from '@/configs/const'
import { localMng } from '@/utils/storage-mng'

class Request {
	private baseConfig: AxiosRequestConfig = {
		baseURL,
		headers: {},
		timeout: 20000,
	}

	private instance: AxiosInstance = axios.create(this.baseConfig)

	public constructor() {
		const token = localMng.getItem(TokenName)
		if (token) {
			this.setHeader({
				Authorization: token,
			})
		} else {
			this.initInstance()
		}
	}

	private initInstance() {
		this.instance = axios.create(this.baseConfig)
		this.setReqInterceptors()
		this.setResInterceptors()
	}

	// 请求拦截器
	private setReqInterceptors = () => {
		this.instance.interceptors.request.use(
			config => {
				// const { checkApiPermission } = usePermission()
				config.cancelToken = new axios.CancelToken(function executor(c) {
					// if (!checkApiPermission(config.url)) {
					//   c(config.url + '没有权限')
					//   router.push('/error/forbidden')
					// }
				})
				return config
			},
			err => {
				window.$message.error('请求失败')
				return Promise.reject(err)
			}
		)
	}

	// 响应拦截器
	private setResInterceptors = () => {
		this.instance.interceptors.response.use(
			res => {
				const { code = 200, body, message } = res.data
				switch (code) {
					case 200:
						return Promise.resolve(body || res.data)
					case 401:
						window.$message.warning(message || '无权限')
						return Promise.reject(res.data)
					default:
						window.$message.error(message || '响应失败')
						return Promise.reject(res.data)
				}
			},
			err => {
				if (axios.isCancel(err)) {
					window.$message.error('响应取消')
				} else {
					window.$message.error('响应失败')
				}
				return Promise.reject(err)
			}
		)
	}

	// 设置请求头
	public setHeader = (headers: any) => {
		this.baseConfig.headers = { ...this.baseConfig.headers, ...headers }
		this.initInstance()
	}

	// get请求
	public get = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'get', params: data, ...config })

	// post请求
	public post = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'post', data, ...config })

	// 不经过统一的axios实例的post请求
	public getOnly = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		axios({
			...this.baseConfig,
			url,
			method: 'get',
			params: data,
			...config,
		})

	// 不经过统一的axios实例的get请求
	public postOnly = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		axios({
			...this.baseConfig,
			url,
			method: 'post',
			data,
			...config,
		})

	// delete请求
	public deleteBody = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'delete', data, ...config })

	public deleteParam = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'delete', params: data, ...config })
}

export default new Request()
