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
          label:'系统消息',
          name:'1',
          route:'/page/sys/sys'
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
