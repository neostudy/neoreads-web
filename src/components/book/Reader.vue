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

import { lookupICIBA } from "../../js/dict/iciba";

export default {
  components: {
    TocTree,
    ReaderContent,
    Interactive
  },
  data() {
    return {
      idata: {} 
    }

  },
  mounted() {
    //this.lookupWord("天");
    let self = this;
    document.onmouseup = document.onkeyup = document.onselectionchange = function() {
      let selection = self.getSelectionText();
      //console.log("selected:", selection);
      self.lookupWord(selection);
      document.getElementById("sel").innerHTML = selection;
    };
  },
  watch: {
    idata: function() {
      console.log("idata changed")
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
      let self = this
      lookupICIBA(word).then(res => {
        var dict = {}
        let data = res.data
        //console.log(data)
        dict.word = data.word_name
        dict.symbols = []
        for (let s of data.symbols) {
          var sym = {}
          sym.symbol = s.word_symbol
          sym.mp3 = s.symbol_mp3
          // 各种词性以及对应的意义
          dict.symbols.push(sym)
        }
        console.log("changing self.idata")
        // TODO: 需要找到一个办法，在部分更新self.idata情况下，也能让子模块接收到更新通知
        self.idata = {dict: dict}
      });
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

.reader-content-div
  max-height 800px
  padding 10px
  overflow-y scroll
</style>
