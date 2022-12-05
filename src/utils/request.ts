import axios, { type AxiosRequestConfig, type AxiosInstance } from "axios";
import { baseURL } from "@/config/domain";
import { TokenName } from "@/config/const";
import { useAppStoreWithOut } from "@/store";
import { usePermission } from "@/hooks";
import router from "@/router";
import { localMng } from "@/utils/storage-mng";
import md5 from "md5";

class Request {
  private baseConfig: AxiosRequestConfig = {
    baseURL,
    headers: {},
    timeout: 20000,
  };

  private instance: AxiosInstance = axios.create(this.baseConfig);
  private pending: any = {}; // 存储key值
  private controller = new AbortController(); // 一个控制器对象，允许中止一个或多个 Web 请求。

  public constructor() {
    console.log("==>Request constructor");
    const token = localMng.getItem(TokenName);
    if (token) {
      this.setHeader({
        Authorization: token,
      });
    } else {
      this.initInstance();
    }
  }

  private initInstance() {
    this.instance = axios.create(this.baseConfig);
    this.setReqInterceptors();
    this.setResInterceptors();
  }

  // 请求拦截器
  private setReqInterceptors = () => {
    this.instance.interceptors.request.use(
      (config) => {
        // const { checkApiPermission } = usePermission()
        // config.cancelToken = new axios.CancelToken(function executor(c) {
        // if (!checkApiPermission(config.url)) {
        //   c(config.url + '没有权限')
        //   router.push('/error/forbidden')
        // }
        // });

        console.log("pending==>", this.pending);

        // 计算当前请求key值
        const key = this.getRequestKey(config);
        if (this.checkPending(key)) {
          // 重复请求则取消当前请求
          config.signal = this.controller.signal;
          // 取消请求
          this.controller.abort();
        } else {
          // 加入请求字典
          this.pending[key] = true;
        }

        // console.log(`%c++++++ 开始请求：${config.url} ++++++`, "color:green");
        // console.log(config.data);
        // console.log(`%c++++++ end ++++++`, "color:green");
        return config;
      },
      (err) => {
        window.$message.error("请求失败");
        return Promise.reject(err);
      }
    );
  };

  // 响应拦截器
  private setResInterceptors = () => {
    this.instance.interceptors.response.use(
      (res) => {
        const { code = 200, body, message } = res.data;

        // 请求完成，删除请求中状态
        const key = this.getRequestKey(res.config);
        this.removePending(key);

        switch (code) {
          case 200:
            return Promise.resolve(body || res.data);
          case 401:
            window.$message.warning(message || "无权限");
            const appStore = useAppStoreWithOut();
            appStore.logout(false);
            return Promise.reject(res.data);
          default:
            window.$message.error(message || "响应失败");
            return Promise.reject(res.data);
        }
      },
      (err) => {
        if (!axios.isCancel(err)) {
          window.$message.error("响应失败");
        }
        return Promise.reject(err);
      }
    );
  };

  // 设置请求头
  public setHeader = (headers: any) => {
    this.baseConfig.headers = { ...this.baseConfig.headers, ...headers };
    this.initInstance();
  };

  // 检查key值
  private checkPending = (key) => !!this.pending[key];

  // 删除key值
  private removePending = (key) => {
    delete this.pending[key];
  };

  // 可以根据请求的地址，方式，参数，统一计算出当前请求的md5值作为key
  private getRequestKey = (config) => {
    if (!config) {
      // 如果没有获取到请求的相关配置信息，根据时间戳生成
      return md5(+new Date());
    }
    const data =
      typeof config.data === "string"
        ? config.data
        : JSON.stringify(config.data);
    return md5(config.url + "&" + config.method + "&" + data);
  };

  // get请求
  public get = (
    url: string,
    data = {},
    config: AxiosRequestConfig<any> = {}
  ): Promise<any> =>
    this.instance({ url, method: "get", params: data, ...config });

  // post请求
  public post = (
    url: string,
    data = {},
    config: AxiosRequestConfig<any> = {}
  ): Promise<any> => this.instance({ url, method: "post", data, ...config });

  // 不经过统一的axios实例的get请求
  public postOnly = (
    url: string,
    data = {},
    config: AxiosRequestConfig<any> = {}
  ): Promise<any> =>
    axios({
      ...this.baseConfig,
      url,
      method: "post",
      data,
      ...config,
    });

  // 不经过统一的axios实例的post请求
  public getOnly = (
    url: string,
    data = {},
    config: AxiosRequestConfig<any> = {}
  ): Promise<any> =>
    axios({
      ...this.baseConfig,
      url,
      method: "get",
      params: data,
      ...config,
    });

  // delete请求
  public deleteBody = (
    url: string,
    data = {},
    config: AxiosRequestConfig<any> = {}
  ): Promise<any> => this.instance({ url, method: "delete", data, ...config });

  public deleteParam = (
    url: string,
    data = {},
    config: AxiosRequestConfig<any> = {}
  ): Promise<any> =>
    this.instance({ url, method: "delete", params: data, ...config });
}

export default new Request();
