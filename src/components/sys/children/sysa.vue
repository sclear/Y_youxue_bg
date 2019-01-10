<template>
  <div class="user">
    <!-- <el-input v-model="serch" class="w200" size="mini" placeholder="用户名"></el-input>
    <el-button @click="TOPSERCH" class="fs12" size="mini" type="primary">查询</el-button>
    <el-button class="fs12" @click="addNew" size="mini" type="primary">注册用户</el-button>-->
    <div class="model-input">
      <span>标题:</span>
      <el-input v-model="title" class="w200" size="mini" placeholder></el-input>
    </div>
    <div class="textar">
      <div class="textar-title">发送内容:</div>
      <div>
        <textarea v-model="content" class="textar-content sys-tea"></textarea>
      </div>
    </div>
    <el-button @click="UP" class="upBtn" size="mini" type="primary">发送</el-button>
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content"></div>
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
      title: "",
      content: ""
    };
  },
  methods: {
    UP() {
        if(this.title && this.content) {
            _api.addUserNews({
                news_title: this.title,
                news: this.content
            })
            .then(res=>{
                if(res.data.code === 200) {
                this.$DIY('发送成功')
                }
            })
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
.sys-tea {
  width: 500px;
  height: 200px;
}
</style>
