import child from './child'
export default [
    {
        path:'/',
        redirect: { path:'/role' }
    },
    {
        path: '/role',
        title: '权限管理',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/role/role'], resolve),
        children:[...child]
    },
    {
        path: 'home',
        title: '主页',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/home/home'], resolve),
        children:[...child]
    },
]