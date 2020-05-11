<template>
  <div class="charbox-fangge">
    <div class="charbox-char">{{char}}</div>
  </div>
</template>

<script>
export default {
  props: ["char"]
};
</script>

<style lang="stylus">
.charbox-fangge
  text-align center
  display inline-block
  margin-right 0.1em
  margin-bottom 10px
  width 3.5em

  .charbox-char
    border 1px solid #999
    font-size 2em
    padding 0.25em
    background-color white
</style>