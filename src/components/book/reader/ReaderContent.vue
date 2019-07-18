<template>
  <el-container>
    <el-main>
      <div
        v-loading="loading"
        class="reader-content-pane"
        id="reader-content-panel"
        @mounted="onTextMounted"
      >
        <!--<div v-for="(p, i) in paras" :key="i" v-html="p"></div>-->
      </div>
    </el-main>
    <el-aside width="15px" class="gutter">
      <div v-for="(g, i) in gutters" :key="i" :style="gutterStyle(g)"></div>
    </el-aside>

    <pop-bar id="pop" v-show="false" :context="selectContext" @fav="fav"></pop-bar>
  </el-container>
</template>

<script>
import { lookupICIBA } from "src/js/dict/iciba";
import { getSelectedNodes } from "src/js/selection/selection";
import { toPinyin } from "src/js/phonetics/pinyingen";
import Pop from "src/components/tools/Pop.vue";
import PopBar from "src/components/tools/PopBar.vue";
import {EVENT_BUS} from "src/eventbus.js";
import { setTimeout } from "timers";
import { isFunction } from "util";
import PagerMixin from "./PagerMixin.js";
var mdi = require("markdown-it")({
  html: true
});

var popper;
export default {
  mixins: [PagerMixin],
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
      curHover: null,
      timeout: null,
      gutters: [1, 1, 2, 1, 1, 2, 1, 0, 0],
      needRebind: true,
      notes: {},
      paras: [],
      oparas: []
    };
  },

  created() {
    // get book info
    this.getContent();
    //this.$root.data.activeIndex = "/library";
    console.log("root:", this.$root);
    EVENT_BUS.$on("PREV_PAGE", () => this.prevPage(this.paras));
    EVENT_BUS.$on("NEXT_PAGE", () => this.nextPage(this.paras));
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
    console.log("say hello!");
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
      if (this.isRuby) {
        this.loading = true;
        this.oparas = this.paras;
        this.paras = this.paras.map(p => this.addRuby(p));
        this.loading = false;
      } else {
        this.paras = this.oparas;
      }
      self.pages = [];
      self.curPage = 0;
      self.endChapter = false;
      this.renderPage(this.paras);
      this.needRebind = true;
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
          console.log("markdown length:", md.length);
          let mdps = md
            .split(/<\/?p>/g)
            .map(ln => ln.trim())
            .filter(ln => ln != "")
            .map(ln => "<p>" + ln + "</p>")
            .map(ln =>
              ln.replace(/>([^<]+)</g, '><span class="content-text">$1</span><')
            );
          self.oparas = mdps;
          if (self.isRuby) {
            self.paras = mdps.map(p => self.addRuby(p));
          } else {
            self.paras = mdps;
          }
          self.pages = [];
          self.curPage = 0;
          self.endChapter = false;
          self.renderPage(self.paras);
          self.needRebind = true;
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
    // rebind command popper to all sentences and paragraphs
    // TODO: deal with paragraph
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
      // get notes from api
      this.getNotes();
    },
    registerSpan(span) {
      let self = this;
      span.onmouseout = function() {
        span.classList.remove("active");
      };
      span.onmouseover = function(event) {
        span.classList.add("active");
        let isFav = span.classList.contains("mark");
        setTimeout(function() {
          if (span.classList.contains("active")) {
            var popdiv = document.getElementById("pop");
            // the popbar shows itself when self.selectContext changes
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
              // TODO:
              // The mouse might move away when this timeout hits,
              // so this mouse position is not accurate.
              // Find another way to get the mouse position for popbar
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
      dm.innerHTML = html;

      for (let p of dm.getElementsByTagName("p")) {
        var rubies = [];
        for (let n of p.childNodes) {
          if (n.tagName.toLowerCase() == "span") {
            let t = n.firstChild;
            var txt = t.textContent;
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
            t.replaceWith(rubyEl);
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
      if (g == 2) {
        return "height:100px;background-color:red;";
      } else if (g == 1) {
        return "height:100px;background-color:pink;";
      } else if (g == 0) {
        return "height:100px;";
      }
    },
    fav(isFav) {
      let ctx = this.selectContext;
      this.markFav(isFav, ctx.ids.paraid, ctx.ids.sentid);
    },
    markFav(isFav, paraid, sentid) {
      let sent = document.getElementById(sentid);
      let span = sent.previousSibling;
      if (isFav) {
        span.classList.add("mark");
        this.addNote(paraid, sentid);
      } else {
        span.classList.remove("mark");
        this.removeNote(paraid, sentid);
      }
    },
    authGet(url) {
      return this.$axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      });
    },
    authPost(url, json) {
      return this.$axios.post(url, json, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      });
    },
    addNote(paraid, sentid) {
      var json = {
        ntype: 1, // mark
        ptype: 1, // position: sent
        bookid: this.bookid,
        chapid: this.chapid,
        paraid: paraid,
        sentid: sentid,
        wordid: "0000"
      };
      console.log("add note:", json);
      let self = this;

      this.authPost("/api/v1/note/add", json).then(res => {
        let noteid = res.data.id;
        self.notes[sentid] = noteid;
      });
      /*
      this.$axios.post("/api/v1/note/add", json).then(res => {
        let noteid = res.data.id;
        self.notes[sentid] = noteid;
      });
      */
    },
    removeNote(paraid, sentid) {
      let noteid = this.notes[sentid];
      if (noteid) {
        console.log("removing note:", noteid);
        this.authGet("/api/v1/note/remove/" + noteid);
      }
    },
    getNotes() {
      let query = "bookid=" + this.bookid + "&chapid=" + this.chapid;
      let self = this;
      let token = this.$store.getters.token;
      this.authGet("/api/v1/note/list?" + query).then(res => {
        console.log(res);
        for (let n of res.data) {
          self.notes[n.sentid] = n.id;
          self.applyNote(n);
        }
      });
    },
    applyNote(n) {
      let sent = document.getElementById(n.sentid);
      if (sent) {
        let span = sent.previousSibling;
        span.classList.add("mark");
      }
    }
  }
};
</script>


<style lang="stylus">
.reader-content-pane
  text-align left
  max-height 760px
  overflow hidden

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
  border 0px
  border-left 1px solid #eee
</style>
