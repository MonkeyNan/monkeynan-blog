// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index'
import App from './App'
import 'assets/css/common' // 这里的样式可以覆盖index.css
Vue.use(ElementUI)
import router from 'routes/index'
import store from './store/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App }, // 这里的components用在了template里边用来编译
  template: '<App/>'
})
