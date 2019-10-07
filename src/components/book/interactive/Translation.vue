<template>
  <div class="translation-pane">
    Orig Text: <div class="orig-text">{{sent}}</div>
  </div>
</template>

<script>
export default {
  props: ["sent"]
}
</script>

<style lang="stylus" scoped>
.translation-pane
  padding 20px
  .orig-text
    border 1px solid #ddd
    background-color #eee
    padding 5px
    margin 5px 0
    border-radius 5px
</style>