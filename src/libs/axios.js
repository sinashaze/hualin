import axios from 'axios'
import store from '@/store'
import msg from '../main'
import { Spin } from 'view-design'
import { getToken, getSecret, getUserId, getLoginNo } from '@/libs/util'
import axo from '@/libs/api.request'
// import { Spin } from 'iview'

function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie =
        keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
}
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  //if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig(options) {
    const config = {
      baseURL: this.baseUrl,
      retry: 3,
      retryDelay: 1000,
      timeout: 120000,
      maxContentLength: 0,
      headers: {
        'Content-Type': options.upload === undefined ? options.method === 'get' ? 'application/x-www-form-urlencoded' : 'application/json' : 'multipart/form-data',
        'userId': store.state.user.userId ? store.state.user.userId : 1,
        'RoleId': store.state.user.RoleId ? store.state.user.RoleId : 1001
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      Spin.hide();
      this.queue[url] = true
      if (!(/GetUser$/.test(url)) && !url.includes("save_error_logger")) {
        let data = {}
        data.token = getToken()
        data.secret_key = getSecret()
        data.userId = getUserId()
        data.loginNo = getLoginNo()
        if (config.method === "get") {//get请求
          if (config.params) {
            config.params = Object.assign(config.params, data) //`${ config.params }&${ qs.stringify(data)}`
          } else {
            config.params = data //`${ qs.stringify(data)}`
          }
        } else {
          if (config.data) {//post请求
            if (config.headers['Content-Type'] === 'multipart/form-data') {
              let fromData = new FormData()
              let f = Object.assign(config.data, data)
              for (let i in f) {
                fromData.append(i, f[i])
              }
              config.data = fromData
            } else {
              config.data = Object.assign(config.data, data)
            }
            // config.data =`${ qs.stringify(config.data) }&${ qs.stringify(data)}`
          } else {
            // config.data =`${ qs.stringify(data)}`
            config.data = data
          }
        }
      }
      return config
    }, error => {
      // msg.error({
      //   content: error
      // })
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res;
      if (data instanceof Blob) { //文件流下载
        let url = window.URL.createObjectURL(data)
        let link = document.createElement("a");
        let timestamp = (new Date()).valueOf();
        const fileName = timestamp + '.zip'
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click();
        window.URL.revokeObjectURL(link.href) // 释放URL 对象
        document.body.removeChild(link)
        //return 'ok'
      } else if (status === 200 && String(data.error_code) === "1000") {
        sessionStorage.removeItem("errorNmber")
        if (data.page) {
          if (data.data) {
            return data
          } else {
            data.data = []
            return data
          }
        }
        else return data.data
        //return data.data
      } else {
        if (data.message !== '非法数据！') {
          let errorSession = sessionStorage.getItem("errorNmber")
          let errorAlert = true
          let errObj = {}
          errObj.url = url
          errObj.message = data.message
          if (errorSession && !url.includes('/api/Logon/GetUser')) {
            let strErr = JSON.parse(errorSession)//errorSession.split('-')[0]
            if (strErr.url === url) {
              sessionStorage.setItem("errorNmber", JSON.stringify(errObj))
            } else {
              errorAlert = false
              sessionStorage.setItem("errorNmber", JSON.stringify(errObj))
            }
          } else {
            sessionStorage.setItem("errorNmber", JSON.stringify(errObj))
          }
          if (errorAlert) {
            msg.error({
              content: data.error_code === '1005' && data.message === '非法请求' ? '您的账号已在另一台电脑登录' : data.message,
              onClose() {
                if (data.error_code === '1005' && data.message === '非法请求') {//token 失效
                  window.location.href = '/login'
                  clearAllCookie()
                  localStorage.clear()
                  sessionStorage.clear()
                }
              }
            })
          }

        }
        Spin.hide()
        return Promise.reject(data.message)
      }
    }, error => {//响应错误
      this.destroy(url)
      Spin.hide()
      let config = error.config;
      //如果配置不存在或未设置重试选项，则返回错误信息 
      if (!config || !config.retry) return Promise.reject(err.response.data);
      //设置变量即跟踪重试次数   
      config.__retryCount = config.__retryCount || 0;
      // 检查我们是否已经超过了总重试次数  
      if (config.__retryCount >= config.retry) {
        // 返回错误信息        
        return Promise.reject(err.response.data);
      }
      // 重试次数加1  
      config.__retryCount += 1;
      // 创建延时器等待发送重试请求

      const backoff = new Promise(async function (resolve) {

        setTimeout(function () {

          resolve();

        }, config.retryDelay || 1);

      });
      // 返回调用AXIOS来重试请求

      return backoff.then(function () {
        return axo.request(config);
      });
      // let errorInfo = error.response
      // if (!errorInfo) {
      //   const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
      //   errorInfo = {
      //     statusText,
      //     status,
      //     request: { responseURL: config.url }
      //   }
      // }
      
      // let errorSession = sessionStorage.getItem("errorLoad")
      // if (errorSession) {
      //   let strErr = errorSession.split('-')[0]
      //   if (strErr === '刷新!!!') {
      //     sessionStorage.removeItem("errorLoad")
      //   } else {
      //     sessionStorage.setItem("errorLoad", `${'刷新!!!'}-${error}`)
      //     //window.location.reload()
      //   }
      // } else {
      //   sessionStorage.setItem("errorLoad", `${'刷新!!!'}-${error}`)
      //   //window.location.reload()
      // }
      // return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(options), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
