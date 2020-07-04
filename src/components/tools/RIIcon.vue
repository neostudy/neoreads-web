<template>
  <span @click="$emit('click', $event)" class="icon-button" :title="title">
    <i :class="iconClass"></i>
  </span>
</template>

<script>
var nameMap = {
  "note": "mark-pen-line",
  "pinyin": "pinyin-input",
  "quote": "double-quotes-l",
  "sound": "volume-up-line",
  "translate": "translate-2"
};

var titleMap = {
  "note": "笔记",
  "pinyin": "注音",
  "quote": "引用",
  "sound": "读音",
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

