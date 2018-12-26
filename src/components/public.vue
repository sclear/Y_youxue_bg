<template>
  <div class="role">
    <sitmap :sitmap='sitmap'></sitmap>
  </div>
</template>

<script>
import xl from './../util/xl.js'
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

  },
  methods: {
  }
}
</script>

<style lang='less' scoped >
</style>
