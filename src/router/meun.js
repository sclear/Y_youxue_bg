// 该文件仅仅作为数据传递给Vuex
export default [
    {
        path: '/',
        // redirect: { path: '/page/home' }
        component: resolve => require(['@/components/welcome/welcome'], resolve),

    },
    {
        path: '/page/home',
        title: '主页',
        icon: '\ue64e',
        component: resolve => require(['@/components/home/home'], resolve),
        redirect: { path: '/page/home/alls' },
        children: [
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
        path: '/page/member',
        title: '会员管理',
        icon: '\ue643',
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
        icon: '\ue60c',
        component: resolve => require(['@/components/classs/classs'], resolve),
        redirect: { path: '/page/classs/list' },
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
            {
                path: 'videos',
                component: resolve => require(['@/components/classs/children/videos'], resolve),

            },
        ]
    },
    {
        path: '/page/order',
        title: '订单管理',
        icon: '\ue896',
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
        icon: '\ue658',
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
        path: '/page/info',
        title: '资讯管理',
        icon: '\ue608',
        component: resolve => require(['@/components/info/info'], resolve),
        redirect: { path: '/page/info/info' },
        children: [
            {
                path: 'info',
                component: resolve => require(['@/components/info/children/infos'], resolve),
            }
        ]
    },
    {
        path: '/page/test',
        title: '试题管理',
        icon: '\ue63a',
        component: resolve => require(['@/components/test/test'], resolve),
        redirect: { path: '/page/test/test' },
        children: [
            {
                path: 'test',
                component: resolve => require(['@/components/test/children/tests'], resolve),
            }
        ]
    },
    {
        path: '/page/role',
        title: '权限管理',
        icon: '\ue616',
        component: resolve => require(['@/components/role/role'], resolve),
        redirect: { path: '/page/role/user' },
        children: [
            {
                path: 'user',
                component: resolve => require(['@/components/role/children/user'], resolve),
            },
            {
                path:'roledetail',
                component: resolve => require(['@/components/role/children/roledetail'], resolve),
            }
        ]
    },
    {
        path: '/public',
        title: '共有',
        icon: '\ue63a',
        component: resolve => require(['@/components/public'], resolve),
        children: [
            {
                path: '/',
                component: resolve => require(['@/components/anli'], resolve),
            },
        ]
    },
]