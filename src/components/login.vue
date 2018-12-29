<template>
  <div class='login'>
      <img src='https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' alt=''>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  mounted () {
      this.SETMENUS()
  },
  methods: {
      ...mapActions('login',['SETMENUS'])
  }
}
</script>

<style lang='less' scoped >
.login{
    width:100%;
    height: 100%;
    background: @login;
    .aligncenter;
}
</style>
