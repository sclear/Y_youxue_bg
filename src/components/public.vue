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
          route:'/public'
        },
      ]
    }
  },
  components: {

  }
}
</script>

<style lang='less' scoped >
</style>
