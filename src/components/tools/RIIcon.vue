<template>
  <span @click="$emit('click', $event)" class="icon-button" :title="title">
    <i :class="iconClass"></i>
  </span>
</template>

<script>
var nameMap = {
  "pinyin": "pinyin-input",
  "note": "mark-pen-line",
  "quote": "double-quotes-l",
  "translate": "translate-2"
};

var titleMap = {
  "pinyin": "注音",
  "note": "笔记",
  "quote": "引用",
  "translate": "翻译"
};
export default {
  props: ["i"],
  computed: {
    iconClass() {
      if (this.i in nameMap) {
        return "ri-" + nameMap[this.i];
      } else {
        return "ri-question-line";
      }
    },
    title() {
      if (this.i in titleMap) {
        return titleMap[this.i];
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="stylus">
.icon-button
  cursor pointer
  margin-left 5px

  &:hover
    color #409EFF
</style>

