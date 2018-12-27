<template>
  <div class="user">
    <el-input class="w200" size="mini" v-model="serch" placeholder="用户名"></el-input>
    <el-button class="fs12" size="mini" @click="getInfo" type="primary">查询</el-button>
    <el-button class="fs12" size="mini" @click="sign" type="primary">注册用户</el-button>
    <!-- <el-input class="w200" v-model="pagesize" size="mini" placeholder="显示数量"></el-input> -->
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
      <el-table-column align="center" prop="user_name" label="账号" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column
        align="center"
        prop="role_name"
        label="用户名"
        width="300"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" max-width="300" prop="user_name" label="状态">
        <template slot-scope="scope">
          <!-- <el-button
            @click="changeState(scope.$index,0)"
            v-if="scope.row.prohibit === 1"
            class="fs12"
            size="mini"
            type="success"
          >是</el-button>
          <el-button
            @click="changeState(scope.$index,1)"
            v-else
            class="fs12"
            size="mini"
            type="warning"
          >否</el-button> -->
          <i
            class="el-icon-check fs12 gou"
            @click="changeState(scope.$index,0)"
            v-if="scope.row.prohibit === 1"
          ></i>
          <i class="el-icon-close fs12 red" @click="changeState(scope.$index,1)" v-else></i>
        </template>
      </el-table-column>
      <el-table-column align="center" max-width="300" prop="user_name" label="操作">
        <template slot-scope="scope">
          <i @click="LOOK(scope.$index)" class="el-icon-edit icons"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <el-pagination
      size="small"
      class="pagin"
      background
      @current-change="changesize"
      :current-page="nowsize"
      :page-size="pagesize"
      :total="total"
    ></el-pagination>-->
    <!-- model -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>-->
    <j-model :model="model" :title='title' @CLOSE="CLOSE">
      <div slot="content">
        <div v-if="add">
          <el-transfer
            v-model="getList"
            :filterable="bole"
            :props="{
            key: 'user_id',
            label: 'user_name'
            }"
            :titles="titlesName"
            :data="tablist"
          ></el-transfer>
          <el-button class="fs12 upmsg" size="mini" @click="setUser" type="primary">提交</el-button>
        </div>
        <div v-if="!add">
          <div class="box">
            <div class="co">角色绑定:</div>
            <el-select class="sele" v-model="value" placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in roleList"
                :key="item.role_id"
                :label="item.role_name"
                :value="item.role_id"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-button class="upset" size="mini" @click="bindrole" type="primary">提交</el-button>
          </div>
        </div>
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
      getList: [], //选中的穿梭内容
      bole: true, //穿梭 搜索
      tablist: [], //获取所有信息
      // add: false,
      roleList: [],
      value: "",
      id: "",
      titlesName: ["未注册用户", "已注册用户"]
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let obj = {
        content: this.serch,
        number: this.pagesize,
        page: this.nowsize
      };
      _api.getAllUser(obj).then(res => {
        this.list = res.data.data.res;
        this.total = res.data.data.long;
      });

      _api.getAdminUser().then(res => {
        if (res.status === 200) {
          let arr = [];
          let tmarr = [];
          let usarr = [];
          tmarr = res.data.data.tm;
          usarr = res.data.data.res;
          for (let i = 0; i < tmarr.length; i++) {
            for (let j = 0; j < usarr.length; j++) {
              if (tmarr[i].user_id === usarr[j].user_id) {
                tmarr[i].disabled = true;
              }
            }
          }
          this.tablist = tmarr;
        }
      });
    },
    changesize(res) {
      this.nowsize = res;
      this.getInfo();
    },
    handleSizeChange(res) {
      this.pagesize = res;
      this.getInfo();
    },
    //settting
    LOOK(res) {
      this.title = '编辑用户信息'
      this.id = this.list[res].user_id;
      this.value = this.list[res].role_id;
      this.CLOSE();
      this.add = false;
      _api.getRoles().then(res => {
        console.log(res);
        this.roleList = res.data.data;
      });
    },
    bindrole() {
      _api
        .upAdminUser({
          user_id: this.id,
          role: this.value
        })
        .then(res => {
          if (res.status === 200) {
            this.CLOSE();
            this.getInfo();
            this.$DIY(res.data.msg);
          }
        });
    },

    openrole() {
      console.log(this.tabModel.prohibit);
    },
    //修改状态
    changeState(req, res) {
      console.log(res);
      _api
        .setdminUser({
          id: this.list[req].user_id,
          type: res
        })
        .then(ress => {
          //   console.log(ress);
          this.getInfo();
        });
    },
    //添加用户
    sign() {
      this.title = '添加用户'
      this.CLOSE();
      this.add = true;
    },
    //穿梭内容
    setUser() {
      _api.addAdminUser({ data: this.setList }).then(res => {
        if (res.status === 200) {
          this.CLOSE();
          this.getInfo();
          this.$DIY(res.data.msg);
        }
      });
      console.log(this.setList);
    }
  },
  computed: {
    setList() {
      if (this.getList.length === 0) return 1;
      let obj = this.tablist.filter(val => {
        return this.getList.indexOf(val.user_id) != -1;
      });
      let arr = [];
      for (let i = 0; i < this.getList.length; i++) {
        console.log(obj);
        arr.push([obj[i].user_id, obj[i].user_name]);
      }
      return arr;
    }
  },
  components: {}
};
</script>

<style lang='less' scoped >
.user {
  overflow: auto;
  .ELtable {
    width: 100% !important;
    margin-top: 15px;
  }
}
.fs {
  font-size: 12px !important;
}
.upmsg {
  margin: 30px 0 0 30px;
}

.box {
  .Both;
  div {
    float: left;
  }
  &:first-child {
    line-height: 40px;
    margin-right: 15px;
  }
  .sele {
    margin-left: 15px;
  }
}
.upset {
  margin-top: 40px;
}
.gou{ 
  color: #67C23A;
  font-size: 20px;
  cursor: pointer;
}
.red{
  color: #F56C6C;
  font-size: 20px;
  cursor: pointer;
}
.co{
  color:@txt;
}
</style>
