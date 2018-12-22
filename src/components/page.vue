<template>
  <div class="page">
      <bar class='fl'></bar>
      <router-view class="routerView"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
        
    }
  },
  components: {
      'bar': () => import('./common/bar.vue')
  }
}
</script>

<style lang='less' scoped >
.page{
    height:100%;
}
.routerView{
    height:100%;
    overflow: hidden;
    box-sizing: border-box;
    padding:10px 0 0 15px;
    position: relative;
}
</style>
