<template>
  <div class="pinyin-editor">
    <div v-for="(ch, i) in chars" :key="i">
      <el-container>
        <el-aside width="60px">
          <fangge :char="ch"></fangge>
        </el-aside>
        <el-main>
          <div class="pinyin-editor-options">现有 |</div>
          <div class="pinyin-editor-input">
            新增 |
            <input size="10" @keyup.enter="onEnter(ch, i, $event)" />
          </div>
          <div class="pinyin-editor-references">
            参考 |
            <a target="_blank" :href="handian(ch)">汉典</a>
            <a target="_blank" :href="baidu(ch)">百度</a>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import Fangge from "../../tools/charbox/Fangge.vue";
import { makeTone } from "src/js/pinyin.js";
export default {
  components: { Fangge },
  props: ["selection"],
  computed: {
    chars() {
      let chars = [];
      for (let ch of this.selection.content) {
        chars.push(ch.trim());
      }
      return chars;
    }
  },
  methods: {
    onEnter(ch, i, event) {
      // TODO：每个字在回车时直接提交注音笔记
      let pinyin = makeTone(event.target.value);
      event.target.value = pinyin;
      let spos = this.selection.location.startpos+ i;
      let word = {
        char: ch,
        spos: spos,
        epos: spos + 1,
        pinyin: pinyin
      };
      this.$emit("save", word);
    },
    handian(ch) {
      let url = "https://www.zdic.net/hans/";
      let esc = encodeURIComponent(ch);
      return url + esc;
    },
    baidu(ch) {
      let url = "https://hanyu.baidu.com/zici/s?wd=";
      let esc = encodeURIComponent(ch);
      return url + esc;
    }
  }
};
</script>

<style lang="stylus">
.pinyin-editor
  text-align left

  .el-main
    padding 0px
    margin-left 10px
    font-size 0.7em

  .pinyin-editor-references
    font-size 0.7em

    a
      margin-right 5px
</style>