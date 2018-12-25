import child from './child'
export default [
    {
        path: '/',
        redirect: { path: '/page/home' }
    },
    {
        path: '/page/home',
        title: '主页',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/home/home'], resolve),
        redirect: { path: '/page/home/alls' },
        children: [
            // {
            //     path: '/',
            //     redirect: { path:'/page/home/alls' }
            // },
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
        path: '/page/role',
        title: '权限管理',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/role/role'], resolve),
        redirect: { path: '/page/role/user' },
        children: [...child]
    },
    {
        path: '/page/member',
        title: '会员管理',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/member/member'], resolve),
        redirect: { path: '/page/member/member' },
        children: [
            {
                path: 'member',
                component: resolve => require(['@/components/member/children/memberd'], resolve),

            }
        ]
    },
    {
        path: '/page/classs',
        title: '课程管理',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/classs/classs'], resolve),
        redirect: { path: '/page/classs/classify' },
        children: [
            {
                path: 'classify',
                component: resolve => require(['@/components/classs/children/classify'], resolve),

            },
            {
                path: 'list',
                component: resolve => require(['@/components/classs/children/list.vue'], resolve),

            },
            {
                path: 'talk',
                component: resolve => require(['@/components/classs/children/talk'], resolve),

            },
        ]
    },
    {
        path: '/page/order',
        title: '订单管理',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/order/order'], resolve),
        redirect: { path: '/page/order/order' },
        children: [
            {
                path: 'order',
                component: resolve => require(['@/components/order/children/orderd'], resolve),
            }
        ]
    },
    {
        path: '/page/teacher',
        title: '教师管理',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/teacher/teacher'], resolve),
        redirect: { path: '/page/teacher/teacher' },
        children: [
            {
                path: 'teacher',
                component: resolve => require(['@/components/teacher/children/teachers'], resolve),
            }
        ]
    },
    {
        path: '/public',
        title: '共有',
        icon: 'el-icon-setting',
        component: resolve => require(['@/components/public'], resolve),
        children: [
            {
                path: '/',
                component: resolve => require(['@/components/anli'], resolve),
            },
        ]
    },
]