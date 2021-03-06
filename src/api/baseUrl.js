import { fetch } from './http'
import { ipUrl } from './env'


class api  {

    //上传图片
    upload(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Uploader/add`,data,1)
    }
    //上传视频
    upvideo(data,el) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Uploader/video`,data,el)
    }
    // upvideo(data,el) {
    //     return fetch('post','https://jsonplaceholder.typicode.com/posts/',data,el)
    // }
    //上传图片
    aaa(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Uploader/aaa`,data,1)
    }
    //获取用户信息
    getAdminUser(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Adminuser/getAdminUser`,data)
    }
    //获登录获取用户权限
    adminLogin(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Adminlogin/adminLogin`,data)
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
    //是否显示导航
    upListType(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Listname/upListType`,data)
    }
    //会员列表
    getMenberUser(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Memberuser/getMenberUser`,data)
    }
    //查询购买记录
    PurchaseRecord(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Memberuser/PurchaseRecord`,data)
    }
    //重置用户
    upMenberUser(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Memberuser/upMenberUser`,data)
    }
    //订单管理
    getAll(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Order/getAll`,data)
    }
    //课程分类
    getCourses(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Course/getCouTea`,data)
    }
    //更改课程推荐状态
    courseType(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Course/courseType`,data)
    }
    //更新课程数据
    upCourse(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Course/upCourse`,data)
    }
    //删除课程信息
    delCourse(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Course/delCourse`,data)
    }
    //上下架课程
    downCourse(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Course/downCourse`,data)
    }
    //上下架课程
    addCourse(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Course/addCourse`,data)
    }
    //查询所有教师信息(分页)
    getTeachers(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Teacher/getTeachers`,data)
    }
    //id查询教师个人信息
    getTeacherId(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Teacher/getTeacherId`,data)
    }
    //更新教师信息
    upTeacher(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Teacher/upTeacher`,data)
    }
    //删除教师
    delTeacher(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Teacher/delTeacher`,data)
    }
    //添加教师
    addTeacher(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Teacher/addTeacher`,data)
    }
    //获取教师名称  （勾选）
    getTeacher(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Teacher/getTeacher`,data)
    }
    //获取全部课程 （勾选）
    getCouName(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Course/getCouName`,data)
    }
    //查询二级分类接口
    getLa(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Listname/getLa`,data)
    }
    //修改二级分类展示状态接口
    getHead(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Listname/getHead`,data)
    }
    //展示图片写入
    bindShow(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Listname/bindShow`,data)
    }
    //后台查询评论(分页)
    getComment(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Comment/getComment`,data)
    }
    //删除评论 
    delComment(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Comment/delComment`,data)
    }
    //查询所有的介绍信息(分页) 
    getIntroduces(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Introduce/getIntroduces`,data)
    }
    //更新相关介绍信息
    upIntroduce(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Introduce/upIntroduce`,data)
    }
    //删除相关介绍信息
    deIntroduce(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Introduce/deIntroduce`,data)
    }
    //添加相关介绍信息
    addIntroduce(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Introduce/addIntroduce`,data)
    }
    //查询试题
    getItemList(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Itembank/getItemList`,data)
    }
    //删除试题
    delItemBank(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Itembank/delItemBank`,data)
    }
    //删除试题
    addItemBank(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Itembank/addItemBank`,data)
    }
    //更新试题
    upItemBank(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Itembank/upItemBank`,data)
    }
    //添加章节并绑定课程id
    addChapter(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Chapter/addChapter`,data)
    }
    //课程id查章节视频
    getCoursess(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Course/getCoursess`,data)
    }
    //删除视频
    delIDVideo(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Video/delIDVideo`,data)
    }
    //删除分类
    delChapter(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Chapter/delChapter`,data)
    }
    //修改视频信息
    upVideos(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Video/upVideo`,data)
    }
    //修改视频信息
    addVideo(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/Video/addVideo`,data)
    }
    //发送系统消息
    addUserNews(data) {
        return fetch('post',`${ipUrl}/kxk01yx_ierdh/News/addUserNews`,data)
    }
}



export default new api()

