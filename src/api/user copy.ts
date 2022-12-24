/**
 * 用户相关请求模块
 */

// 用户登录
import request from '../utils/request'
export const login = (data: any) => {
  return request('/mp/v1_0/authorizations',{
    method: 'POST',
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request('/mp/v1_0/user/profile',{
    method: 'GET',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    // headers: {
    //   // 属性名和值都需要看后端要求
    //   // Bearer+空格+token
    //   // axios请求拦截器统一设置了
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}

// 修改用户个人信息
export const editUserProfile = (data: any) => {
  return request('/mp/v1_0/user/profile',{
    method: 'PATCH',
    data
  })
}

// 修改用户头像
export const updatePhoto = (data: any) => {
  return request('/mp/v1_0/user/photo',{
    method: 'PATCH',
    data
  })
}