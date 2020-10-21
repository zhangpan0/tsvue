import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "element-ui";

const Message:any = message
const instance:any = axios
const http:any = {}

http.get = function (url, params = {},options) {
  return new Promise((resolve, reject) => {
    instance.get(url, params)
      .then(response => {
        if (response.status == 'success') {
          resolve(response.data)
        } else{
          reject(response.msg)
        }
      })
      .catch(err => {
        // Message.error({
        //   message: '网络繁忙！'
        // })
        reject(err)
      })
  })
}

http.post = function (url, params, options) {
  // let loading
  // if (!options || options.isShowLoading !== false) {
  //     loading = document.getElementById('ajaxLoading')
  //     loading.style.display = 'block'
  // }
  return new Promise((resolve, reject) => {
    instance.post(url, params, options)
      .then(response => {
        // if (!options || options.isShowLoading !== false) {
        //     loading = document.getElementById('ajaxLoading')
        //     loading.style.display = 'none'
        // }        
        if (response.status == 'success') {
          // Message.success({message: response.msg});
          resolve(response.data)
        } else {
        //   Message.error({
        //       message: response.msg
        //   })
          reject(response.msg)
        }
      })
      .catch(err => {
        // Message.error({
        //   message: '网络繁忙！'
        // })
        // router.push({name:'login'});
        reject(err)
      })
  })
}

export default http