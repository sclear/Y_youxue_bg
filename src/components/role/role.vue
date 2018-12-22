<template>
  <div class="role">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in sitmap" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
     <router-view class="routerV"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName:'1',
      sitmap:[
        {
          label:'用户管理',
          name:'1',
          // route:'roledetail'
        },
        {
          label:'用户管理',
          name:'2',
          // route:'home'
        },
      ]
    }
  },
   methods: {
    handleClick(tab, event) {
      console.log(tab.index, event);
      this.toLIKE(tab.index)
    },
    toLIKE(res) {
      this.$router.push(this.sitmap[res].route)
    }
  },
  components: {

  }
}
</script>

<style lang='less' scoped >
.role{
  // height:100%;
}
.routerV{
  // height:500px;
}
</style>
