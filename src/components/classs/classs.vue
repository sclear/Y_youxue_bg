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
          label:'课程列表',
          name:'1',
          route:'/page/classs/classify'
        },
        {
          label:'课程分类',
          name:'2',
          route:'/page/classs/list'
        },
        {
          label:'用户评论',
          name:'3',
          route:'/page/classs/talk'
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
