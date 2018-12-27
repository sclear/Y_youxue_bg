<template>
  <div class="user">
    <el-select @change="ldFn" size="mini" v-model="ld1" clearable placeholder="请选择">
      <el-option v-for="item in lists" :key="item.id" :label="item.list_name" :value="item.id"></el-option>
    </el-select>
    <el-select size="mini" @change="getInfo" v-model="ld2" clearable placeholder="请选择">
      <el-option v-for="item in erlist" :key="item.id" :label="item.list_name" :value="item.id"></el-option>
    </el-select>
    <el-input v-model="serch" class="w200" size="mini" placeholder="题干"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click="addNew" size="mini" type="primary">添加试题</el-button>
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
      <el-table-column align="center" prop="problem" label="题干" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="Answer" label="正确答案" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.Answer | swichA}}</template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <i @click="changes(scope.$index)" class="el-icon-edit icons"></i>
          <i @click="del(scope.row.id)" class="el-icon-close icons"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <div v-if="add" class="model-input">
          <span>一级分类</span>
          <el-select @change="mldfn" size="mini" v-model="mld1" clearable placeholder="请选择">
            <el-option
              v-for="item in lists"
              :key="item.id"
              :label="item.list_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="model-input">
          <span>二级分类</span>
          <el-select
            :disabled="!add"
            size="mini"
            v-model="tabModel.list_id"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in mlist"
              :key="item.id"
              :label="item.list_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="textar">
          <div class="textar-title">试题:</div>
          <div>
            <textarea v-model="tabModel.problem" class="textar-content hight-test"></textarea>
          </div>
        </div>
        <div class="textar">
          <div class="textar-title">A选项:</div>
          <div>
            <textarea v-model="tabModel.Aoption" class="textar-content hight-test"></textarea>
          </div>
        </div>
        <div class="textar">
          <div class="textar-title">B选项:</div>
          <div>
            <textarea v-model="tabModel.Boption" class="textar-content hight-test"></textarea>
          </div>
        </div>
        <div class="textar">
          <div class="textar-title">C选项:</div>
          <div>
            <textarea v-model="tabModel.Coption" class="textar-content hight-test"></textarea>
          </div>
        </div>
        <div class="textar">
          <div class="textar-title">D选项:</div>
          <div>
            <textarea v-model="tabModel.Doption" class="textar-content hight-test"></textarea>
          </div>
        </div>
        <div class="model-input">
          <span>正确答案</span>
          <el-radio v-model="tabModel.Answer" label="1">A</el-radio>
          <el-radio v-model="tabModel.Answer" label="2">B</el-radio>
          <el-radio v-model="tabModel.Answer" label="3">C</el-radio>
          <el-radio v-model="tabModel.Answer" label="4">D</el-radio>
        </div>
        <el-button @click="UP" class="upBtn" size="mini" type="primary">查询</el-button>
      </div>
    </j-model>
  </div>
</template>

<script>
import _api from "./../../../api/baseUrl.js";
import mixin from "./../../../util/mixin.js";
import axios from "axios";
export default {
  mixins: [mixin],
  data() {
    return {
      list: [
        {
          name: 1
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      ld1: "",
      ld2: "",
      mld1: "",
      radio: "1",

      //联动数据
      lists: [],
      erlist: [],
      mlist: []
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
        list_id: this.ld2
      };
      _api.getItemList(obj).then(res => {
        console.log(res);
        this.total = res.data.data.long;
        this.list = res.data.data.res;
      });

      //一级联动级联动
      _api.getList().then(res => (this.lists = res.data.data));
    },
    //二级联动
    ldFn() {
      for (let i = 0; i < this.lists.length; i++) {
        if (this.ld1 === this.lists[i].id) {
          this.erlist = this.lists[i].children;
        }
      }
    },
    mldfn() {
      for (let i = 0; i < this.lists.length; i++) {
        if (this.mld1 === this.lists[i].id) {
          this.mlist = this.lists[i].children;
        }
      }
    },
    //open add model
    addNew() {
      this.add = true;
      this.tabModel = {};
      this.title = "添加试题";
      this.CLOSE();
    },
    //open changes model
    changes(num) {
      this.add = false;
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      this.title = "修改试题";
      this.CLOSE();
      if (this.ld2) {
        this.mlist = JSON.parse(JSON.stringify(this.erlist));
      } else {
        let arr = [];
        for (let i = 0; i < this.lists.length; i++) {
          for (let j = 0; j < this.lists[i].children.length; j++) {
            arr.push(this.lists[i].children[j]);
          }
        }
        this.mlist = JSON.parse(JSON.stringify(arr));
      }
    },
    //修改展示状态
    changeState(id, num) {
      _api.getLa({}).then(res => {
        if (res.data.code === 200) {
          this.$DIY(res.data.msg);
          this.getInfo();
        }
      });
    },
    del(num) {
      this.$confirm("此操作将永久删除该试题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _api.delItemBank({ id: num }).then(res => {
            if (res.data.code === 200) {
              this.$DIY(res.data.msg);
              this.getInfo();
            }
          });
        })
        .catch();
    },
    UP() {
      if (
        !this.tabModel.list_id ||
        !this.tabModel.problem ||
        !this.tabModel.Aoption ||
        !this.tabModel.Boption ||
        !this.tabModel.Coption ||
        !this.tabModel.Doption ||
        !this.tabModel.Answer
      ) {
        return this.$DIY("请确认是否填写完整");
      }
      if (this.add) {
        _api.addItemBank({ data: this.tabModel }).then(res => {
          if (res.data.code === 200) {
            this.$DIY(res.data.msg);
            this.CLOSE();
            this.getInfo();
          }
        });
      }
      if (!this.add) {
        console.log(this.tabModel);
        _api
          .upItemBank({
            id: this.tabModel.id,
            data: this.tabModel
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$DIY(res.data.msg);
              this.CLOSE();
              this.getInfo();
            }
          });
      }
    },
    upladImg(event) {
      let fromdata = new FormData();
      fromdata.append("file", event.target.files[0]);
      axios({
          method:'post',
          data:fromdata,
          url:'https://jsonplaceholder.typicode.com/posts/',
          onUploadProgress: function (progressEvent) {
                console.log((progressEvent.loaded / progressEvent.total * 100 | 0) + '%')
                // 使用本地 progress 事件做任何你想要做的
            },
      })
      .then(res=>{console.log(res)})



    //   upImg(event).then(res => {
    //     this.$set(this.tabModel, "head_img", res.data.data.path);
    //   });
    }
  },

  components: {},
  filters: {
    swichA(val) {
      switch (val) {
        case "1":
          return "A";
          break;
        case "2":
          return "B";
          break;
        case "3":
          return "C";
          break;
        case "4":
          return "D";
          break;
      }
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
.hight-test {
  height: 50px !important;
}
</style>
