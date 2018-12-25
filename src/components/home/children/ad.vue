<template>
  <div class="user">
    <!-- <el-input class="w200" size="mini" placeholder="用户名"></el-input> -->
    <el-select @change="getInfo" v-model="serch" size="mini" clearable placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <!-- <el-button class="fs12" size="mini" type="primary">查询</el-button> -->
    <el-button class="fs12" @click="addAd" size="mini" type="primary">添加广告</el-button>
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
      <el-table-column align="center" prop="ad_url" label="案例"  show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="name" label="操作"  show-overflow-tooltip>
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
        <div class="modelBox">
          <span>广告类型</span>
          <el-select
            v-model="tabModel.ad_type"
            class="w200"
            size="mini"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="modelBox">
          <span>链接地址</span>
          <el-input class="w200" v-model="tabModel.ad_url" size="mini" placeholder="链接地址"></el-input>
        </div>
        <div class="upBox">
          <div class="img-txt">广告图片</div>
          <div>
            <div class="img-box">
              上传图片
              <input @change="upladImg($event)" type="file">
            </div>
            <img v-if="tabModel.ad" class="img-max" :src="$url+tabModel.ad">
          </div>
        </div>
        <div>
          <el-button @click="UP" class="fs12 mar" size="mini" type="primary">提交</el-button>
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
      options: [
        {
          value: 1,
          label: "长图广告"
        },
        {
          value: 2,
          label: "小图广告"
        }
      ],
      serch: 1,
      modelChose: 1
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
      };
      _api.getAds(obj).then(res => {
        console.log(res);
        this.list = res.data.data.res;
        this.total = res.data.data.long;
      });
    },
    //open add model
    addAd() {
      this.title = "添加广告";
      this.CLOSE();
      this.tabModel = {};
      this.add = true;
    },
    //open change model
    changes(num) {
      this.title = "修改广告信息";
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      this.CLOSE();
      this.add = false;
    },
    //上传图片
    upladImg(event) {
      console.log(event.target.files[0]);
      let fromdata = new FormData();
      fromdata.append("file", event.target.files[0]);
      _api.upload(fromdata).then(res => {
        this.$set(this.tabModel, "ad", res.data.data.path);
      });
    },
    //添加 修改
    UP() {
      if(!this.tabModel.ad || !this.tabModel.ad_type || !this.tabModel.ad_url){
          return this.$DIY('请确认完整信息')
      }
      if (this.add) {
        _api.addAd({ data: this.tabModel }).then(res => {
          if (res.status === 200) {
            this.CLOSE();
            this.$DIY(res.data.msg);
            this.getInfo();
          }
        });
      }
      if (!this.add) {
        _api
          .upAd({
            ad_id: this.tabModel.ad_id,
            data: this.tabModel
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
    //删除
    del(num) {
      this.$confirm("此操作将永久删除该广告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _api.deAd({ ad_id: this.list[num].ad_id }).then(res => {
            if (res.status === 200) {
              this.getInfo();
              this.$DIY(res.data.msg);
            }
          });
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
.modelBox {
  margin-top: 10px;
  span {
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 5px;
    color: @txt;
  }
}
.mar {
  margin: 15px 0 0 90px;
}
</style>
