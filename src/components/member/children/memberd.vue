<template>
  <div class="user">
    <el-input v-model="serch" class="w200" size="mini" placeholder="用户名或手机号"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
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
      <el-table-column align="center" prop="user_name" label="名称" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="telephone" label="手机号" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="Evaluation_results" label="成绩" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="enroll_time" label="注册时间" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.enroll_time | _ymd}}</template>
      </el-table-column>
      <el-table-column align="center" prop="channel" label="注册渠道" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.channel | whereDetail}}</template>
      </el-table-column>
      <el-table-column align="center" prop="channel" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <i @click="see(scope.$index)" class="el-icon-view icons"></i>
          <i @click="cost(scope.$index)" title="重置会员密码" class="el-icon-refresh icons"></i>
          <!-- <i class="el-icon-close icons"></i> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <el-table class="ELtable" :data="lists" height="400" style="width: 100%">
          <el-table-column align="center" prop="user_name" width="50" label="序号">
            <template slot-scope="scope">{{scope.$index+(nowsizes - 1) * pagesizes + 1}}</template>
          </el-table-column>
          <el-table-column align="center" prop="order_number" label="订单号" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="goods_name" label="商品名" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="order_money" label="价格" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="order_time" label="购买时间" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.order_time | _ymd}}</template>
          </el-table-column>
          <el-table-column align="center" prop="order_type" label="是否付款" show-overflow-tooltip>
              <template slot-scope="scope"><span :class="scope.row.order_type===0?'danger':''">{{scope.row.order_type | setMoney}}</span></template>
          </el-table-column>
        </el-table>
        <el-pagination
          size="small"
          background
          @current-change="_changesize"
          :current-page="nowsizes"
          :page-size="pagesizes"
          :total="totals"
        ></el-pagination>
      </div>
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
      //model中的表格 与mixins 无关数据 方法以及属性以{ _ }分辨
      lists: [],
      totals: 0,
      pagesizes: 10,
      nowsizes: 1,
      ids:''
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    //获取数据
    getInfo() {
      console.log("getinfo");
      let obj = {
        page: this.nowsize,
        number: this.pagesize,
        content: this.serch
      };
      _api.getMenberUser(obj).then(res => {
        console.log(res);
        this.list = res.data.data.res;
        this.total = res.data.data.long;
      });
    },
    //获取table中数据
    _getInfo() {
        console.log(this.nowsizes)
      _api
        .PurchaseRecord({
          id: this.ids,
          page: this.nowsizes,
          number: this.pagesizes
        })
        .then(res => {
          console.log(res);
          this.lists = res.data.data.res;
          this.totals = res.data.data.long;
        });
    },
    //查看信息
    see(num) {
      this.title = "查看订单详情";
      console.log()
      this.ids = this.list[num].id;
      this._getInfo()
      this.CLOSE();
    },
    //重置会员密码
    cost(num) {
      this.$confirm("是否重置改会员密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _api.upMenberUser({ id:this.list[num].id })
          .then(res=>{
              if(res.status === 200){
                  this.$DIY(res.data.msg);
                  this.getInfo();
              }
          })
          
        })
        .catch();
    },
    // model 中table 分页功能
    _changesize(res) {
      this.nowsizes = res;
      this._getInfo();
    }
  },
  filters: {
    whereDetail: val => (val === 1 ? "PC" : "APP"),
    setMoney: val => val === 1?'已付款':'未付款'
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
.danger{
    color:@danger;
}
</style>
