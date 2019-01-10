<template>
  <div class="user">
    <el-input v-model="serch" class="w200" size="mini" placeholder="课程名/教师姓名"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click="addClass" size="mini" type="primary">添加课程</el-button>
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
      <el-table-column align="center" prop="course_name" label="课程名" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="teacher_name" label="老师姓名" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="course_free" label="是否免费" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.course_free === 1?'是':'否'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="course_adapt" label="适应人群" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="course_hour" label="课时" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="course_money" label="价格" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="update_time" label="更新时间" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.update_time | _ymd}}</template>
      </el-table-column>
      <el-table-column align="center" prop="Number" label="播放量" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="sell_type" label="是否上架" show-overflow-tooltip>
        <template slot-scope="scope">
          <i
            @click="upanddown(scope.row.course_id,0)"
            v-if="scope.row.sell_type===1"
            class="el-icon-check fs20 suc"
          ></i>
          <i @click="upanddown(scope.row.course_id,1)" v-else class="el-icon-close fs20 danger"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- <i class="el-icon-view icons"></i> -->
          <i @click="changes(scope.$index)" class="el-icon-edit icons"></i>
          <i @click="upVideos(scope.$index)" class="el-icon-upload2 icons"></i>
          <i @click="del(scope.row.course_id)" class="el-icon-close icons"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <upvideo :id="id" v-if="videos"></upvideo>
        <div v-if="!videos">
          <div class="model-input">
            <span>一级菜单:</span>
            <el-select
              @change="setLd"
              class="w200"
              size="mini"
              v-model="ld1"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in lists"
                :key="item.id"
                :label="item.list_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="model-input">
            <span>二级菜单:</span>
            <el-select
              class="w200"
              size="mini"
              v-model="tabModel.list_id"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in erlist"
                :key="item.id"
                :label="item.list_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="model-input">
            <span>类型:</span>
            <el-select
              class="w200"
              size="mini"
              v-model="tabModel.course_type"
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in types" :key="item.val" :label="item.lab" :value="item.val"></el-option>
            </el-select>
          </div>
          <div class="model-input">
            <span>课程名称:</span>
            <el-input v-model="tabModel.course_name" class="w200" size="mini" placeholder="课程名称"></el-input>
          </div>
          <div class="upBox">
            <div class="img-txt">图片介绍:</div>
            <div>
              <div class="img-box">
                上传图片
                <input @change="upladImg($event,1)" type="file">
              </div>
              <img v-if="tabModel.sketchy_img" :src="$url + tabModel.sketchy_img" alt>
            </div>
            <div class="img-size">建议尺寸***</div>
          </div>
          <div class="upBox">
            <div class="img-txt">课程图片:</div>
            <div>
              <div class="img-box">
                上传图片
                <input @change="upladImg($event,2)" type="file">
              </div>
              <img v-if="tabModel.course_img" :src="$url + tabModel.course_img" alt>
            </div>
            <div class="img-size">建议尺寸***</div>
          </div>
          <div class="model-input">
            <span>是否免费:</span>
            <el-radio @change="freeC" v-model="tabModel.course_free" :label="ones">免费</el-radio>
            <el-radio @change="freeC" v-model="tabModel.course_free" :label="zeros">付费</el-radio>
          </div>
          <div class="model-input">
            <span>课程价格:</span>
            <el-input
              @change="freeD"
              v-model="tabModel.course_money"
              class="w200"
              size="mini"
              placeholder="价格"
            ></el-input>
          </div>
          <div class="model-input">
            <span>适应人群:</span>
            <el-input v-model="tabModel.course_adapt" class="w200" size="mini" placeholder="适应人群"></el-input>
          </div>
          <div class="model-input">
            <span>推荐课程:</span>
            <el-select
              class="w200"
              size="mini"
              v-model="tabModel.Recommend"
              clearable
              placeholder="推荐课程"
            >
              <el-option
                v-for="item in classlist"
                :key="item.course_id"
                :label="item.course_name"
                :value="item.course_id"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <div class="model-input">
            <span>老师姓名:</span>
            <el-select
              class="w200"
              size="mini"
              v-model="tabModel.teacher_id"
              clearable
              placeholder="老师姓名"
            >
              <el-option
                v-for="item in tealist"
                :key="item.teacher_id"
                :label="item.teacher_name"
                :value="item.teacher_id"
              ></el-option>
            </el-select>
          </div>
          <div class="model-input">
            <span>课时:</span>
            <el-input v-model="tabModel.course_hour" class="w200" size="mini" placeholder="课时"></el-input>
          </div>
          <div class="textar">
            <div class="textar-title">提供服务:</div>
            <div>
              <textarea v-model="tabModel.service" class="textar-content"></textarea>
            </div>
          </div>
          <div>
            <span class="editalk">课程简介:</span>
            <editor @getEditor="getEditor" :content="course_sketchy"></editor>
          </div>
          <!-- upBtn -->
          <el-button class="fs12 upBtns" @click="UP" size="mini" type="primary">提交</el-button>
        </div>
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
      lists: [], //分类联动数据
      erlist: [], //二级联动
      tealist: [], //所有教师
      classlist: [], //课程数据
      ld1: "", //一级联动
      zeros: 0,
      ones: 1,
      types: [
        {
          val: 0,
          lab: "默认"
        },
        {
          val: 1,
          lab: "推荐"
        },
        {
          val: 2,
          lab: "精品"
        },
        {
          val: 3,
          lab: "热门"
        }
      ],
      videos: false,
      id:''

      //upvideo
    };
  },
  components: {
    upvideo: () => import("./children/upvideo.vue")
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      _api
        .getCourses({
          page: this.nowsize,
          number: this.pagesize,
          content: this.serch
        })
        .then(res => {
          console.log(res);
          this.list = res.data.data.res;
          this.total = res.data.data.long;
        });
      //获取联动数据
      _api.getList().then(res => (this.lists = res.data.data));
      //获取教师
      _api.getTeacher().then(res => (this.tealist = res.data.data));
      //课程名称
      _api.getCouName().then(res => (this.classlist = res.data.data));
    },
    //上传图片
    upladImg(event, num) {
      upImg(event).then(res => {
        if (num === 1) {
          this.$set(this.tabModel, "sketchy_img", res.data.data.data);
        }
        if (num === 2) {
          this.$set(this.tabModel, "course_img", res.data.data.data);
        }
      });
    },
    //open add model
    addClass() {
      this.videos = false;
      this.tabModel = {};
      this.course_sketchy = null;
      this.add = true;
      this.CLOSE();
      this.title = "添加课程";
    },
    //提交
    UP() {
      console.log(this.tabModel)
      if(
        !this.tabModel.Recommend ||
        !this.tabModel.course_adapt ||
        // !this.tabModel.course_free ||
        !this.tabModel.course_hour ||
        !this.tabModel.course_img ||
        // !this.tabModel.course_money ||
        !this.tabModel.course_name ||
        !this.course_sketchy ||
        // !this.tabModel.course_type ||
        // !this.tabModel.list_id ||
        !this.tabModel.sketchy_img ||
        !this.tabModel.teacher_id
        // !this.tabModel.service
        ) {
        return this.$DIY('请完善信息')
      }
      if (this.add) {
        let obj = this.tabModel;
        obj.course_sketchy = this.course_sketchy;
        _api.addCourse({ data: obj }).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$DIY(res.data.msg);
            this.CLOSE();
            this.getInfo();
          }
        });
      }
      if (!this.add) {
        let obj = this.tabModel;
        obj.course_sketchy = this.course_sketchy;
        _api
          .upCourse({
            course_id: obj.course_id,
            data: obj
          })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$DIY(res.data.msg);
              this.CLOSE();
              this.getInfo();
            }
          });
      }
    },
    //数据联动(model)
    setLd() {
      //避免数据耦合 + 联动清除
      this.$set(this.tabModel, "list_id", null);
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].id === this.ld1) {
          this.erlist = this.lists[i].children;
        }
      }
    },
    //修改
    changes(num) {
      this.videos = false;
      this.add = false;
      this.title = "修改课程信息";
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      this.course_sketchy = JSON.parse(
        JSON.stringify(this.tabModel.course_sketchy)
      );
      this.CLOSE();
      console.log(this.tabModel);
    },
    //上下架管理
    upanddown(id, num) {
      _api
        .downCourse({
          course_id: id,
          sell_type: num
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$DIY(res.data.msg);
            this.getInfo();
          }
        });
    },
    //删除
    del(id) {
      _api.delCourse({ course_id: id }).then(res => {
        if (res.data.code === 200) {
          this.$DIY(res.data.msg);
          // this.CLOSE();
          this.getInfo();
        }
      });
    },
    freeC() {
      console.log(this.tabModel);
      if (this.tabModel.course_free === 1) {
        this.$set(this.tabModel, "course_money", 0);
      }
    },
    freeD() {
      if (this.tabModel.course_money > 0) {
        this.$set(this.tabModel, "course_free", 0);
      } else {
        this.$set(this.tabModel, "course_free", 1);
      }
    },

    //up video
    upVideos(num) {
      this.title = '添加章节并上传视频';
      this.videos = true;
      this.CLOSE();
      console.log(this.list[num])
      this.id = this.list[num].course_id;
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
.editalk {
  display: inline-block;
  width: 70px;
  color: @txt;
  margin: 10px;
  text-align: right;
  box-sizing: border-box;
  padding-right: 10px;
}
.upBtns {
  margin: 30px 0 50px 0px !important;
}
</style>
