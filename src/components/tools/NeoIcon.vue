<template>
  <div class="neo-icon-wrap">
    <faicon class="neo-icon" :icon="i" size="sm"></faicon>
    <span>{{value}}</span>
  </div>
</template>

<script>
export default {
  props: ["i", "value"]
};
</script>

<style lang="stylus" scoped>
.neo-icon-wrap
  display inline-block

  .neo-icon
    margin-right 0.25em

</style>