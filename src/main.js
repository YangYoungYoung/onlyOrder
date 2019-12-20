import Vue from 'vue'
import App from './App'
import axios from 'axios'
import qs from 'qs'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import './rem.js';
import VueWechatTitle from 'vue-wechat-title'
import BScroll from 'better-scroll'
Vue.use(VueWechatTitle)
Vue.use(Mint)

Vue.config.productionTip = false
//定义全局变量


Vue.prototype.$axios = axios
Vue.prototype.qs = qs
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
