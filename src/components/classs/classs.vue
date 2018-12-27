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
          label:'首页展示',
          name:'1',
          route:'/page/classs/list'
        },
        {
          label:'课程列表',
          name:'2',
          route:'/page/classs/classify'
        },
        {
          label:'用户评论',
          name:'3',
          route:'/page/classs/talk'
        },
        // {
        //   label:'上传视频',
        //   name:'4',
        //   route:'/page/classs/videos'
        // },
      ]
    }
  },
  components: {

  }
}
</script>

<style lang='less' scoped >
</style>
