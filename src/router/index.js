import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
    mode: 'history',
    base:'/onlyOrder/',
routes: [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue'),
        meta: {
        title: '首页'
        }
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../views/order.vue'),
        meta: {
        title: '点餐'
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/cart.vue'),
        meta: {
        title: '购物车'
        }
    },
    {
        path: '/schedule',
        name: 'schedule',
        component: () => import('../views/schedule.vue'),
        meta: {
        title: '菜品进度'
        }
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: () => import('../views/feedback.vue'),
        meta: {
        title: '意见反馈'
        }
    },
    {
        path: '/form',
        name: 'form',
        component: () => import('../views/form.vue'),
        meta: {
        title: '订单'
        }
    }
]

})