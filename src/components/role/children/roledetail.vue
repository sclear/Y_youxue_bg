<template>
  <div class="user">
    <el-input class="w200" v-model="serch" size="mini" placeholder="权限名称"></el-input>
    <el-button class="fs12" @click="serchBtn" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click="addRole" size="mini" type="primary">添加权限</el-button>
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
      <el-table-column
        align="center"
        prop="role_name"
        label="权限名"
        width="300"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" prop="role_name" label="操作" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <i @click="changes(scope.$index)" class="el-icon-edit icons"></i>
          <i @click="del(scope.$index)" class="el-icon-close icons"></i>
        </template>
      </el-table-column>
    </el-table>

    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <div class="modelDiv">
          <span>权限名称:</span>
          <el-input v-model="tabModel.role_name" class="w200" size="mini" placeholder="权限名称"></el-input>
          <el-button @click="upRolename" class="fs12 btns" size="mini" type="primary">提交</el-button>
        </div>

        <div v-if="!add" class="choseRole">
          <div v-for="(item,index) in menu" :key="index">
            <el-checkbox v-model="item.chose">{{item.label}}</el-checkbox>
          </div>
        </div>
        <el-button v-if="!add" @click="upMsg" class="fs12 btn" size="mini" type="primary">提交</el-button>
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
      menu: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    //加载信息
    getInfo() {
      let obj = {
        page: this.nowsize,
        number: this.pagesize,
        content: this.serch
      };
      _api.getRole(obj).then(res => {
        if (res.status === 200) {
          this.total = res.data.data.long;
          this.list = res.data.data.res;
        }
      });
      _api.getAllMenu().then(res => {
        let obj = res.data.data;
        for (let i = 0; i < obj.length; i++) {
          obj[i].chose = false;
        }
        this.menu = obj;
        console.log(this.menu);
      });
    },
    //搜索
    serchBtn() {
      this.nowsize = 1;
      this.getInfo();
    },
    //open add model
    addRole() {
      //确定添加
      this.add = true;
      this.CLOSE();
      this.tabModel = {};
      this.title = "添加权限";
    },
    //提交
    upMsg() {
      if (this.add) {
        if (this.tabModel.role_name) {
          _api.addRole(this.tabModel).then(res => {
            if (res.data.code === 200) {
              this.$DIY(res.data.msg);
              this.CLOSE();
              this.nowsize = 1;
              this.getInfo();
            }
            console.log(res);
          });
        }
      } else {
        let arr = [];
        for (let i = 0; i < this.menu.length; i++) {
          if (this.menu[i].chose === true) {
            arr.push(this.menu[i].menu_id);
          }
        }
        _api
          .setPower({
            role_id: this.tabModel.role_id,
            data: arr
          })
          .then(res => {
            this.$DIY(res.data.msg);
            this.CLOSE();
            this.getInfo();
          });
      }
    },
    //删除
    del(num) {
      // if (this.add) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          _api.delRole({ role_id: this.list[num].role_id }).then(res => {
            this.$DIY(res.data.msg);
            this.getInfo();
          });
        })
        .catch();
      // } else{

      // }
    },
    //绑定菜单
    changes(num) {
      this.title = "修改权限";
      for (let i = 0; i < this.menu.length; i++) {
        this.menu[i].chose = false;
      }
      _api.getMenu({ role_id: this.list[num].role_id }).then(res => {
        if (!res.data.data) {
          return;
        }
        for (let i = 0; i < this.menu.length; i++) {
          for (let j = 0; j < res.data.data.length; j++) {
            if (this.menu[i].label === res.data.data[j].label) {
              this.$set(this.menu[i], "chose", true);
            }
          }
        }
      });

      this.add = false;
      this.CLOSE();
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
    },
    //修改角色名称
    upRolename() {
      _api.upRole({
        role_name:this.tabModel.role_name,
        role_id:this.tabModel.role_id
      })
      .then(res=>{
        if(res.status === 200){
          this.$DIY(res.data.msg)
          this.getInfo();
        }
      })
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
.modelDiv {
  span {
    text-align: right;
    display: inline-block;
    width: 70px;
    margin-right: 10px;
    color:@txt;
  }
}
.btn {
  margin: 30px 0 0 150px;
}
.btns {
  margin: 15px 0 0 0px;
}
.choseRole {
  margin: 10px 0 0 85px;
  div {
    margin-top: 5px;
  }
}
</style>
