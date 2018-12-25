<template>
  <div class="user">
    <el-button class="fs12" @click="addClass(1)" size="mini" type="primary">一级分类</el-button>
    <el-button class="fs12" @click="addClass(2)" size="mini" type="primary">二级分类</el-button>
    <el-button class="fs12" @click="addClass(3)" size="mini" type="primary">三级分类</el-button>
    <!-- 内容区域  auto scoll -->
    <div class="continear">
      <div v-for="(item,index) in list" :key="index" class="box">
        <div @click="changes(item.id)" class="titles cus" :class="item.list_type===1?'':'danger'">{{item.list_name}} <i title="设置是否在主页显示" @click.stop="changeBg(item)" class="el-icon-setting icons"></i>   <i @click="del(item.id)" class="el-icon-close icons"></i>   </div>
        <div class="spaBtw">
          <div v-for="(items,indexs) in item.children" :key="indexs" class="fl">
            <div @click="changes(items.id)" class="twoFl cus">{{items.list_name}} <i @click.stop="del(items.id)" class="el-icon-close"></i> </div>
            <!-- <el-button class="el-btn" size="mini" type="success">{{items.list_name}}</el-button> -->
            <div @click="changes(itemss.id)" class='twoFl colr cus' v-for="(itemss,indexss) in items.children" :key="indexss">{{itemss.list_name}}  <i  @click.stop="del(itemss.id)" class="el-icon-close"></i></div>
            <div>
              <!-- <el-button
                v-for="(itemss,indexss) in items.children"
                :key="indexss"
                class="el-btn"
                size="mini"
                type="info"
              >{{itemss.list_name}}</el-button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- model -->
    <j-model :model="model" @CLOSE="CLOSE" :title="title">
      <div slot="content">
        <div v-if="swichNum === 1" class="modelBox">
          <span>分类名称:</span>
          <el-input class="w200" v-model="fl1" size="mini" placeholder="分类名称"></el-input>
        </div>
        <div v-if="swichNum === 2" class="modelBox">
          <span>选择分类:</span>
          <el-select class="w200" size="mini" v-model="selectOne" clearable placeholder="请选择">
            <el-option v-for="item in list" :key="item.id" :label="item.list_name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div v-if="swichNum === 2" class="modelBox">
          <span>分类名称:</span>
          <el-input v-model="fl2" class="w200" size="mini" placeholder="分类名称"></el-input>
        </div>


        <div v-if="swichNum === 3" class="modelBox">
          <span>选择分类:</span>
          <el-select @change="LD" class="w200" size="mini" v-model="selectTwo" clearable placeholder="请选择">
            <el-option v-for="item in list" :key="item.id" :label="item.list_name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div v-if="swichNum === 3" class="modelBox">
          <span>选择分类:</span>
          <el-select class="w200" size="mini" v-model="selectThree" clearable placeholder="请选择">
            <el-option v-for="item in options2" :key="item.id" :label="item.list_name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div v-if="swichNum === 3" class="modelBox">
          <span>分类名称:</span>
          <el-input v-model="fl3" class="w200" size="mini" placeholder="分类名称"></el-input>
        </div>
        <div v-if="swichNum === 4" class="modelBox">
          <span>修改名称:</span>
          <el-input class="w200" v-model="changeTxt" size="mini" placeholder="分类名称"></el-input>
        </div>
        <el-button @click="UP" class="fs12 mar" size="mini" type="primary">提交</el-button>
      </div>
    </j-model>
    
  </div>
</template>

