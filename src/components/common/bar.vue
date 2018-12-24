<template>
  <div class="menu">
    <router-link
      v-if="item.title"
      v-for="(item,index) in $router.options.routes[0].children"
      :key="index"
      :to="item.path"
      tag="div"
      class="menu-opt"
      active-class="chose"
    >
      <i :class="item.icon"></i>
      <span>{{item.title}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped >
.menu {
  height: 100%;
  width: 150px;
  background: #686262;
  color: rgb(228, 220, 220);
  .menu-opt {
    height: 40px;
    width: 100%;
    line-height: 40px;
    cursor: pointer;
    transition: all 0.2s linear;
    i {
      width: 50px;
      text-align: center;
    }
    &:hover {
      color: @bartxt;
      background: @barbg;
    }
  }
  .chose {
    color: @bartxt;
    background: @barbg;
  }
}
</style>
