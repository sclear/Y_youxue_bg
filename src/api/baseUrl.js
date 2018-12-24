import { fetch } from './http'
import { ipUrl } from './env'


class api  {

    //上传图片
    upload(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Uploader/add`,data,1)
    }
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

    //查询所有角色
    getRole(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Role/getRole`,data)
    }
    //添加后台角色
    addRole(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Role/addRole`,data)
    }
    //删除后台角色
    delRole(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Role/delRole`,data)
    }
    //查询所有菜单
    getAllMenu(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/power/getAllMenu`,data)
    }
    //权限绑定菜单
    setPower(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Power/setPower`,data)
    }
    //查询角色菜单
    getMenu(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Power/getMenu`,data)
    }
    //轮播
    getBanner(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Banner/getBanner`,data)
    }
    //添加轮播
    addBanner(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Banner/addBanner`,data)
    }
    //更新轮播
    upBanner(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Banner/upBanner`,data)
    }
    //删除轮播
    delBanner(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Banner/delBanner`,data)
    }
    //删除轮播
    upRole(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Role/upRole`,data)
    }
    //数据汇总
    Summary(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Adminuser/Summary`,data)
    }
    //查询所有广告
    getAds(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Ad/getAds`,data)
    }
    //添加广告
    addAd(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Ad/addAd`,data)
    }
    //更新广告
    upAd(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Ad/upAd`,data)
    }
    //删除广告
    deAd(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Ad/deAd`,data)
    }
    //获取导航信息
    getList(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Listname/getList`,data)
    }
    //添加一级导航
    addList(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Listname/addList`,data)
    }
    //删除分类
    deList(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Listname/deList`,data)
    }
    //更新分类名称
    upList(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Listname/upList`,data)
    }

    //
}



export default new api()

