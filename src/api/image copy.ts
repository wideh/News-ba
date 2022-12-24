/**
 * 素材请求相关模块
 */

import request from '../utils/request'

/**
 * 上传图片素材
 */
export const upLoadImage = (data: any) => {
  return request('/mp/v1_0/user/images', {
    method: 'POST',
    data
  })
}
/**
 * 获取图片素材
 */
export const getImages = (params: any) => {
  return request('/mp/v1_0/user/images',{
    method: 'GET',
    params
  })
}
/**
 * 收藏图片
 */
 export const collectImages = (imageId: any, collect: any) => {
  return request(`/mp/v1_0/user/images/${imageId}`,{
    method: 'PUT',
    data:{
      collect
    }
  })
}
/**
 * 删除图片
 */
export const deleteImages = (imageId: number) => {
  return request(`/mp/v1_0/user/images/${imageId}`,{
    method: 'DELETE',
  })
}