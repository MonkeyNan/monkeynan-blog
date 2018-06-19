import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)
import routes from './routes'
// 滚动条滚到顶部
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
const router = new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes
})
// 路由钩子
router.beforeEach(({ meta, path }, from, next) => {
  store.dispatch('showProgress', 0)
  let { auth = true } = meta
  let isLogin = Boolean(store.state.token)

  // 访问不需要权限的设置 meta: false
  // 注册也要设置成 meta: false
  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  // 如果登录了以后在访问 reg 和 login 则路由到Home
  if (isLogin && (path == '/login' || path == '/reg')) {
    return next({ path: '/admin' })
  }
  // 未登录的情况下访问 reg 则直接路由
  next()
})

export default router
