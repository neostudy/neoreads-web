<template>
  <div class="dummy-cover">{{title}}</div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="stylus" scoped>
.dummy-cover
  float left
  width 90px
  line-height 90px
  height 120px
  border 1px solid #ebebeb
  background-position center
  background-size 100%
  background-color #D7BF92
  box-shadow 2px 4px 6px #bbb
  text-align center
  height 120px
  font-weight bold
  font-size 1.5em
  font-family 'STKaiti'
  writing-mode: vertical-rl;

</style>
