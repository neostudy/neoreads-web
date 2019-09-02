<template>
  <div v-bar>
    <div id="chapter-content-pane">
      <paragraph v-for="(p,i) in paras" :key="i" :html="p" @select="select" :highlight="highlight"></paragraph>
    </div>
  </div>
</template>

<script>
import Paragraph from "./Paragraph.vue";
import { CONTENTS } from "src/js/content/contents.js";

var mdi = require("markdown-it")({
  html: true
});

export default {
  props: ["bookid", "chapid", "highlight"],
  components: {
    Paragraph
  },
  data() {
    return {
      content: "",
      parasArr: []
    };
  },
  computed: {
    paras() {
      let ps = this.parseContent();
      this.parasArr = ps;
      return ps;
    }
  },
  created() {
    let self = this;
    CONTENTS.init(this.$store, this.$axios);
    CONTENTS.fetchChapter(this.bookid, this.chapid).then(res => {
      self.content = CONTENTS.content;
      //self.fetchNotes();
      if (!self.title) {
        self.title = CONTENTS.title;
      }
      this.$emit("content-loaded");
    });
  },
  mounted() {},
  updated() {
    this.hightLightCurrentSent()
  },
  watch: {},
  methods: {
    select(sent) {
      console.log("selected:", sent);
      this.$emit("select", sent);
    },
    parseContent(content) {
      let md = mdi.render(this.content);
      let mdps = md
        .split(/<\/?p>/g)
        .map(ln => ln.trim())
        .filter(ln => ln != "")
        .map(ln => "<p>" + ln + "</p>")
        .map(ln =>
          ln.replace(/>([^<]+)</g, '><span class="content-text">$1</span><')
        );
      return mdps;
    },
    hightLightCurrentSent() {
      console.log("highlighting")
      if (!this.highlight) return;
      // remove old highlights
      for (let span of this.$el.getElementsByClassName("mark")) {
        span.classList.remove("mark")
      }
      // add new highlight
      let sent = document.getElementById(this.highlight);
      let span = sent.previousSibling;
      if (span) {
        span.classList.add("mark");
      }
      span.scrollIntoView();//{block: "center"});
      let pane = document.getElementById("chapter-content-pane")
      if (!pane) return;
      pane.scrollBy(0, -100);
    }
  }
};
</script>

<style lang="stylus" scoped>
#chapter-content-pane
  max-height 800px
</style>
