export default {
    data() {
        return {
            list: [],
            model:false,
            total: 0,
            pagesize: 10,
            nowsize: 1,
            tabModel: {},           //model 内容
            disable: false,         //禁止model输入
            add:false,              //分辨添加 和 编辑
        }
    },
    methods: {
        CLOSE() {
            this.model = !this.model;
        },  
    }
}