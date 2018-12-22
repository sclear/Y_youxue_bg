<template>
  <div class="menu">
      <div v-if="item.title" v-for="(item,index) in $router.options.routes[0].children" :key="index" class="menu-opt">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted () {
    console.log(this.$router.options)  
  },
  components: {

  }
}
</script>

<style lang='less' scoped >
.menu{
    height:100%;
    width:150px;
    background: @bgcol;
    color:@txt;
    .menu-opt{
        height:40px;
        width:100%;
        line-height: 40px;
        cursor: pointer;
        i{
            width:50px;
            text-align: center;
        }
        &:hover{
            color:@bartxt;
            background: @barbg;
        }
    }
}
</style>
