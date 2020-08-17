<template>
  <el-button class="icon-button" :title="title" type="primary" @click="$emit('click', $event)">
    <i :class="iconClass" class="button-icon"></i>
  </el-button>
</template>

<script>
var nameMap = {
  "check": "check-line"
};

var titleMap = {
  "check": "确定"
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

  &.el-button
    padding 5px 10px

  &:hover
    color #409EFF

  .button-icon
    font-size 1.8em
</style>

