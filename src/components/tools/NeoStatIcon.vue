<template>
  <div class="neo-stat-icon">
    <nicon :i="i" :value="value"></nicon>
  </div>
</template>

<script>
import Nicon from "./NeoIcon.vue";
export default {
  components: {
    Nicon
  },
  props: ["i", "value"]
}
</script>

<style lang="stylus" scoped>
.neo-stat-icon
  display inline-block
  padding 0 6px
  border-radius 4px
  cursor pointer

  &:hover
    background-color #eee

</style>