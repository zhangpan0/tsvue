import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Message } from "element-ui";

export interface ResponseData {
  code: number;
  data?: any;
  message: string;
}

// 创建 axios 实例
let service: AxiosInstance | any;
service = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  validateStatus (status) {
    switch (status) {
      case 400:
        // Message.error('请求出错')
        break
      case 401:
        // Message.warning({
        //     message: '授权失败，请重新登录'
        // })
        return
      case 403:
        // Message.warning({
        //     message: '拒绝访问'
        // })
        break
      case 404:
        // Message.warning({
        //     message: '请求错误,未找到该资源'
        // })
        break
      case 500:
        // Message.warning({
        //     message: '服务端错误'
        // })
        break
    }
    return status >= 200 && status < 300
  }
})

// 每次请求携带cookies信息
axios.defaults.withCredentials = true;

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求头添加token
    let token = '';
    if (token) {
      config.headers['userToken'] = token;
    }
    return config;
  },
  (error: any) => {
    // Do something with request error
    console.error("error:", error); // for debug
    Promise.reject(error);
  }
);

// respone 拦截器 axios 的一些配置
service.interceptors.response.use(
  (res: AxiosResponse) => {
    const data: ResponseData = res.data
    return data;
  },
  (error: any) => Promise.reject(error)
);

export default service;
