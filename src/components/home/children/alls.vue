<template>
  <div class="alls">
    <div class="bg1">
      <div>会员数量</div>
      <div>{{list.sums}}</div>
    </div>
    <div class="bg2">
      <div>总收入</div>
      <div>{{list.income}}</div>
    </div>
    <div class="bg3">
      <div>待支付订单</div>
      <div>{{list.wait}}</div>
    </div>
    <div class="bg4">
      <div>已完成订单</div>
      <div>{{list.complete}}</div>
    </div>
  </div>
</template>

<script>
import _api from './../../../api/baseUrl.js'
export default {
  data() {
    return {
      list:{}
    };
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo() {
      _api.Summary()
      .then(res=>{
        this.list = res.data.data
      })
    }
  },
  components: {}
};
</script>

<style lang='less' scoped >
.alls {
  display: flex;
  justify-content: center;
  .bg1 {
    background: #409eff;
  }
  .bg2 {
    background: #67c23a;
  }
  .bg3 {
    background: #f56c6c;
  }
  .bg4 {
    background: #e6a23c;
  }
  & > div {
    width: 180px;
    height: 100px;
    margin: 40px;
    background: bisque;
    float: left;
    border-radius: 5px;
    &>div:nth-child(1){
      font-size: 17px;
    }
    div {
      text-align: center;
      margin-top: 15px;
      color: white;
      font-size: 18px;
    }
  }
}
</style>
