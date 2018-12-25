<template>
  <div class="user">
    <el-input class="w200" size="mini" placeholder="用户名"></el-input>
    <el-button class="fs12" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click="addSWIPER" size="mini" type="primary">添加轮播图</el-button>
    <!-- <el-pagination
      size="small"
      class="pagin"
      background
      @current-change="changesize"
      :current-page="nowsize"
      :page-size="pagesize"
      :total="total"
    ></el-pagination> -->
    <!-- table -->
    <el-table class="ELtable" :data="list" style="width: 100%">
      <el-table-column align="center" prop="user_name" width="50" label="序号">
        <template slot-scope="scope">{{scope.$index+(nowsize - 1) * pagesize + 1}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="banner_url"
        label="地址"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" prop="sort" label="层级" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column
        align="center"
        prop="Banner_url"
        label="操作"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <i @click="changes(scope.$index)" class="el-icon-edit icons"></i>
          <i @click="del(scope.$index)" class="el-icon-close icons"></i>
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
    ></el-pagination> -->
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <div>
          <div class="modelDiv">
            <span>层级</span>
            <el-input v-model="tabModel.sort" class="w200" size="mini" placeholder="序号"></el-input>
          </div>
          <div class="modelDiv">
            <span>链接地址</span>
            <el-input v-model="tabModel.banner_url" class="w200" size="mini" placeholder="链接地址"></el-input>
          </div>
          <div class="modelDiv">
            <span>轮播图片</span>
            <div class="upload">
              上传
              <input @change="upladImg($event)" type="file">
            </div>
            <img v-if="tabModel.banner" :src="$url+tabModel.banner" alt>
          </div>
        </div>
        <el-button @click="UP" class="fs12 upClass" size="mini" type="primary">提交</el-button>
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
    //获取信息
    getInfo() {
      _api.getBanner().then(res => {
        if (res.status === 200) {
          console.log(res);
          this.list = res.data.data;
          // this.total = res.data.data.long
        }
      });
    },
    //上传图片
    upladImg(event) {
      console.log(event.target.files[0]);
      let fromdata = new FormData();
      fromdata.append("file", event.target.files[0]);
      _api.upload(fromdata).then(res => {
        console.log(res);
        this.$set(this.tabModel, "banner", res.data.data.path);
      });
    },
    //开启添加轮播model
    addSWIPER() {
      this.add = true;
      this.title = "添加轮播图";
      this.CLOSE();
      this.tabModel = {};
    },
    //开启修改轮播model
    changes(num) {
      this.title = "修改轮播图";
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      console.log(this.tabModel);
      this.add = false;
      this.CLOSE();
    },
    //添加图片
    UP() {
      this.tabModel.sort = Number(this.tabModel.sort);
      if (this.add) {
        _api.addBanner({ data: this.tabModel }).then(res => {
          if (res.status === 200) {
            this.$DIY(res.data.msg);
            this.CLOSE();
            this.getInfo();
          }
        });
      }
      if (!this.add) {
        _api
          .upBanner({
            data: this.tabModel,
            banner_id: this.tabModel.banner_id
          })
          .then(res => {
            if (res.status === 200) {
              this.$DIY(res.data.msg);
              this.CLOSE();
              this.getInfo();
            }
          });
      }
    },
    del(num) {
      // delBanner
      console.log(num);
      this.$confirm("此操作将永久删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _api.delBanner({ banner_id:this.list[num].banner_id })
          .then(res=>{
              if(res.status === 200){
                  this.$DIY(res.data.msg)
                  this.getInfo();
              }

          })
        })
        .catch();
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
  margin-top: 15px;
  position: relative;
  span {
    text-align: right;
    display: inline-block;
    width: 70px;
    margin-right: 10px;
    color:@txt !important;
  }
  img {
    position: absolute;
    top: 0px;
    left: 200px;
    max-width: 200px;
    max-width: 200px;
  }
  .upload {
    display: inline-block;
    width: 100px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    height: 28px;
    position: relative;
    text-align: center;
    line-height: 28px;
    color: @txt;
    cursor: pointer;
    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }
}
.upClass {
  margin: 100px 0 0 85px;
}
</style>
