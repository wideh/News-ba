/**
 * 基于axios 封装请求模块
 */
import axios from 'axios'
import JSONBIGINT from 'json-bigint'
import router from '../router'
import { ElMessage } from 'element-plus'
// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础路径
  // 定义后端返回的原始数据的处理
  transformResponse: [function (data) {
    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      // console.log(data)
      return JSONBIGINT.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // JSONBIGINT解析失败，用正则匹配来替换大数id
      let newResponseString = data.replace(/\"id\": (\d+)/gi,'"id":"$1"');
      // return newResponseString
      return JSON.parse(newResponseString)
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 任何请求都会经过这里
  // config:本次请求发送的相关信息，是当前请求相关的配置信息对象
  // config是可以修改的
  // console.log(config)
  const user = JSON.parse(window.localStorage.getItem('user') as string);
  // 如果用户已登录，统一给接口设置token 信息)
  if (user) {
    // 请求信息增加头部消息
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完之后一定要返回，否则请求会停在这里
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function(response) {
  // 所有2xx会经过这里
  return response
}, function(error){
  // 任何非2xx状态码会经过这里
  const { status } = error.response
  if(status === 401) {
    // 跳转到登录页面, 防止用户伪造user,访问页面
    // 虽然没有获取到权限，访问不到数据，但可以进入页面
    router.push('/login')
    ElMessage({
      showClose: true,
      message: `登录状态无效，请重新登录`,
      type: 'error'
    })
  } else if (status === 403) {
    ElMessage({
      showClose: true,
      message: `没有炒作权限`,
      type: 'error'
    })
  } else if (status === 400) {
    ElMessage({
      showClose: true,
      message: `请求参数错误`,
      type: 'error'
    })
  } else if (status > 500) {
    ElMessage({
      showClose: true,
      message: `服务端内部异常，请稍后再试`,
      type: 'error'
    })
  }
})

// 导出请求方法
export default request

