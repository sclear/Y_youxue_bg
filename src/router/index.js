import Vue from 'vue'
import Router from 'vue-router'
import menu from './meun'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/components/page'], resolve),
      children:[...menu]
    }
  ]
})
