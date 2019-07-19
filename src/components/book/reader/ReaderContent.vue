<template>
  <el-container>
    <el-main class="reader-content-main">
      <el-container>
        <el-header height="20px"></el-header>
        <el-main style="padding: 0px;">
          <div
            v-loading="loading"
            class="reader-content-pane"
            id="reader-content-panel"
            @mounted="onTextMounted"
          >
            <!--<div v-for="(p, i) in paras" :key="i" v-html="p"></div>-->
          </div>
        </el-main>
      </el-container>
    </el-main>
    <el-aside width="15px" class="gutter">
      <div v-for="(g, i) in gutters" :key="i" :style="gutterStyle(g)"></div>
    </el-aside>

    <pop-bar id="pop" v-show="false" :context="selectContext" @fav="fav"></pop-bar>
  </el-container>
</template>

<script>
import { toPinyin } from "src/js/phonetics/pinyingen";
import PopBar from "src/components/tools/PopBar.vue";
import { EVENT_BUS } from "src/eventbus.js";
import { setTimeout } from "timers";
import { isFunction } from "util";
import PagerMixin from "./PagerMixin.js";
import SelectionMixin from "./SelectionMixin.js";
import DictMixin from "./DictMixin.js";
var mdi = require("markdown-it")({
  html: true
});

var popper;
export default {
  mixins: [PagerMixin, SelectionMixin, DictMixin],
  components: { PopBar },
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
    this.registerWheel();
    this.registerKeys();
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
        /*
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
        */
      }
      // get notes from api
      // TODO: should only called once per chapter
      this.getNotes();
    },
    registerSpan(span) {
      let self = this;
      span.onmouseout = function() {
        span.classList.remove("active");
      };
      span.onclick = function(event) {
        // close toc to make room for 
        EVENT_BUS.$emit("HIDE_TOC");


        // update self.selectContext so that interactive pane and popdiv should respond
        // TODO: use store/event_bus instead of props and watchers
        span.classList.add("active");
        let isFav = span.classList.contains("mark");
        let sid = span.sentid;
        let note = self.notes[sid];
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
          note: note,
          // TODO:
          // The mouse might move away when this timeout hits,
          // so this mouse position is not accurate.
          // Find another way to get the mouse position for popbar
          mouse: {
            clientX: event.clientX,
            clientY: event.clientY
          }
        };
        self.$store.dispatch("selectContext", self.selectContext);
      };
    },
    addRuby(html) {
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
    addNote(paraid, sentid) {
      var json = {
        ntype: 0, // mark
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
        self.notes[sentid] = res.data;
      });
    },
    removeNote(paraid, sentid) {
      let note = this.notes[sentid];
      if (!note) return;
      let noteid = note.id;
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
          self.notes[n.sentid] = n;
          self.applyNote(n);
        }
      });
    },
    applyNote(n) {
      let sent = document.getElementById(n.sentid);
      if (sent) {
        let span = sent.previousSibling;
        span.sentid = n.sentid;
        if (n.ntype == 0) {
          //mark
          span.classList.add("mark");
        } else if (n.ntype == 1) {
          // note
          span.classList.add("note");
          span.title = n.content;
        } else {
          span.classList.add("other-note");
        }
      }
    },
    // enable page turning with mousewheel
    registerWheel() {
      let self = this;
      let panel = document.getElementById("reader-content-panel");

      panel.onwheel = function(event) {
        event.preventDefault();

        if (event.deltaY < 0) {
          // wheel up
          self.prevPage(self.paras);
        } else {
          // wheel down
          self.nextPage(self.paras);
        }
      };
    },
    // enable page turning with PgUp, PgDown, Left and Right
    registerKeys() {
      let self = this;
      window.onkeydown = function(event) {
        if (event.srcElement.tagName == "BODY") {
          let k = event.keyCode;
          if (k == 33 || k == 37) {
            // 33: page up; 37: left
            event.preventDefault();
            self.prevPage(self.paras);
          } else if (k == 34 || k == 39) {
            // 34: page down; 39: right
            event.preventDefault();
            self.nextPage(self.paras);
          }
        }
      };
    }
  }
};
</script>


<style lang="stylus">
.reader-content-main
  padding 0px 20px

.reader-content-pane
  text-align left
  overflow hidden

  p
    margin-bottom 20px
    border-radius 4px
    font-size 20px
    line-height 36px
    transition background-color 300ms ease-in

    span
      padding 4px 0
      background-color white
      border-radius 4px
      transition background-color 300ms ease-in

    span:hover
      background-color #D9ECFF
      cursor pointer

    span.mark
      background-color #FFFFB3

    span.note
      background-color #FFCFA0

  ruby
    rb
      font-size 28px

    rt
      font-size 8px

.gutter
  border 0px
  border-left 1px solid #eee
</style>
