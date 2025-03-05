import axios, {
	type AxiosRequestConfig,
	type InternalAxiosRequestConfig,
	type AxiosInstance,
	type AxiosResponse,
} from 'axios'
import { baseURL } from '@/configs/domain'
import { TokenName } from '@/configs/const'
import { localMng } from '@/utils/storage-mng'

// 定义接口通用返回格式
interface IBaseResponse<T = any> {
	code: number | string
	message: string
	body?: T
}

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
			(config: InternalAxiosRequestConfig) => {
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
			/**
			 * 第一个参数是成功回调函数（处理HTTP状态码2xx的响应）
			 */
			(res: AxiosResponse) => {
				// 首先检查HTTP状态码
				if (res.status !== 200) {
					window.$message.error(`HTTP错误: ${res.status}`)
					return Promise.reject(res)
				}

				const { code = 200, body, message } = res.data as IBaseResponse<any>

				console.groupCollapsed(`%c${res.config.url}`, 'color:green')
				console.log(
					'req=>',
					res.config.data
						? res.config.data instanceof FormData
							? 'This is a FormData'
							: JSON.parse(res.config.data)
						: undefined
				)
				console.log('res=>', body || res)
				console.groupEnd()

				// 然后检查业务状态码
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
				/**
				 * 第二个参数是错误回调函数（处理非2xx状态码/网络错误）
				 */
				if (axios.isCancel(err)) {
					window.$message.error('响应取消')
				} else if (err.response) {
					// 服务器响应了，但状态码不在2xx范围内
					const status = err.response.status
					switch (status) {
						case 401:
							window.$message.error('未授权，请重新登录')
							// 这里可以添加跳转到登录页的逻辑
							break
						case 403:
							window.$message.error('拒绝访问')
							break
						case 404:
							window.$message.error('请求的资源不存在')
							break
						case 500:
							window.$message.error('服务器错误')
							break
						default:
							window.$message.error(`请求错误: ${status}`)
					}
				} else if (err.request) {
					// 请求已发出，但没有收到响应
					window.$message.error('网络错误，服务器无响应')
				} else {
					// 请求配置出错
					window.$message.error('请求配置错误')
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
	/**
	 * 添加了泛型参数 T 用于定义返回数据的类型，默认为 any。调用时可以指定具体的返回类型，如：get<UserInfo>('/api/user')
	 * 添加了泛型参数 D 用于定义请求参数的类型，默认为 Record<string, any>，即一个包含任意字符串键值对的类型。
	 * 调用时可以指定具体的请求参数类型，如：get<UserInfo, { id: number }>('/api/user', { id: 1 })
   * 
   * 使用示例：
   * interface UserInfo {
      id: number;
      name: string;
    }

    // 调用方式
    const response = await request.get<UserInfo>('/api/user');
    // response 类型为 IBaseResponse<UserInfo>
    // 可以通过 response.body 获取具体数据
    const userInfo = response.body;
	 */
	public get = <T = any, D extends Record<string, any> = Record<string, any>>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<IBaseResponse<T>> => this.instance({ url, method: 'get', params: data, ...config })

	// post请求
	public post = <T = any, D extends Record<string, any> = Record<string, any>>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<IBaseResponse<T>> => this.instance({ url, method: 'post', data, ...config })

	// // 不经过统一的axios实例的post请求
	// public getOnly = <T = any, D extends Record<string, any> = Record<string, any>>(
	// 	url: string,
	// 	data?: D,
	// 	config?: AxiosRequestConfig<D>
	// ): Promise<T> => axios({ ...this.baseConfig, url, method: 'get', params: data, ...config })

	// // 不经过统一的axios实例的post请求
	// public postOnly = <T = any, D extends Record<string, any> = Record<string, any>>(
	// 	url: string,
	// 	data?: D,
	// 	config?: AxiosRequestConfig<D>
	// ): Promise<T> => axios({ ...this.baseConfig, url, method: 'post', data, ...config })

	// put请求
	public put = <T = any, D extends Record<string, any> = Record<string, any>>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<IBaseResponse<T>> => this.instance({ url, method: 'put', data, ...config })

	// delete请求
	public delete = <T = any, D extends Record<string, any> = Record<string, any>>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<IBaseResponse<T>> => this.instance({ url, method: 'delete', data, ...config })
}

export default new Request()
