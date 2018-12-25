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
            add: false,              //分辨添加 和 编辑
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
            console.log(122)
            this.nowsize = 1;
            this.getInfo();
        }
    }
}
