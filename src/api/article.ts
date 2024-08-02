import axios from 'axios';




export interface ArticleContentData {
  articleId: string,
  id: number
}

export interface DeleteArticleContentData {
  articleId: string
}

export interface SaveArticleContentData {
  teamId: number,
  bookId: number,
  articleId: string,
  content: string
}

export interface addArticleContentData {
  articleId: string,
  name: string,
  isRoot: boolean,
  flag: number,
  teamId: number,
  bookId: number
}

export interface bookInfoData {
  bookId: number
}


export interface ArticleMenuData {
  articleId: string
}
export function articleMenu(data: ArticleMenuData) {
  return axios.get('/api/article/articleMenu', {params: data});
}

export function articleMenuInit(data: any) {
  return axios.get('/api/article/articleMenuInit', {params: data});
}

export function articleContent(data: ArticleContentData) {
  return axios.get('/api/article/articleContent', {params: data});
}

export function saveArticleContent(data: any) {
  return axios.patch('/api/article/articleContent', data);
}

export function deleteArticleContent(data: DeleteArticleContentData) {
  return axios.delete('/api/article/articleContent', data);
}

export function addArticleContent(data: addArticleContentData) {
  return axios.post('/api/article/articleContent', data);
}

export function getBookInfo(data: bookInfoData) {
  return axios.get('/api/article/book', {params: data});
}

// 获取book的所有目录
export function getBookCategory(data: bookInfoData) {
  return axios.get('/api/article/book_category', {params: data});
}

export interface ArticleStatistic {
  id: number
}
// 获取文章的浏览点赞等统计数据
export function getArticleStatistic(data: ArticleStatistic) {
  return axios.get('/api/article/statistic', {params: data});
}

export interface UpdateArticleStatistic {
  id: number,
  flag: string,
  operation: number
}
// 获取文章的浏览点赞等统计数据
export function updateArticleStatistic(data: UpdateArticleStatistic) {
  return axios.patch('/api/article/statistic', data);
}


// 添加评论
export interface CommentData {
  id: number,
  comment: string,
  replyUserId: number,
  replyCommentId: number
}

export function addComment(data: CommentData) {
  return axios.post('/api/article/comment', data);
}

export interface GETCommentData {
  id: number
}
// 获取文章的浏览点赞等统计数据
export function getComment(data: GETCommentData) {
  return axios.get('/api/article/comment', {params: data});
}

export interface PatchCommentData {
  id: number,
  flag: number,
  operationType: string
}
// 评论点赞
export function patchComment(data: PatchCommentData) {
  return axios.patch('/api/article/comment', data);
}


