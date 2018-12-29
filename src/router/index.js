import Vue from 'vue'
import Router from 'vue-router'
// import menu from './meun'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/welcome',
      component: resolve => require(['@/components/page'], resolve),
      children: [{
        path: '/',
        component: resolve => require(['@/components/welcome/welcome'], resolve),

      }]
    },
    {
      path: '/',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '*',
      // component: resolve => require(['@/components/login'], resolve)
      redirect:{ path:'/welcome' }
    },
  ]
})

// Router.beforeEach((to, from, next) => {
//   console.log(to.path)
  
// })
// router.beforeEach((to, from, next) => {})
