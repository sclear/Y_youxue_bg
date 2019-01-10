<template>
  <div class="user">
    <el-select @change="getInfo" v-model="selectTxt" size="mini" clearable placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-input class="w200" v-model="serch" size="mini" placeholder="用户名"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
    <!-- <el-button class="fs12" @click="CLOSE" size="mini" type="primary">注册用户</el-button> -->
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
      <el-table-column align="center" prop="order_number" label="订单号" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="goods_name" label="商品名称" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="order_money" label="订单价格" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="order_time" label="订单时间" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.order_time | _ymd}}</template>
      </el-table-column>
      <el-table-column align="center" prop="order_type" label="是否支付" show-overflow-tooltip>
        <template slot-scope="scope">
          <span :class="scope.row.order_type===0?'danger':''">{{scope.row.order_type | isPay}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="name" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <i @click="del(scope.row.id)" class="el-icon-close icons"></i>
        </template>
      </el-table-column> -->
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
      options: [
        {
          value: 0,
          label: "未支付"
        },
        {
          value: 1,
          label: "已支付"
        }
      ],
      selectTxt: 0
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let obj = {
        page: this.nowsize,
        number: this.pagesize,
        content: this.serch,
        order_type: this.selectTxt
      };
      _api.getAll(obj).then(res => {
        if (res.status === 200) {
          console.log(res);
          this.list = res.data.data.res;
          this.total = res.data.data.long;
        }
      });
    },
    //delete
    del(num) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        
        })
        .catch();
      console.log(num);
    }
  }
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
