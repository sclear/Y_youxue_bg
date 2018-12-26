<template>
  <div class="user">
    <el-input v-model="serch" class="w200" size="mini" placeholder="教师姓名"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click="addTea" size="mini" type="primary">添加教师</el-button>
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
    <!-- <editor></editor> -->
    <!-- table -->
    <el-table class="ELtable" :data="list" height="400" style="width: 100%">
      <el-table-column align="center" prop="user_name" width="50" label="序号">
        <template slot-scope="scope">{{scope.$index+(nowsize - 1) * pagesize + 1}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="teacher_name"
        label="姓名"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        align="center"
        prop="teacher_data"
        label="介绍"
        max-width="300"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <i @click="changes(scope.$index)" class="el-icon-edit icons"></i>
          <i @click="del(scope.row.teacher_id)" class="el-icon-close icons"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <div class="model-input">
          <span>教师名:</span>
          <el-input v-model="tabModel.teacher_name" class="w200" size="mini" placeholder></el-input>
        </div>
        <div class="upBox">
          <div class="img-txt">头像:</div>
          <div>
            <div class="img-box">
              上传图片
              <input @change="upladImg($event)" type="file">
            </div>
            <img class="Box-img" v-if="tabModel.teacher_img" :src="$url + tabModel.teacher_img" alt>
          </div>
        </div>
        <div class="textar">
          <div class="textar-title">教师简介:</div>
          <div>
            <textarea v-model="tabModel.teacher_data" class="textar-content"></textarea>
          </div>
        </div>
        <el-button class="fs12 upBtn" @click="UP" size="mini" type="primary">提交</el-button>
      </div>
    </j-model>
  </div>
</template>

<script>
import _api from "./../../../api/baseUrl.js";
import mixin from "./../../../util/mixin.js";
import { upImg } from "./../../../util/tool.js";
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
      _api.getTeachers(obj).then(res => {
        console.log(res);
        (this.list = res.data.data.res), (this.total = res.data.data.long);
      });
    },
    //删除教师
    del(num) {
      this.$confirm("将永久删除该老师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _api.delTeacher({ teacher_id: num }).then(res => {
            if (res.status === 200) {
              this.$DIY(res.data.msg);
              this.getInfo();
            }
          });
        })
        .catch();
    },
    addTea(num) {
      this.CLOSE();
      this.title = "添加教师";
      this.tabModel = {};
      this.add = true;
    },
    //上传图片
    upladImg(event) {
      upImg(event).then(res => {
        this.$set(this.tabModel, "teacher_img", res.data.data.path);
      });
    },
    //提交
    UP() {
      if (
        !this.tabModel.teacher_name ||
        !this.tabModel.teacher_img ||
        !this.tabModel.teacher_data
      ) {
        return this.$DIY("请确认完整信息");
      }
      if (this.add) {
        _api.addTeacher({ data: this.tabModel }).then(res => {
          if (res.data.code === 200) {
            this.$DIY(res.data.msg);
            this.CLOSE();
            this.getInfo();
          }
        });
      }
      if (!this.add) {
        console.log(333);
        _api
          .upTeacher({
            teacher_id: this.tabModel.teacher_id,
            data: this.tabModel
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 200) {
              console.log(res);
              this.$DIY(res.data.msg);
              this.CLOSE();
              this.getInfo();
            }
          });
      }
    },
    //修改
    changes(num) {
      this.add = false;
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      this.CLOSE();
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
.editors {
  .Both;
  & > div {
    float: left;
  }
}
</style>
