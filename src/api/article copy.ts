/**
 * 文章相关请求模块
 */
import request from "../utils/request";

// 获取文章列表
export const getArticleList = (params:any) => {
  return request('/mp/v1_0/articles', {
    method: 'GET',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // headers 参数使用 headers 设置
    params: {
      ...params
    }
  })
}

// 获取文章频道
export const getArticleChannels = () => {
  return request('/mp/v1_0/channels', {
    method: 'GET',
  })
}

// 获取指定文章用于编辑
export const getArticleById = (articleId:any) => {
  return request(`/mp/v1_0/articles/${articleId}`, {
    method: 'GET',
  })
}

// 发表文章
export const addArticle = (data:any, draft:boolean = false) => {
  return request('/mp/v1_0/articles',{
    method: 'POST',
    params: {
      draft
    },
    data
  })
}

// 编辑文章
export const editArticle = (articleId:any, data:any, draft:boolean = false) => {
  return request(`/mp/v1_0/articles/${articleId}`,{
    method: 'PUT',
    params: {
      draft
    },
    data
  })
}

// 删除文章
export const deleteSingleArticle = (articleId:number|string) => {
  return request(`/mp/v1_0/articles/${articleId}`, {
    method: 'DELETE',
  })
}
// 修改文章评论状态
export const updateCommentStatus = (articleId: number, allowComment: boolean) => {
  return request(`/mp/v1_0/comments/status?article_id=${articleId}`,{
    method: 'PUT',
    data: {
      allow_comment: allowComment
    }
  })
}