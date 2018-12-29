import router from './../router/index'
import routeUrl from './../router/meun'
import _api from './../api/baseUrl'
import { DIYtoast } from './../util/tool'
export default {
    namespaced: true,
    state: {
        user_id: null,
        menu: routeUrl,
        main: [{
            path: '/page',
            component: resolve => require(['@/components/page'], resolve),
            children: null
        }]
    },

    getters: {},
    mutations: {
        //自动登录 配置路由
        setMenu(state, msg_menu) {
            let getMenu = [];
            for (let i = 0; i < msg_menu.length; i++) {
                getMenu.push(msg_menu[i].url)
            }
            let newobj = state.menu.filter(val => {
                return getMenu.indexOf(val.path) != -1 || val.path === '/'
            })
            state.main[0].children = newobj;
            //数据持久化
            localStorage.setItem('s_menu', JSON.stringify(state.main));
            localStorage.setItem('koa', JSON.stringify(getMenu));
            router.addRoutes(state.main);
            router.push('/page');
        },
        //F5 刷新自动登录 addroutes配置路由
        autoLogin(state) {
            let obj = JSON.parse(localStorage.getItem('koa'));
            let newobj = state.menu.filter(val => {
                return obj.indexOf(val.path) != -1 || val.path === '/'
            })
            state.main[0].children = newobj;
            router.addRoutes(state.main);
        }
    },


    actions: {
        //处理登录
        async SETMENUS(ctx) {
            let id = JSON.parse(localStorage.getItem('userInfo')).user_id;
            let msg_menu = await _api.adminLogin({ user_id: id });
            if (msg_menu.data.code === 200) {
                if (!msg_menu.data.data.length) {
                    DIYtoast('暂无权限,请联系管理员')
                } else {
                    ctx.commit('setMenu', msg_menu.data.data)
                }
            }

        }
    }
}