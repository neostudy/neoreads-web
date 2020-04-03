<template>
  <div class="note-card">
    {{note.content}}
    <faicon icon="trash" title="删除" class="right" @click="removeNote"></faicon>
  </div>
</template>

<script>
export default {
  props: ["note"],
  methods: {
    removeNote() {}
  }
};
</script>

<style lang="stylus" scoped>
.note-card
  border-bottom 1px dashed #D9ECFF
  border-radius 2px
  padding 10px 10px 20px 10px
  line-height 1.2em
  height 1.2em
  margin-bottom 20px

  .right
    float right
    color #409EFF
</style>