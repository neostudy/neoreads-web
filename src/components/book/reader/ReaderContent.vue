<template>
  <el-container>
    <el-main>
      <div
        v-loading="loading"
        class="reader-content-pane"
        id="reader-content-panel"
        v-html="showContent"
        @mounted="onTextMounted"
      ></div>
    </el-main>
    <el-aside width="15px" class="gutter">
      <div v-for="(g, i) in gutters" :key="i" :style="gutterStyle(g)"></div>
    </el-aside>

    <!--<pop id="pop" v-show="popShow" :context="selectContext"></pop>-->
    <pop-bar id="pop" :context="selectContext" @fav="fav"></pop-bar>
  </el-container>
</template>

<script>
import { lookupICIBA } from "src/js/dict/iciba";
import { getSelectedNodes } from "src/js/selection/selection";
import { toPinyin } from "src/js/phonetics/pinyingen";
import Pop from "src/components/tools/Pop.vue";
import PopBar from "src/components/tools/PopBar.vue";
import { setTimeout } from "timers";
import { isFunction } from 'util';
var mdi = require("markdown-it")({
  html: true
});

var popper;
export default {
  components: { Pop, PopBar },
  props: ["bookid", "chapid", "isRuby"],
  data() {
    return {
      lines: [],
      idata: {
        dict: {}
      },
      loading: false,
      popShow: false,
      selectContext: {},
      mdContent: "",
      showContent: "",
      curHover: null,
      timeout: null,
      gutters: [{ a: 1 }, { a: 2 }, { a: 3 }],
      needRebind: true
    };
  },

  created() {
    // get book info
    this.getContent();
  },
  mounted() {
    let self = this;
    let panel = document.getElementById("reader-content-panel");
    /*
    panel.onmouseup = panel.onkeyup = panel.onselectionchange = function() {
      let selection = self.getSelectionText();
      // self.markSelection();
      // self.lookupWord(selection);
    };
    */
  },
  updated() {
    console.log("updated");
    if (this.needRebind) {
      console.log("rebinding...");
      this.rebind();

      this.needRebind = false;
    }
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
      console.log("is ruby in content:", this.isRuby);
      if (this.isRuby) {
        this.loading = true;
        this.showContent = this.addRuby(this.mdContent);
        this.loading = false;
      } else {
        this.showContent = this.mdContent;
      }
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
          let md = mdi.render(content);
          console.log(md.substr(0, 100));
          this.mdContent = md.replace(
            />([^<]+)</g,
            '><span class="content-text">$1</span><'
          );
          if (self.isRuby) {
            this.showContent = this.addRuby(this.mdContent);
          } else {
            this.showContent = this.mdContent;
          }
          this.needRebind = true;
          self.loading = false;
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
    rebind() {
      let self = this;
      let panel = document.getElementById("reader-content-panel");
      let paras = panel.getElementsByTagName("p");
      for (let para of paras) {
        let spans = para.getElementsByClassName("content-text");

        for (let span of spans) {
          self.registerSpan(span);
        }
        let lastSpan = spans[spans.length - 1];
        if (lastSpan) {
          lastSpan.innerHTML = '<i class="el-icon-zoom-in"></i>';
          lastSpan.onmouseover = function() {
            para.classList.add("active");
          };
          lastSpan.onmouseout = function() {
            para.classList.remove("active");
          };
        }
      }
    },
    registerSpan(span) {
      let self = this;
      span.onmouseout = function() {
        span.classList.remove("active");
      };
      span.onmouseover = function(event) {
        span.classList.add("active");
        let isFav = span.classList.contains("mark")
        setTimeout(function() {
          if (span.classList.contains("active")) {
            var popdiv = document.getElementById("pop");
            self.selectContext = {
              isFav: isFav,
              rect: span.getBoundingClientRect(),
              text: span.textContent,
              ids: {
                bookid: self.bookid,
                chapid: self.chapid,
                sentid: span.nextSibling.id,
                paraid: span.parentNode.lastChild.id,
                pos: 0
              },
              mouse: {
                clientX: event.clientX,
                clientY: event.clientY
              }
            };
          }
        }, 500);
      };
    },
    addRuby(html) {
      var panel = document.getElementById("reader-content-panel");
      panel.classList.add("ruby");
      var dm = document.createElement("div");
      dm.innerHTML = this.mdContent;

      for (let p of dm.getElementsByTagName("p")) {
        var rubies = [];
        for (let n of p.childNodes) {
          if (n.nodeType == Node.TEXT_NODE) {
            var txt = n.textContent;
            var rubies = [];
            for (let ch of txt.split("")) {
              var py = toPinyin(ch);
              if (py.length > 0) {
                py = py[0];
              }
              if (py != ch) {
                var ruby = `<rb>${ch}<rt>${py}`;
                rubies.push(ruby);
              } else {
                var ruby = `<rb>${ch}<rt>`;
                rubies.push(ruby);
              }
            }
            var rubyEl = document.createElement("ruby");
            rubyEl.innerHTML = rubies.join("");
            n.replaceWith(rubyEl);
          }
        }
      }
      return dm.innerHTML;
    },
    onTextMounted() {
      console.log("on mounted");
      let panel = document.getElementById("reader-content-panel");

      for (let span of panel.getElementsByClassName("content-text")) {
        span.onmouseover = function() {
          console.log("over");
        };
      }
    },
    gutterStyle(g) {
      if (g.a == "2") {
        return "height:100px;background-color:red;";
      } else {
        return "height:100px;background-color:pink;";
      }
    },
    fav(isFav) {
      let ctx = this.selectContext;
      this.markFav(isFav, ctx.ids.sentid, ctx.ids.paraid);
    },
    markFav(isFav, sentid, paraid) {
      let sent = document.getElementById(sentid);
      let span = sent.previousSibling;
      if (isFav) {
        span.classList.add("mark");
      } else {
        span.classList.remove("mark");
      }
    }
  }
};
</script>


<style lang="stylus">
.reader-content-pane
  text-align left

  p
    padding 5px
    border-radius 4px
    margin-top 15px
    font-size 18px
    line-height 32px
    transition background-color 300ms ease-in

    span
      padding 5px
      background-color white
      border-radius 4px
      transition background-color 300ms ease-in

    span:hover
      background-color #D9ECFF
      cursor pointer

    span.mark
      background-color yellow

  ruby
    rb
      font-size 28px

    rt
      font-size 8px

.gutter
  border 1px solid #eee
</style>
