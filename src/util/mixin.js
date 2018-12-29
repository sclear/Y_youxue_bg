export default {
    data() {
        return {
            serch: '',               //第一个搜索框内容
            list: [],               //table表数据
            title: '暂无标题',        //model title
            model: false,            //model状态
            total: 0,               //分页条数
            pagesize: 10,           //每页显示条数
            nowsize: 1,             //当前页码
            tabModel: {},           //model 内容
            disable: false,         //禁止model输入
            add: false,             //分辨添加 和 编辑
            course_sketchy: '',       //富文本框中的内容(富文本已设置为全局组件 必须！！子组件键名content)
            progress: 0,             //上传视频的进度条 
        }
    },
    methods: {
        //开关model
        CLOSE() {
            this.model = !this.model;
        },
        //分页功能
        changesize(res) {
            this.nowsize = res;
            this.getInfo()
        },
        //自定义每页显示数量
        handleSizeChange(res) {
            this.pagesize = res;
            this.getInfo()
        },
        //单输入框时 所用的查询
        TOPSERCH() {
            this.nowsize = 1;
            this.getInfo();
        },
        //富文本(fn)传入的参数
        getEditor(res) {
            this.course_sketchy = res;
        },
        //该方法是获取实时进度的回调函数
        UPVIDEO(res) {
            this.progress = res;
        },
    }
}
