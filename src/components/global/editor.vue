<template>
  <div class="container">
    <div id="editorElem" style="text-align:left"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  props: ["content"],
  watch: {
    //每当改动通知父级改动
    editorContent(val) {
      this.$emit("getEditor", this.editorContent);
    }
  },
  data() {
    return {
      editorContent: ""
    };
  },
  mounted() {
    //实例化
    var editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    editor.create();
    //回显功能
    editor.txt.html(JSON.parse(JSON.stringify(this.content)));
  }
};
</script>

<style lang='less' scoped >
</style>
