<template>
  <div class="charbox-fangge">
    <div class="charbox-pinyin" @click="onPinyin">{{p}}</div>
    <div class="charbox-char" @click="onChar">{{c}}</div>
    <div class="charbox-char">{{i}}</div>
  </div>
</template>

<script>
export default {
  props: ["p","c", "i"],
  methods: {
    onPinyin() {
      this.$emit("pinyin-clicked", {pinyin: this.p, char: this.c, pos: this.i})
    },
    onChar() {
      this.$emit("char-clicked", {pinyin: this.p, char: this.c, pos: this.i})
    }
  }
};
</script>

<style lang="stylus">
.charbox-fangge
  text-align center
  display inline-block
  margin-right 0.1em
  margin-bottom 10px
  width 3.5em
  user-select none
  cursor pointer

  .charbox-pinyin
    border 1px solid #999
    height 25px
    line-height 25px
    &:hover
      background-color #A0CFFF


  .charbox-char
    border 1px solid #999
    border-top 0
    font-size 2em
    padding 0.25em
    background-color white
    &:hover
      background-color #A0CFFF
</style>