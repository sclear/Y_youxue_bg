import child from './child'
export default [
    {
        path:'/',
        redirect: { path:'/home' }
    },
    {
        path: '/home',
        title: '主页',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/home/home'], resolve),
        children:[
            {
                path: '/',
                redirect: { path:'/home/alls' }
            },
            {
                path: 'alls',
                component: resolve => require(['@/components/home/children/alls'], resolve),
            },
            {
                path: 'swiper',
                component: resolve => require(['@/components/home/children/swiper'], resolve),
            },
            {
                path: 'ad',
                component: resolve => require(['@/components/home/children/ad'], resolve),
            },
            {
                path: 'nav',
                component: resolve => require(['@/components/home/children/nav'], resolve),
            },
        ]
    },
    {
        path: '/role',
        title: '权限管理',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/role/role'], resolve),
        children:[...child]
    },
    {
        path: '/public',
        title: '共有',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/public'], resolve),
        children:[
            {
                path: '/',
                component: resolve => require(['@/components/anli'], resolve),
            },
        ]
    },
]