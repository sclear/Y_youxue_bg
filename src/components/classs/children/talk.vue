<template>
  <div class="user">
    <!-- <el-select @change='getInfo' v-model="sh_num" size='mini' clearable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>-->
    <el-input v-model="serch" class="w200" size="mini" placeholder="用户名"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
    <!-- <el-button class="fs12" @click="addNew" size="mini" type="primary">注册用户</el-button> -->
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
      <el-table-column align="center" prop="course_name" label="课程名称" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="member_name" label="用户名" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="comment_time" label="评论时间" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.comment_time | _ymd}}</template>
      </el-table-column>
      <el-table-column align="center" prop="comment" label="评论内容" width="300" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column align="center" prop="comment_type" label="是否审核" show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-check fs20 suc"></i>
          <i class="el-icon-close fs20 danger"></i>
        </template>
      </el-table-column>-->
      <el-table-column align="center" prop="name" label="操作" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <i @click="see(scope.$index)" class="el-icon-view icons"></i>
          <!-- <i @click="changes(scope.$index)" class="el-icon-edit icons"></i> -->
          <i @click="del(scope.row.id)" class="el-icon-close icons"></i>
        </template>
      </el-table-column>
    </el-table>
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <div class="model-input">
          <span>课程名称:</span>
          <el-input disabled v-model="tabModel.course_name" class="w200 lookInput" size="mini" placeholder></el-input>
        </div>
        <div class="model-input">
          <span>用户名:</span>
          <el-input disabled v-model="tabModel.member_name" class="w200 lookInput" size="mini" placeholder></el-input>
        </div>
        <div class="model-input">
          <span>评论时间:</span>
          <el-input disabled v-model="toT" class="w200 lookInput" size="mini" placeholder></el-input>
        </div>
        <div class="upBox">
          <div class="img-txt">用户头像:</div>
          <div>
            <img :src="$url + tabModel.member_img" alt>
          </div>
        </div>
        <div class="textar">
          <div class="textar-title">评论内容:</div>
          <div>
            <textarea disabled v-model="tabModel.comment" class="textar-content lookInput"></textarea>
          </div>
        </div>
      </div>
    </j-model>
  </div>
</template>

<script>
import _api from "./../../../api/baseUrl.js";
import mixin from "./../../../util/mixin.js";
import { upImg,toTime } from "./../../../util/tool.js";
export default {
  mixins: [mixin],
  data() {
    return {
      list: [
        {
          name: 1
        }
      ],
      upimg: "",
      progress: "0",
      options: [
        {
          value: 1,
          label: "已审核"
        },
        {
          value: 0,
          label: "未审核"
        }
      ],
      sh_num: 1
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
        content: this.serch
        // comment_type: this.sh_num
      };
      _api.getComment(obj).then(res => {
        console.log(res);
        this.total = res.data.data.long;
        this.list = res.data.data.res;
      });
    },
    //open add model
    addNew() {
      this.add = true;
      this.tabModel = {};
      this.title = "xxx";
      this.CLOSE();
    },
    //open changes model
    changes(num) {
      this.add = false;
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      this.title = "";
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
      this.$confirm("此操作将永久删除该试题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _api.delComment({ id: num }).then(res => {
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
      let fromdata = new FormData();
      fromdata.append("file", event.target.files[0]);
      _api.aaa(fromdata).then(res => console.log(res));
    },
    UP() {},
    see(num) {
      this.title = '查看评论详情'
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      this.CLOSE();
    }
  },
  computed: {
    toT() {
      return toTime(this.tabModel.comment_time,'y-m-d')
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
