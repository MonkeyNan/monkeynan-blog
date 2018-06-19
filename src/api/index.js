// 各种 api 负责用 instance 和服务端尽心个交互

import axios from 'axios'
import store from '../store'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create()
const front_instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json'
if (localStorage.getItem('jwt')) {
  // localStorage.getItem('jwt')是带引号的字符串
  // Bearer token(通过Authorization头部字段发送到服务器便于验证)的格式： Bearer XXXXXXX
  instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('jwt').replace(/(^\")|(\"$)/g, '')
}

// axios 请求拦截器
axios.interceptors.request.use = instance.interceptors.request.use = front_instance.interceptors.request.use
front_instance.interceptors.request.use(config => {
  store.dispatch('showProgress', 20)
  return config
}, err => {
  return Promise.reject(err)
})

// axios 响应拦截器
axios.interceptors.response.use = instance.interceptors.response.use = front_instance.interceptors.response.use
front_instance.interceptors.response.use(response => {
  store.dispatch('showProgress', 100)
  return response
}, err => {
  store.dispatch('showProgress', 100)
  return Promise.reject(err)
})

export default {
  // 注册
  localReg(data) {
    return axios.post('/api/reg', data)
  },
  // 登录
  localLogin(data) {
    return axios.post('/api/login', data)
  },
  // 获取文章列表（带分页获取）
  getArticleList(data) {
    return instance.post('/api/article/lists', data)
  },
  // 不带分页获取文章
  getArticellists(params) {
    return front_instance.post('/api/article/articleLists', params)
  },
  // 根据分类获取文章列表
  getArticlesByClassify(params) {
    return front_instance.post('/api/article/noAuthArticlelists', params)
  },
  // 创建文章
  createArticle(params) {
    return instance.post('/api/article/create', params)
  },
  // 删除一篇文章
  removeOneArticle(params) {
    return instance.post('/api/article/remove', params)
  },
  // 根据 postID 获取一篇文章（带权限）
  getOneArticle(params) {
    return instance.post('/api/article/onePage', params)
  },
  // 根据 postID 获取一篇文章（不带权限）
  getOneArticleNoAuth(params) {
    return front_instance.post('/api/article/noAuth', params)
  },
  // 编辑一篇文章
  editArticle(params) {
    return instance.post('/api/article/edit', params)
  },
  // 获取分类列表
  getClassify() {
    return instance.get('/api/classify/lists')
  },
  // 去权限获取分类列表
  getNoAuthClass() {
    return front_instance.get('/api/classify/noAuth')
  },
  // 删除一个分类
  removeClassifyList(params) {
    return instance.post('/api/classify/remove', params)
  },
  // 添加分类
  addClassify(params) {
    return instance.post('/api/classify/create', params)
  },
  // 编辑分类
  editClassify(params) {
    return instance.post('/api/classify/edit', params)
  }
}

