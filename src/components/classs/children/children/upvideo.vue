<template>
  <div>
    <div>
      <div class="model-input mt10">
        <span>章节名称</span>
        <el-input v-model="wname" class="w200" size="mini" placeholder="章节名称"></el-input>
        <el-button @click="UP" class="centers" size="mini" type="primary">提交</el-button>
      </div>

      <hr>

      <div class="model-input mt10">
        <span>选择章节:</span>
        <el-select size="mini" v-model="fnname" clearable placeholder="请选择">
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.chapter_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="model-input mt10">
        <span>是否免费:</span>
        <el-switch v-model="serch" active-text="付费" inactive-text="免费"></el-switch>
      </div>
      <div class="model-input mt10">
        <span>视频名称:</span>
        <el-input v-model="videoname" class="w200" size="mini" placeholder="视频名称"></el-input>
      </div>
      <div class="model-input mt10">
        <span>视频地址:</span>
        <el-input v-model="vurl" class="w200" size="mini" placeholder="视频地址"></el-input>
      </div>
      <div class="upBox">
        <div class="img-txt">上传视频</div>
        <div>
          <div class="img-box">
            上传视频
            <input @change="uploadVideo($event)" type="file">
          </div>
        </div>
      </div>
      <div class="upBox">
        <div class="img-txt">封面图片</div>
        <div>
          <div class="img-box">
            上传图片
            <input @change="upladImg($event)" type="file">
          </div>
          <img :src="$url + iurl" alt>
        </div>
        <div class="img-size">建议大小</div>
      </div>
      <el-button @click="UPMID" class="upBtn ups" size="mini" type="primary">提交</el-button>

      <hr>
    </div>
    <div v-for="(item,index) in list" :key="index" class="model-card">
      <div class="card-header">
        {{item.chapter_name}}
        <i @click="delClass(index)" class="el-icon-close"></i>
      </div>
      <div class="card-body">
        <div v-for="(items,indexs) in item.children" :key="indexs" class="content-body">
          <div class="model-titles">
            <span>名称:</span>
            <el-input
              size="mini"
              class="w130"
              placeholder="请输入内容"
              v-model="items.class_hour"
              clearable
            ></el-input>
          </div>
          <div class="model-titles">
            <span>是否免费:</span>
            <el-switch v-model="items.video_type" active-text="付费" inactive-text="免费"></el-switch>
          </div>
          <div class="model-titles">
            <span>视频地址:</span>
            <el-input
              disabled
              size="mini"
              class="w130"
              placeholder="请输入内容"
              v-model="items.video_url"
              clearable
            ></el-input>
          </div>
          <div class="model-titles">
            <span class="span-box fl colo">.</span>
            <img class="fl" :src="$url + items.video_img" alt>
          </div>
          <el-button @click="UPLAR(index,indexs)" class="centers" size="mini" type="primary">提交</el-button>
          <el-button @click="dellar(index,indexs)" class="centers" size="mini" type="danger">删除</el-button>
        </div>
      </div>
    </div>

    <!-- 视频上传shade -->
    <shade :progress="progress"></shade>
  </div>
</template>

<script>
import _api from "./../../../../api/baseUrl.js";
import mixin from "./../../../../util/mixin.js";
import { upImg, upVideo } from "./../../../../util/tool.js";
export default {
  mixins: [mixin],
  props: ["id"],
  data() {
    return {
      serch: false,
      fnname: "",
      videoname: "",
      videoadr: "",
      iurl: "",
      vurl: "",

      txt: 12,
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
      value4: "选项5",
      wname: "" //章节名称
    };
  },
  mounted() {
    console.log(this.id);
    this.getInfo();
    if (this.getInfo) {
      console.log(1);
    }
  },

  methods: {
    getInfo() {
      _api.getCoursess({ course_id: this.id }).then(res => {
        console.log(res);
        let obj = res.data.data[0].children;
        console.log(this.list);
        console.log(obj);
        try {
          if (obj === undefined) {
            console.log("jinrule");
            obj = [];
          }
        } catch (err) {}
        // }
        // console.log(obj)
        for (let i = 0; i < obj.length; i++) {
          // for(let j = 0;j < obj[i].children.length;j++){
          //   console.log(obj[i].children[j].video_type)
          //   obj[i].children[j].video_type === 0?obj[i].children[j].video_type = true:obj[i].children[j].video_type = false;
          // }
          try {
            for (let j = 0; j < obj[i].children.length; j++) {
              console.log(obj[i].children[j].video_type);
              obj[i].children[j].video_type === 0
                ? (obj[i].children[j].video_type = true)
                : (obj[i].children[j].video_type = false);
            }
          } catch (err) {
            obj[i].children = [];
          }
        }
        console.log(obj);
        this.list = obj;
      });
    },
    //添加章节
    UP() {
      _api
        .addChapter({
          course_id: this.id,
          chapter_name: this.wname
        })
        .then(res => {
          if (res.data.code === 200) {
            this.getInfo();
            this.$DIY(res.data.msg);
          }
        });
    },
    //上传图片
    upladImg(event) {
      upImg(event).then(res => {
        console.log(res);
        this.iurl = res.data.data.data;
        // this.$set(this.tabModel, "course_img", res.data.data.data);
      });
    },
    //上传视频
    uploadVideo(event) {
      upVideo(event, this.UPVIDEO).then(res => {
        console.log(res);
        this.vurl = res.data.data.data;
        // this.$set(this.tabModel, "sketchy_img", res.data.data.data);
      });
    },
    //添加视频
    UPMID() {
      if(!this.videoname || !this.vurl || !this.serch || !this.fnname || !this.iurl){
        return this.$DIY('请完善添加信息')
      }
      let obj = {
        class_hour: this.videoname,
        video_url: this.vurl,
        video_type: this.serch === true ? 0 : 1,
        chapter_id: this.fnname,
        video_img: this.iurl
      };
      console.log(obj);
      _api.addVideo({ data: obj }).then(res => {
        if (res.data.code === 200) {
          this.$DIY(res.data.msg);
          this.getInfo();
        }
      });
    },
    //修改视频信息
    UPLAR(inx, inxs) {
      // if(!)
      _api
        .upVideos({
          id: this.list[inx].children[inxs].id,
          data: {
            video_type:
              this.list[inx].children[inxs].video_type === true ? 0 : 1,
            class_hour: this.list[inx].children[inxs].class_hour
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$DIY(res.data.msg);
            this.getInfo();
          }
        });
      console.log(this.list[inx].children[inxs]);
    },
    //删除视频
    dellar(inx, inxs) {
      this.$confirm("此操作将永久删除该视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _api
            .delIDVideo({
              id: this.list[inx].children[inxs].id
            })
            .then(res => {
              if (res.data.code === 200) {
                this.$DIY(res.data.msg);
                this.getInfo();
              }
            });
        })
        .catch();
    },
    //删章节
    delClass(num) {
      this.$confirm("此操作将永久删除该章节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _api.delChapter({ chapter_id: this.list[num].id }).then(res => {
            if (res.data.code === 200) {
              this.$DIY(res.data.msg);
              this.getInfo();
            }
          });
        })
        .catch();
    }
  }
};
</script>

<style lang='less' scoped >
.mt10 {
  margin-top: 10px !important;
}
hr {
  width: 100%;
  margin: 15px 0 15px -15px;
}
.colo {
  color: white;
}
.ups {
  margin-top: 15px !important;
  margin-bottom: 0 !important;
}
</style>
