<template>
  <div class="role">
    <sitmap :sitmap='sitmap'></sitmap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sitmap:[
        {
          label:'用户管理',
          name:'1',
          route:'/role/user'
        },
        {
          label:'添加权限',
          name:'2',
          route:'/role/roledetail'
        },
      ]
    }
  }
}
</script>

<style lang='less' scoped >
</style>
