<template>
  <div class="member">
    <sitmap :sitmap='sitmap'></sitmap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sitmap:[
        {
          label:'会员列表',
          name:'1',
          route:'/page/member'
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
