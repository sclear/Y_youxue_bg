export default [
    {
        path: '/',
        redirect: { path:'/user' }
    },
    {
        path: '/user',
        component: resolve => require(['@/components/role/user'], resolve),
    },
    {
        path:'/roledetail',
        component: resolve => require(['@/components/role/roledetail'], resolve),
    }
]