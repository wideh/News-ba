/**
 * 素材请求相关模块
 */

import request from '../utils/request'

/**
 * 上传图片素材
 */
export const upLoadImage = (data: any) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
/**
 * 获取图片素材
 */
export const getImages = (params: any) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
/**
 * 收藏图片
 */
 export const collectImages = (imageId: any, collect: any) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data:{
      collect
    }
  })
}
/**
 * 删除图片
 */
export const deleteImages = (imageId: number) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`,
  })
}