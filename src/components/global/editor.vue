<template>
  <div class="container">
      <!-- {{editorContent}} -->
      <div v-html="editorContent"></div>
      <div id="editorElem" style="text-align:left"></div>
       <button v-on:click="getContent">查看内容</button>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
      name: 'editor',
      data () {
        return {
          editorContent: ''
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        }
      },
      mounted() {
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
    }
</script>

<style lang='less' scoped >

</style>
