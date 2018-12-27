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
          label:'试题管理',
          name:'1',
          route:'/page/test/test'
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
