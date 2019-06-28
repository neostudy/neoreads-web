<template>
  <el-container>
    <el-header class="reader-header" height="36px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/library">
          <faicon icon="stream" class="breadcrum-icon"></faicon>书斋
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">史记</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>第1章</el-breadcrumb-item>
        <el-breadcrumb-item>五帝本纪</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-container>
      <el-aside class="reader-toolbar" width="200px">
        <toc-tree></toc-tree>
      </el-aside>
      <el-main class="reader-main">
        <el-row>
          <el-col :span="12">
            <div class="reader-toolbar">
              <label>{{$t('switch-ruby')}}：</label>
              <el-switch v-model="isRuby" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
            <div class="reader-content-div">
              <reader-content></reader-content>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="reader-interactive-div">
              <span id="sel"></span>
              <interactive v-bind="idata"></interactive>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TocTree from "./TocTree";
import ReaderContent from "./reader/ReaderContent";
import Interactive from "./reader/Interactive";
import Pinyin from "../tools/Pinyin";

import { lookupICIBA } from "../../js/dict/iciba";
import { toPinyin } from "src/js/phonetics/pinyingen.js";

export default {
  components: {
    TocTree,
    ReaderContent,
    Interactive,
    Pinyin
  },
  data() {
    return {
      isRuby: false,
      idata: {
        dict: {}
      }
    };
  },
  mounted() {
    //this.lookupWord("天");
    let self = this;
    let panel = document.getElementById("reader-content-panel");
    panel.onmouseup = panel.onkeyup = panel.onselectionchange = function() {
      let selection = self.getSelectionText();
      self.lookupWord(selection);
    };
  },
  watch: {
    idata: function() {
      console.log("idata changed");
    },
    isRuby: function(newValue, oldValue) {
      if (newValue != oldValue) {
        if (newValue) {
          this.addPinyin()
        } else {
          this.removePinyin()
        }
      }
    }
  },
  methods: {
    getSelectionText() {
      var text = "";
      var activeEl = document.activeElement;
      var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
      if (
        activeElTagName == "textarea" ||
        (activeElTagName == "input" &&
          /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
          typeof activeEl.selectionStart == "number")
      ) {
        text = activeEl.value.slice(
          activeEl.selectionStart,
          activeEl.selectionEnd
        );
      } else if (window.getSelection) {
        text = window.getSelection().toString();
      }
      return text;
    },
    lookupWord(word) {
      let self = this;
      lookupICIBA(word).then(res => {
        var dict = {};
        let data = res.data;
        dict.word = data.word_name;
        console.log("lookup: ", data);
        dict.symbols = [];
        for (let s of data.symbols) {
          var sym = {};
          sym.symbol = s.word_symbol;
          sym.mp3 = s.symbol_mp3;
          // 各种词性以及对应的意义
          dict.symbols.push(sym);
        }
        self.idata.dict = dict;
      });
    },
    addPinyin() {
      var panel = document.getElementById("reader-content-panel");
      panel.classList.add("ruby");
      var paras = panel.getElementsByTagName("p");
      for (let p of paras) {
        p.setAttribute("origtext", p.innerText);
        var rubies = [];
        var pys = toPinyin(p.innerText).flat();
        for (let i = 0; i < p.innerText.length; ++i) {
          var py = pys[i];
          var ch = p.innerText[i];
          if (py != ch) {
            var ruby = `<rb>${ch}<rt>${py}`;
            rubies.push(ruby);
          } else {
            var ruby = `<rb>${ch}<rt>`;
            rubies.push(ruby);
          }
        }
        var html = "<ruby>" + rubies.join("") + "</ruby>";
        p.innerHTML = html;
      }
    },
    removePinyin() {
      var panel = document.getElementById("reader-content-panel");
      panel.classList.remove("ruby");
      var paras = panel.getElementsByTagName("p");
      for (let p of paras) {
        var origtext = p.getAttribute("origtext");
        if (origtext && origtext.length > 0) {
          p.innerHTML = origtext;
        }
      }
    },
    switchRuby() {
      if (!this.isRuby) {
        this.addPinyin();
      } else {
        this.removePinyin();
      }
      this.isRuby = !this.isRuby;
    }
  }
};
</script>


<style lang="stylus" scoped>
.reader-header
  height 36px
  line-height 36px

.reader-toolbar
  border 1px solid #eee

.reader-main
  border 1px solid #eee

.reader-toolbar
  text-align left

.reader-content-div
  max-height 800px
  padding 10px
  overflow-y scroll

.reader-content-pane.ruby
  font-size 24px
</style>
