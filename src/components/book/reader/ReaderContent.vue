<template>
  <div v-loading="loading" class="reader-content-pane" id="reader-content-panel" v-html="mdContent"></div>
</template>

<script>
import { lookupICIBA } from "src/js/dict/iciba";
import { getSelectedNodes } from "src/js/selection/selection";
var mdi = require("markdown-it")({
  html: true
});

export default {
  props: ["bookid", "chapid", "isRuby"],
  data() {
    return {
      lines: [],
      idata: {
        dict: {}
      },
      loading: false,
      mdContent: ""
    };
  },
  created() {
    // get book info
    this.getContent();
  },
  mounted() {
    let self = this;
    let panel = document.getElementById("reader-content-panel");
    panel.onmouseup = panel.onkeyup = panel.onselectionchange = function() {
      let selection = self.getSelectionText();
      // self.markSelection();
      // self.lookupWord(selection);
    };
  },
  watch: {
    chapid: function(newValue, oldValue) {
      console.log("chapid changed:", oldValue, newValue);
      if (newValue != "") {
        this.getContent();
      }
    },
    idata: function() {
      console.log("idata changed");
    },
    isRuby: function() {
      console.log("is ruby in content:", this.isRuby)
    }
  },
  methods: {
    getContent() {
      if (this.bookid != "" && this.chapid != "") {
        this.loading = true;
        let self = this;
        let contentUrl =
          "/api/v1/book/" + this.bookid + "/chapter/" + this.chapid;
        this.$axios.get(contentUrl).then(res => {
          //console.log(res);
          let data = res.data;
          let content = data.content;
          if (self.isRuby) {
            this.mdContent = "RUBY";
          } else {
            this.mdContent = mdi.render(content);
          }
          self.loading = false;
          /*
          let text = data.content.split("\n\r");
          self.lines = text;
          self.loading = false;
          let panel = document.getElementById("reader-content-panel");
          panel.innerHTML = md;
          */
        });
      }
    },
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
    // TODO: this function is not working properly
    // need to rewrite it when we have noted text in the backend
    // what we need is mark by sentence, not mark where ever you want.
    markSelection() {
      let sel = window.getSelection();
      if (sel.toString().length == 0) {
        console.log("selected nothing.");
        return;
      }
      let r = getSelectedNodes();
      console.log(r);
      let range = sel.getRangeAt(0);
      let sc = range.startContainer;
      let so = range.startOffset;
      let ec = range.endContainer;
      let eo = range.endOffset;
      // same container
      if (sc === ec) {
        let p = sc;
        if (p.parentNode.tagName.toLowerCase() != "mark") {
          let t0 = p.textContent.slice(0, so);
          console.log("t0:", t0);
          let t1 = p.textContent.slice(eo, p.textContent.length);
          console.log("t1:", t1);
          let ts = sel.toString();
          console.log("ts:", ts);
          var m0 = document.createTextNode(t0);
          p.parentNode.insertBefore(m0, p);
          var ms = document.createElement("mark");
          ms.innerHTML = ts;
          p.parentNode.insertBefore(ms, p);
          var m1 = document.createTextNode(t1);
          p.parentNode.insertBefore(m1, p);
          p.parentNode.removeChild(p);
        }
      } else {
        console.log("init: ", r);
        for (let n of r) {
          if (
            n.nodeType != Node.TEXT_NODE &&
            n.tagName.toLowerCase() == "mark"
          ) {
            n.replaceWith(document.createTextNode(n.textContent));
          }
        }
        r = getSelectedNodes();
        console.log("cleand:", r);
        for (let n of r) {
          if (n && n.parentNode) n.parentNode.normalize();
        }
        r = getSelectedNodes();
        console.log("cleand:", r);
        for (let n of r) {
          if (
            n.nodeType != Node.TEXT_NODE &&
            n.tagName.toLowerCase() == "mark"
          ) {
            continue;
          }
          if (n.parentNode.tagName.toLowerCase() == "mark") {
            continue;
          }
          if (n == sc.parentNode || n == ec.parentNode) {
            console.log("ignore start and end parents");
          } else if (n == sc && n.textContent.length != so) {
            // start text node
            console.log("text:", n.textContent, ":", n.textContent.length);
            console.log("so:", so);
            let text = n.textContent;
            let t0 = text.slice(0, so);
            let ts = text.slice(so, text.length);
            if (ts.length == 0) continue;
            n.textContent = t0;
            var ms = document.createElement("mark");
            ms.innerHTML = ts;
            n.parentNode.insertBefore(ms, n.nextSibling);
            console.log("tt0:", t0);
            console.log("tts:", ts);
          } else if (n == ec && eo != 0) {
            console.log("eo:", eo);
            let text = n.textContent;
            let t1 = text.slice(eo, text.length);
            let ts = text.slice(0, eo);
            n.textContent = t1;
            var ms = document.createElement("mark");
            ms.innerHTML = ts;
            n.parentNode.insertBefore(ms, n);
            // end text node
          } else {
            // middle node
            if (n.nodeType == Node.TEXT_NODE) {
              console.log("text node");
              console.log("next sibling:", n.nextSibling);
              let ms = document.createElement("mark");
              ms.innerHTML = n.textContent;
              n.parentNode.insertBefore(ms, n);

              n.parentNode.removeChild(n);
            } else if (n.tagName == "mark") {
              console.log("mark:", n);
            }
          }
        }
      }
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
    }
  }
};
</script>


<style lang="stylus">
.reader-content-pane
  text-align left

  p
    margin-top 10px
    font-size 18px
</style>
