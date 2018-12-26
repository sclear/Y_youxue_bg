<template>
  <div class="user">
    <el-input v-model="serch" class="w200" size="mini" placeholder="用户名"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click="addNew" size="mini" type="primary">注册用户</el-button>
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
      <el-table-column align="center" prop="name" label="案例" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-view icons"></i>
          <i @click="changes(scope.$index)" class="el-icon-edit icons"></i>
          <i @click="del(scope.row.id)" class="el-icon-close icons"></i>
        </template>
      </el-table-column>
    </el-table>
    {{progress}}
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
            <img :src="$url + upimg" alt>
          </div>
          <div class="img-size">建议尺寸***</div>
        </div>
        <el-button @click="UP" class="upBtn" size="mini" type="primary">提交</el-button>
      </div>
    </j-model>
  </div>
</template>

<script>
import axios from "axios";
import _api from "./../../../api/baseUrl.js";
import mixin from "./../../../util/mixin.js";
import { upImg } from "./../../../util/tool.js";
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
      progress:'0'
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
      _api.getLa({ id: num }).then(res => {
        if (res.data.code === 200) {
          this.$DIY(res.data.msg);
          this.getInfo();
        }
      });
    },
    //上传图片
    upladImg(event, num) {
      // let fromdata = new FormData();
      // fromdata.append("file", event.target.files[0]);
      upImg(event)
      .then(res=> console.log(res))
      // _api.aaa(fromdata)
      // .then(res=>{
      //   console.log(res)
      // })
      // return
      // upImg(event).then(res => {
      // this.upimg = res.data.data.path
      // this.$set(this.tabModel, "head_img", res.data.data.path);
      // });
      //  axios({
      //       url:'http://tm.you1mei.com/kxk01yx_ierdh/Uploader/add',
      //       method:'post',
      //       // onUploadProgress:function(progressEvent){ //原生获取上传进度的事件
      //       //     if(progressEvent.lengthComputable){
      //       //         //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
      //       //         //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
      //       //         // callback1(progressEvent);
      //       //         console.log(progressEvent)
      //       //     }
      //       // },
      //       data:fromdata
      //   }).then(res =>{
      //     console.log(res)
      //       // callback2(res.data);
      //   }).then(error =>{
      //       // console.log(error)
      //   })
      return
      var config = {
        onUploadProgress: progressEvent => {
          console.log(999)
          
            // var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            // this.progress = complete
        }
    }
      axios.post(
        `http://tm.you1mei.com/kxk01yx_ierdh/Uploader/add`, 
      fromdata,
      config,
      // 'headers'= {'Content-Type': 'multipart/form-data'}
      ).then(res => {
        console.log(res)
      });
    },
    UP() {}
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
