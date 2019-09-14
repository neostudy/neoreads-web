<template>
  <div class="neo-icon-wrap" @click="$emit('click')" :title="title">
    <faicon class="neo-icon" :icon="i" size="sm"></faicon>
    <span>{{value}}</span>
  </div>
</template>

<script>
export default {
  props: ["i", "value", "title"]
};
</script>

<style lang="stylus" scoped>
.neo-icon-wrap
  display inline-block
  cursor pointer

  .neo-icon
    margin-right 0.25em
</style>