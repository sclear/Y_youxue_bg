<template>
  <div class="user">
    <el-input v-model="serch" class="w200" size="mini" placeholder="用户名"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click="CLOSE" size="mini" type="primary">添加课程</el-button>
    <!-- 分页 -->
    <el-pagination
      size="small"
      class="pagin"
      background
      @current-change="changesize"
      :current-page="nowsize"
      :page-size="pagesize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 50, 100]"
    ></el-pagination>
    <!-- table -->
    <el-table class="ELtable" :data="list" height="400" style="width: 100%">
      <el-table-column align="center" prop="user_name" width="50" label="序号">
        <template slot-scope="scope">{{scope.$index+(nowsize - 1) * pagesize + 1}}</template>
      </el-table-column>
      <el-table-column align="center" prop="course_name" label="课程名" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="course_free" label="是否免费" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.course_free === 1?'是':'否'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="course_adapt" label="适应人群" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="course_hour" label="课时" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="course_money" label="价格" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="course_type" label="是否上架" show-overflow-tooltip>
        <template slot-scope="scope">
          <i v-if="scope.row.update_time===1" class="el-icon-check fs20 suc"></i>
          <i v-else class="el-icon-close fs20 danger"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="update_time" label="更新时间" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.update_time | _ymd}}</template>
      </el-table-column>
      <el-table-column align="center" prop="Number" label="学习人数" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-view icons"></i>
          <i class="el-icon-edit icons"></i>
          <i class="el-icon-close icons"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content"></div>
    </j-model>
  </div>
</template>

<script>
import _api from "./../../../api/baseUrl.js";
import mixin from "./../../../util/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      lists: [] //联动数据
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      _api
        .getCourses({
          page: this.nowsize,
          number: this.pagesize,
          content: this.serch
        })
        .then(res => {
          this.list = res.data.data.res;
          this.total = res.data.data.long;
        });
      //获取联动数据
      _api.getList().then(res => (this.lists = res.data.data));
    }
  },

  components: {}
};
</script>

<style lang='less' scoped >
.user {
  .ELtable {
    width: 100% !important;
    margin-top: 15px;
  }
}
.fs {
  font-size: 12px !important;
}
</style>
