<template>
  <div class="user">
    <el-input class="w200" size="mini" placeholder="用户名"></el-input>
    <el-button class="fs12" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click='CLOSE' size="mini" type="primary">注册用户</el-button>
    <!-- table -->
    <el-table class="ELtable" :data="list" style="width: 100%">
      <el-table-column align="center" prop="user_name" width="50" label="序号">
        <template slot-scope="scope">{{scope.$index+(nowsize - 1) * pagesize + 1}}</template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="案例" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="300" show-overflow-tooltip>
        <template>
          <i class="el-icon-close icons"></i>
          <i class="el-icon-view icons"></i>
          <i class="el-icon-edit icons"></i>
        </template>
      </el-table-column>
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
    <j-model :model="model" @CLOSE="CLOSE" :title='title'>
      <div slot="content">
        
      </div>
    </j-model>
  </div>
</template>

<script>
import _api from "./../api/baseUrl.js";
import mixin from "./../util/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      list:[{
        name:1
      }]
    };
  },
  mounted() {
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
