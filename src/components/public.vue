<template>
  <div class="user">
    <el-input class="w200" size="mini" v-model="serch" placeholder="用户名"></el-input>
    <el-button size="mini" type="primary">查询</el-button>
    <!-- table -->
    <el-table class="ELtable" :data="list" style="width: 100%">
      <el-table-column center="center" prop="date" label="日期" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column center="center" prop="name" label="姓名" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column center="center" prop="address" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      size="small"
      class="pagin"
      background
      @current-change="changesize"
      :current-page="nowsize"
      :page-size="pagesize"
      :total="total"
    ></el-pagination>
    <!-- model -->
    <!-- <j-model></j-model> -->
  </div>
</template>

<script>
import _api from "./../../api/baseUrl.js";
import mixin from "./../../util/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      list: [],
      serch: ""
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let obj = {
          content:this.serch,
          number:this.pagesize,
          page:this.nowsize
      }
      _api.login(obj).then(res => {
          console.log(res)
          if(res.status === 200){
              this.total = res.data.data.long;
          }
      });
    },
    changesize(res) {
        this.nowsize = res;
        this.getInfo()
    }
  },
  components: {}
};
</script>

<style lang='less' scoped >
.user {
  height: 100%;
  position: relative;
  .ELtable {
    margin-top: 15px;
  }
}
</style>
