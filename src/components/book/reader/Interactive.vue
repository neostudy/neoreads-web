<template>
  <div>
    <div class="interactive-dict">
      <div>{{dict.word}}</div>
      <div v-for="(s,i) in dict.symbols" :key="i">
        <span>{{s.symbol}}</span>
        <span v-if="s.mp3">
          <faicon icon="volume-up" @click="playMp3(s.mp3)"></faicon>
        </span>
      </div>
    </div>
    <div>{{py}}</div>
  </div>
</template>

<script>
import { toPinyin } from "src/js/phonetics/pinyingen.js";
export default {
  props: ["dict"],
  data() {
    return {
      py: ""
    };
  },
  mounted() {
    this.py = toPinyin("你好");
  },
  watch: {
    dict: function(newData, oldData) {
      console.log("prop data received:", newData);
      if (newData.symbols) {
        for (var s of newData.symbols) {
          if (s.mp3) {
            console.log(s.mp3);
          }
        }
      }
    }
  },
  methods: {
    playMp3(url) {
      new Audio(url).play();
    }
  }
};
</script>

<style lang="stylus" scoped>
div.interactive-dict
  text-align left

  div
    text-align left

  span
    text-align left
</style>

