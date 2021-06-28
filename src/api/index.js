// utils/axios.js
import axios from 'axios'
import { Toast } from 'antd-mobile'

// 根据 process.env.NODE_ENV 环境变量判断开发环境还是生产环境，我们服务端本地启动的端口是 7001
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//localhost:7001' : '' 
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// post 请求是 json 形式的
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    console.error('数据格式响应错误:', res.data)
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.status != 200) {
    if (res.data.message) Toast.error(res.data.message)
    return Promise.reject(res.data)
  }
  return res.data
})

export default axios
