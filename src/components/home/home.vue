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
          label:'数据汇总',
          name:'1',
          route:'/home/alls'
        },
        {
          label:'轮播',
          name:'2',
          route:'/home/swiper'
        },
        {
          label:'广告',
          name:'3',
          route:'/home/ad'
        },
        {
          label:'导航',
          name:'4',
          route:'/home/nav'
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
