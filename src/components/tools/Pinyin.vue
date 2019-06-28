<template>
  <span class="pinyin-container">
    <!--
    <div class="pinyin-pinyin">
      {{pinyin}}
    </div>
    <div class="pinyin-word">
      {{word}}
    </div>
  -->
    <ruby v-for="(w,i) in wordarray" :key="i">
      <rb>{{w}}</rb>
      <rt>{{pinyin(w)}}</rt>
    </ruby>
    <el-button @click="pinyin('w')"></el-button>
  </span>
</template>

<script>
import {toPinyin} from "src/js/phonetics/pinyingen.js"

export default {
  props: {
    words: ""
  },
  data() {
    return {

    }
  },
  computed: {
    wordarray: function() {
      return this.words.split('')
    },
  },
  methods: {
    pinyin(w) {
      console.log("haha")
      return toPinyin(w)[0][0]
    }
  },
}
</script>

<style lang="stylus" scoped>
ruby
  rb
    font-size 24px
</style>


