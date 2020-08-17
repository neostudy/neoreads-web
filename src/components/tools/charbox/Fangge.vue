<template>
  <div class="charbox-fangge" :class="large ? 'large' : ''">
    <div class="charbox-char" :class="large ? 'large' : ''">{{char}}</div>
  </div>
</template>

<script>
export default {
  props: ["char", "large"]
};
</script>

<style lang="stylus">
.charbox-fangge
  text-align center
  display inline-block
  margin-right 0.1em
  margin-bottom 10px
  width 3.5em

  &.large
    width 7em
    margin-right 0.2em

  .charbox-char
    border 1px solid #999
    font-size 2em
    padding 0.25em
    background-color white

    &.large
      font-size 4em
      padding 0.25em

</style>