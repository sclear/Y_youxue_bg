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
          label:'资讯管理',
          name:'1',
          route:'/page/info/info'
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
