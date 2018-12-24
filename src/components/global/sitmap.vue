<template>
  <div class="sitmap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in sitmap"
        :key="index"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
     <router-view class="routerV"></router-view>
  </div>
</template>
//头部标签  sitmap 格式
// sitmap:[
//         {
//           label:'用户管理',
//           name:'1',
//           route:'/role/user'
//         },
//         {
//           label:'用户管理',
//           name:'2',
//           route:'/role/roledetail'
//         },
//       ]
<script>
export default {
  props: {
    sitmap: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeName: "1"
    };
  },
  mounted() {
    //F5刷新后 回到sitmap的正确位置
    for (let i = 0; i < this.sitmap.length; i++) {
      if (this.$route.path === this.sitmap[i].route) {
        this.activeName = this.sitmap[i].name;
        break;
      }
    }
  },
  components: {},
  methods: {
    //切换路由
    handleClick(tab, event) {
      this.$router.push(this.sitmap[tab.index].route);
    }
  }
};
</script>

<style lang='less' scoped >
.routerV {
  overflow: auto;
  height: calc(~"100% - 54px");
}
</style>
