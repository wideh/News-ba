/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, RequestOptionsInit  } from 'umi-request';
import JSONBIGINT from 'json-bigint'
import router from '../router'
import { ElMessage } from 'element-plus'

const baseURL = 'http://api-toutiao-web.itheima.net'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 配置request请求时的默认参数
 */
const requestBase = extend({});

const request = async <T>(url: string, options?: RequestOptionsInit | undefined) => {
  // 集中错误处理
  const res:any = await requestBase<T>(url, options);
  return res;
};

requestBase.interceptors.request.use((url, options) => {
  const user = JSON.parse(window.localStorage.getItem('user') as string);
  let newUrl = `${baseURL}${url}`
  // 请求拦截 添加token
  const header = { ...options.headers, Authorization: `Bearer ${user.token}` };
  return {
    url: newUrl,
    options: { ...options, headers: header },
  };
});

requestBase.interceptors.response.use(async (response, options) => {
  // if (options.responseType === 'blob') {
  //   return response;
  // }
  let data = await response.clone().json();
  try {
    // 如果转换成功，则直接把结果返回
    // console.log(data)
    JSONBIGINT.parse(data.data)
  } catch (err) {
    console.log('转换失败', err)
    // 如果转换失败了，则进入这里
    // JSONBIGINT解析失败，用正则匹配来替换大数id
    console.log('data', data);
    let newResponseString = JSON.stringify(data).replace(/\"id\": (\d+)/gi,'"id":"$1"');
    // // return newResponseString
    data = JSON.parse(newResponseString)
  }
  // console.log(data);
  let newData:any = {};
  newData.data = data
  return newData;
});

export { requestBase };

export default request;
