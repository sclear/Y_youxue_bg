<template>
  <div class="user">
    <el-select @change="getInfo" size="mini" v-model="shows" clearable placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-input v-model="serch" class="w200" size="mini" placeholder="用户名"></el-input>
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
      <el-table-column align="center" prop="list_name" label="分类名称" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="head" label="首页展示" show-overflow-tooltip>
        <template slot-scope="scope">
          <i
            @click="changeState(scope.row.id,0)"
            v-if="scope.row.head === 1"
            class="el-icon-check suc fs20"
          ></i>
          <i @click="changeState(scope.row.id,1)" v-else class="el-icon-close danger fs20"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="list_type" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <i @click="changes(scope.$index)" class="el-icon-edit icons"></i>
          <!-- <i @click="del(scope.row.id)" class="el-icon-close icons"></i> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <div class="upBox">
          <div class="img-txt">展示图片:</div>
          <div>
            <div class="img-box">
              上传图片
              <input @change="upladImg($event)" type="file">
            </div>
            <img v-if="tabModel.head_img" :src="$url + tabModel.head_img" alt>
          </div>
          <div class="img-size">建议尺寸***</div>
        </div>
        <el-button @click="UP" class="upBtn" size="mini" type="primary">提交</el-button>
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
    return {
      options: [
        {
          value: 0,
          label: "未展示分类"
        },
        {
          value: 1,
          label: "展示分类"
        }
      ],
      shows: 0
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
        head: this.shows
      };
      _api.getLa(obj).then(res => {
        console.log(res);
        this.total = res.data.data.long;
        this.list = res.data.data.res;
      });
    },
    //上传图片
    upladImg(event, num) {
      upImg(event).then(res => {
        this.$set(this.tabModel, "head_img", res.data.data.path);
      });
    },
    //open changes model
    changes(num) {
      this.add = false;
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      this.title = "添加展示图片";
      this.CLOSE();
    },
    //修改展示状态
    changeState(id, num) {
      _api
        .getHead({
          head: num,
          id: id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$DIY(res.data.msg);
            this.getInfo();
          }
        });
    },
    UP() {
      console.log(this.tabModel)
      _api.bindShow({
        head_img:this.tabModel.head_img,
        id:this.tabModel.id
      }).then(res=>{
        if(res.data.code === 200){
          this.$DIY(res.data.msg);
          this.getInfo();
          this.CLOSE()
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
</style>
