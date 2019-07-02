<template>
  <div class="reader-content-pane" id="reader-content-panel">
    <p v-for="(ln,i) in lines" :key="i">{{ln}}</p>
  </div>
</template>

<script>

import { lookupICIBA } from "src/js/dict/iciba";

export default {
  props: ["bookid", "chapid"],
  data() {
    return {
      lines: [],
      idata: {
        dict: {}
      }
    };
  },
  created() {
    // get book info
  },
  mounted() {
    let self = this;
    let panel = document.getElementById("reader-content-panel");
    panel.onmouseup = panel.onkeyup = panel.onselectionchange = function() {
      let selection = self.getSelectionText();
      self.lookupWord(selection);
    };
  },
  watch: {
    chapid: function(newValue, oldValue) {
      console.log("chapid:", oldValue, newValue);
      if (newValue != "") {
        if (this.bookid != "" && this.chapid != "") {
          let self = this;
          let contentUrl =
            "/api/v1/book/" + this.bookid + "/chapter/" + this.chapid;
          this.$axios.get(contentUrl).then(res => {
            console.log(res);
            let data = res.data;
            let text = data.content.split("\n\r");
            self.lines = text;
            let panel = document.getElementById("reader-content-panel");
          });
        }
      }
    },
    idata: function() {
      console.log("idata changed");
    },
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
    
  }
};
</script>


<style lang="stylus" scoped>
.reader-content-pane
  text-align left

  p
    margin-top 10px
</style>