<script>
var num = 3;
import _api from "./../../../api/baseUrl.js";
import mixin from "./../../../util/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      swichNum: "",
      options: [],
      options2:[],
      selectOne: "",
      selectTwo:'',
      selectThree:'',
      changeTxt:'', //修改名称字段
      fl1: '', //分类1名称
      fl2:'',  //分类2名称
      fl3:'',  //分类2名称
      id:'',   //修改时确定ID
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      _api.getList().then(res => {
        console.log(res);
        this.list = res.data.data;
      });
    },
    //添加分类
    addClass(num) {
      this.swichNum = num;
      switch (num) {
        case 1:
          this.title = "添加一级分类";
          break;
        case 2:
          this.title = "添加二级分类";
          break;
        case 3:
          this.title = "添加三级分类";
          break;
      }
      this.CLOSE();
    },
    //提交
    UP() {
      //添加一级分类
      if (this.swichNum === 1) {
        _api
          .addList({
            list_name: this.fl1,
            pid: 0
          })
          .then(res => {
            if (res.status === 200) {
              this.$DIY(res.data.msg);
              this.CLOSE();
              this.getInfo();
            }
          });
      }
      //添加二级分类
      if (this.swichNum === 2) {
        _api
          .addList({
            list_name: this.fl2,
            pid: this.selectOne
          })
          .then(res => {
            if (res.status === 200) {
              this.$DIY(res.data.msg);
              this.CLOSE();
              this.getInfo();
              this.fl2 = '';
              this.selectOne = '';
            }
          });
      }
      //添加三级分类
      if (this.swichNum === 3) {
        _api
          .addList({
            list_name: this.fl3,
            pid: this.selectThree
          })
          .then(res => {
            if (res.status === 200) {
              this.$DIY(res.data.msg);
              this.CLOSE();
              this.getInfo();
              this.fl3 = '';
              this.selectThree = '';
            }
          });
      }
      //修改名称
      if (this.swichNum === 4) {
        _api
          .upList({
            id: this.id,
            list_name: this.changeTxt
          })
          .then(res => {
            if (res.status === 200) {
              this.$DIY(res.data.msg);
              this.CLOSE();
              this.getInfo();
              this.changeTxt = ''
            }
          });
      }
    },
    //联动
    LD() {
        for(let i = 0;i < this.list.length;i++){
            if(this.selectTwo === this.list[i].id){
                console.log(this.list[i].children)
                this.options2 = this.list[i].children
            }
        }
    },
    del(num) {
        _api.deList({id:num})
        .then(res=>{
            if(res.status === 200){
                this.getInfo()
                this.$DIY(res.data.msg)
            }
        })
    },
    //修改
    changes(num) {
        this.title = '修改分类名称';
        this.id = num;
        this.swichNum = 4;
        this.CLOSE()
    },
    //设置是否在主页显示
    changeBg(msg) {
      _api.upListType({
        list_type:msg.list_type===1?0:1,
        id:msg.id
      }).then(res=>{
        if(res.status === 200){
          this.$DIY(res.data.msg);
          this.getInfo()
        }
      })
    }
  },

  components: {}
};
</script>

<style lang='less' scoped >
.user {
  .continear {
    position: absolute;
    height: calc(~"100% - 100px");
    width: 100%;
    overflow: auto;
    .box {
      width: 100%;
      margin-top: 80px;
      //   border: 1px solid @txt;
      border-radius: 5px;
      padding: 10px;
      box-sizing: border-box;
      background: rgb(235, 229, 229);
    }
    .titles {
      text-align: center;
      height: 30px;
      background: @bartxt;
      line-height: 30px;
      color: white;
    }
  }
}
.modelBox {
  margin-top: 10px;
  span {
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 5px;
    color: @txt;
  }
}
.mar {
  margin: 30px 0 0 110px;
}
.spaBtw {
  display: flex;
  justify-content: space-around;
  .twoFl {
    height: 38px;
    width: 70px;
    background: #67c23a;
    border-radius: 5px;
    margin-top: 5px;
    text-align: center;
    line-height:38px;
    color:white;
    position: relative;
    i{
        position: absolute;
        color:white;
        top:3px;
        right:3px;
        cursor: pointer;
    }
  }
  .colr{
        background: #909399 !important;
    }
  .el-btn {
    margin-top: 5px;
  }
}
.cus{
    cursor: pointer;
}
.danger{
  background: @danger !important;
}
</style>
