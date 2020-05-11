<template>
  <div>
    <div class="hanzi-box" v-for="(t, i) in text" :key="i">
      <div class="pinyin">
        <input class="pinyin-input" @keyup.enter="onEnter"/>
      </div>
      <span class="hanzi">{{t.trim()}}</span>
    </div>
    <el-row>
      <el-col :span="10">
      </el-col>
      <el-col :span="10">
        <span>{{toTone(value)}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { makeTone } from "src/js/pinyin.js";

export default {
  props: ["text", "value"],
  methods: {
    toTone(pinyin) {
      return makeTone(pinyin);
    },
    onEnter(event) {
      // TODO：每个字在回车时直接提交注音笔记
      event.target.value = this.toTone(event.target.value);
      let pinyin = "";
      for (let p of this.$el.getElementsByClassName("pinyin-input")) {
        pinyin += p.value;
        pinyin += " ";
      }
      this.$emit('input', pinyin);
    }
  }
};
</script>

<style lang="stylus">
.hanzi-box
  display inline-block
  margin-right 0.1em
  margin-bottom 10px
  width 3.5em

  .pinyin
    width 3.5em
    margin-bottom 0.3em

    input
      width 3.5em

  .hanzi
    border 1px solid #999
    font-size 2em
    padding 0.25em
    background-color white
</style>