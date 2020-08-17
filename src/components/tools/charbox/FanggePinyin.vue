<template>
  <div class="charbox-fanggepinyin">
    <div class="charbox-pinyin" @click="onPinyin" :class="pinyins.length > 1 ? 'multi': ''">{{py}}</div>
    <div class="charbox-char" @click="onChar">{{char}}</div>
  </div>
</template>

<script>
export default {
  props: ["pinyins","char", "i", "paraid", "sentid"],
  computed: {
    py() {
      return this.pinyins[0];
    }
  },
  methods: {
    onPinyin() {
      this.$emit("select", {type: "pinyin", pinyins: this.pinyins, char: this.char, pos: this.i, paraid: this.paraid, sentid: this.sentid})
    },
    onChar() {
      this.$emit("select", {type: "char", pinyins: this.pinyins, char: this.char, pos: this.i, paraid: this.paraid, sentid: this.sentid})
    }
  }
};
</script>

<style lang="stylus">
.charbox-fanggepinyin
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

    &.multi
      background-color #BFFFBF
    &:hover
      background-color #A0CFFF


  .charbox-char
    border 1px solid #999
    border-top 0px solid
    font-size 2em
    padding 0.25em
    background-color white
    &:hover
      background-color #A0CFFF
</style>