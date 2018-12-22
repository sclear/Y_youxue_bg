<template>
  <div class="sitmap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in sitmap" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
    <!-- <router-view class="routerV"></router-view> -->
  </div>
</template>

<script>
export default {
  props: {
    sitmap:{
      type:Array,
      required:true
    }
  },
  data() {
    return {
      activeName: "1",
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab.index, event);
      this.toLIKE(tab.index)
    },
    toLIKE(res) {
      this.$router.push(this.sitmap[res].route)
    }
  }
};
</script>

<style lang='less' scoped >
.sitmap{
  height:100%;
}
.routerV{
  height:calc(~'100% - 54px');
}
</style>
