<template>
  <div class="user">
    <el-input v-model="serch" class="w200" size="mini" placeholder="用户名"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click="addNew" size="mini" type="primary">添加资讯</el-button>
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
      <el-table-column align="center" prop="title" label="标题" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="content" label="详细内容" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- <i class="el-icon-view icons"></i> -->
          <i @click="changes(scope.$index)" class="el-icon-edit icons"></i>
          <i @click="del(scope.row.id)" class="el-icon-close icons"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <div class="model-input">
          <span>资讯标题</span>
          <el-input v-model="tabModel.title" class="w200" size="mini" placeholder="资讯标题"></el-input>
        </div>
        <div class="textar">
          <div class="textar-title">资讯内容:</div>
          <div>
            <textarea v-model="tabModel.content" class="textar-content text-h"></textarea>
          </div>
        </div>
        <el-button @click="UP" class="fs12 upBtn" size="mini" type="primary">提交</el-button>
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
    return {};
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let obj = {
        page: this.nowsize,
        number: this.pagesize,
        content: this.serch
      };
      _api.getIntroduces(obj).then(res => {
        console.log(res);
        this.total = res.data.data.long;
        this.list = res.data.data.res;
      });
    },
    //open add model
    addNew() {
      this.add = true;
      this.tabModel = {};
      this.title = "添加资讯";
      this.CLOSE();
    },
    //open changes model
    changes(num) {
      this.add = false;
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      this.title = "修改资讯";
      this.CLOSE();
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
      this.$confirm("此操作将永久删除该资讯, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _api.deIntroduce({ id: num }).then(res => {
            if (res.data.code === 200) {
              this.$DIY(res.data.msg);
              this.getInfo();
            }
          });
        })
        .catch();
    },
    //上传图片
    upladImg(event, num) {
      upImg(event).then(res => {
        this.$set(this.tabModel, "head_img", res.data.data.path);
      });
    },
    //提交
    UP() {
      if (this.add) {
        _api.addIntroduce({ data: this.tabModel }).then(res => {
          if (res.data.code === 200) {
            this.$DIY(res.data.msg);
            this.getInfo();
            this.CLOSE();
          }
        });
      }
      if (!this.add) {
        _api
          .upIntroduce({
            id: this.tabModel.id,
            data: this.tabModel
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$DIY(res.data.msg);
              this.getInfo();
              this.CLOSE();
            }
          });
      }
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
.text-h{
    height: 300px;
}
</style>
