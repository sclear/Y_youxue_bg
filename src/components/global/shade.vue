<template>
  <div v-if="shows" class="shade">
    <div class="pro">
      <div>{{progress}}%</div>
      <div>视频上传中...</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress:{
      type:Number,
      default:0
    }
  },
  data() {
    return {

    }
  },
  computed: {
    shows() {
      if(this.progress === 0 || this.progress === 100) return false
      else return true
    }
  }
}
</script>

<style lang='less' scoped >
.shade{
  position: fixed;
  top:0;
  left:0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .pro{
    color:white;
    font-size: 25px;
    div{
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
