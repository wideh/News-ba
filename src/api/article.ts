/**
 * 文章相关请求模块
 */
import request from "../utils/request";

// 获取文章列表
export const getArticleList = (params:any) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // headers 参数使用 headers 设置
    params
  })
}

// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels',
  })
}

// 获取指定文章用于编辑
export const getArticleById = (articleId:any) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`,
  })
}

// 发表文章
export const addArticle = (data:any, draft:boolean = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

// 编辑文章
export const editArticle = (articleId:any, data:any, draft:boolean = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}

// 删除文章
export const deleteSingleArticle = (articleId:number|string) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
// 修改文章评论状态
export const updateCommentStatus = (articleId: number, allowComment: boolean) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/comments/status?article_id=${articleId}`,
    data: {
      allow_comment: allowComment
    }
  })
}