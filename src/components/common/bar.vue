<template>
  <div class="menu">
    <router-link
      v-if="item.title"
      v-for="(item,index) in menu"
      :key="index"
      :to="item.path"
      tag="div"
      class="menu-opt"
      active-class="chose"
    >
      <i class="iconfont">{{item.icon}}</i>
      <span>{{item.title}}</span>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(JSON.parse(localStorage.getItem('s_menu')))
    // this.$router.addRoutes(JSON.parse(localStorage.getItem('s_menu')))
    // this.$router.addRoutes([
    //     {
    //       path: "/page",
    //       component: resolve => require(["@/components/page"], resolve),
    //       children: [{
    //           path: "/",
    //           component: resolve => require(["@/components/home/home"], resolve)
    //         }]
    //     }
    // ]);
    // JSON.parse(localStorage.getItem('s_menu'))

    this.autoLogin()
  },
  computed: {
    ...mapState("login", {
      menu: state => state.main[0].children
    })
  },
  methods: {
    ...mapMutations("login", ["autoLogin"])
  }
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
      margin: 0 15px;
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
