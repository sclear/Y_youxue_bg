import { fetch } from './http'
import { ipUrl } from './env'


class api  {

    //获取用户信息
    getAdminUser(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Adminuser/getAdminUser`,data)
    }

    //获取用户信息
    gettmUser(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Adminuser/gettmUser`,data)
    }

    //查询已有用户
    getAllUser(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Adminuser/getAllUser`,data)
    }

    //修改用户状态
    setdminUser(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Adminuser/setdminUser`,data)
    }

    //添加用户 tm => yym
    addAdminUser(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Adminuser/addAdminUser`,data)
    }


    //绑定角色 tm => yym
    getRoles(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Role/getRoles`,data)
    }


    //绑定权限 tm => yym
    upAdminUser(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Adminuser/upAdminUser`,data)
    }

    //
}



export default new api()

