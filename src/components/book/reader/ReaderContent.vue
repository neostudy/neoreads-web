<template>
  <el-container>
    <el-main class="reader-content-main">
      <el-container>
        <el-header height="20px"></el-header>
        <el-main style="padding: 0px;">
          <div v-loading="loading" class="reader-content-pane" id="reader-content-panel">
            <!--<div v-for="(p, i) in paras" :key="i" v-html="p"></div>-->
          </div>
        </el-main>
      </el-container>
    </el-main>
    <el-aside width="15px" class="gutter">
      <div v-for="(g, i) in gutters" :key="i" :style="gutterStyle(g)"></div>
    </el-aside>

    <pop-bar id="pop" v-show="false" @fav="fav"></pop-bar>
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
import NoteMixin from "./NoteMixin.js";
var mdi = require("markdown-it")({
  html: true
});

var popper;
export default {
  mixins: [PagerMixin, SelectionMixin, DictMixin, NoteMixin],
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
    this.fetchContent();
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
        this.fetchContent();
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
    fetchContent() {
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
      this.fetchNotes();
    },
    // rebind command popper to all sentences and paragraphs
    // TODO: deal with paragraph
    rebind() {
      let panel = document.getElementById("reader-content-panel");
      let paras = panel.getElementsByTagName("p");
      for (let para of paras) {
        let spans = para.getElementsByClassName("content-text");

        for (let span of spans) {
          this.bindSentence(span);
        }

        this.bindParagraph();
      }
      this.bindNotes();
    },
    bindSentence(span) {
      let self = this;
      span.onmouseout = function() {
        span.classList.remove("active");
      };
      span.onclick = function(event) {
        // close toc to make room for interactive pane
        EVENT_BUS.$emit("HIDE_TOC");

        // hightlight this sentence to show it's selected
        span.classList.add("active");

        // update store.select context
        let isFav = span.classList.contains("mark");
        let sid = span.sentid;
        let note = self.notes[sid];
        // the popbar shows itself when self.selectContext changes
        let ctx = {
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
        self.$store.dispatch("select", ctx);

        // open popbar for this sentence
        EVENT_BUS.$emit("OPEN_POPBAR");
      };
    },
    bindParagraph() {
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
      let ctx = this.$store.getters.select;
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
