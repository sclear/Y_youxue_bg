<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin:0;
  padding:0;
  font-size: 14px;
}
html,body,#app{
  height:100%;
}
.el-table td, .el-table th{
  padding:4px 0;
}
</style>
