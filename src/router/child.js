export default [
    {
        path: '/',
        redirect: { path:'/role/user' }
    },
    {
        path: 'user',
        component: resolve => require(['@/components/role/children/user'], resolve),
    },
    {
        path:'roledetail',
        component: resolve => require(['@/components/role/children/roledetail'], resolve),
    }
]