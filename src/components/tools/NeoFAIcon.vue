<template>
  <div class="neo-icon-wrap" @click="$emit('click')" :title="title">
    <i class="neo-icon" :class="pre + ' fa-' + i"></i>
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  props: ["i", "regular", "text", "title"],
  computed: {
    pre() {
      if (this.regular !== undefined) {
        return "far";
      } else { // solid
        return "fas";
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.neo-icon-wrap
  display inline-block
  cursor pointer

  .neo-icon
    margin-right 0.25em
</style>