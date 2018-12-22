<template>
  <div class="model">
      <div v-if="model" class="shade"></div>
      <transition name="modelBody">
          <div v-if="model" class="contentBody">
              <div class="head"> <i @click="close" class="el-icon-d-arrow-right"></i> </div>
              <div class="content">
                  <slot name="content"></slot>
              </div>
          </div>
      </transition>
      
  </div>
</template>

<script>
export default {
  props: {
      model:{
          type:Boolean,
          required:true
      }
  },
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
      close() {
          this.$emit('CLOSE')
      }
  }
}
</script>

<style lang='less' scoped >
.model{
    .shade{
        position: absolute;
        width:100%;
        height:100%;
        top:0;
        left:0;
        z-index: 10;
        background: rgba(0, 0, 0, 0.384);
    }
    .contentBody{
        position: absolute;
        background: white;
        width:60%;
        height:100%;
        z-index: 20;
        right:0%;
        top:0;
        .head{
            height:40px;
            border:1px solid @bgcol;
            box-sizing: border-box;
            padding-left: 15px;
            i{
                font-size: 20px;
                line-height: 40px;
                color:@txt;
                cursor: pointer;
            }
        }
        .content{
            overflow: auto;
            height:calc(~'100% - 40px');
            width:100%;
            box-sizing: border-box;
            padding:15px 0 0 30px;
        }
    }
}
</style>
