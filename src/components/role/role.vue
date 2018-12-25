<template>
  <div class="role">
    <sitmap :sitmap="sitmap"></sitmap>
  </div>
</template>

<script>
export default {
  mounted() {
    let arr = [
      {
        path: "/login",
        component: resolve => require(["@/components/login"], resolve)
      }
    ];
    this.$router.addRoutes(arr)
    console.log(this.$router)
  },
  data() {
    return {
      sitmap: [
        {
          label: "用户管理",
          name: "1",
          route: "/page/role/user"
        },
        {
          label: "添加权限",
          name: "2",
          route: "/page/role/roledetail"
        }
      ]
    };
  }
};
</script>

<style lang='less' scoped >
</style>
