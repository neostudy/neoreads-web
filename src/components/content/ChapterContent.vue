<template>
  <div id="chapter-content-pane">
      <md-content :content="content" :title="title" @select="select"></md-content>
  </div>
</template>

<script>
import Scroller from "../tools/Scroller.vue";
import MdContent from "./MarkdownContent.vue";
import { CONTENTS } from "src/js/content/contents.js";
import {EVENT_BUS} from "src/eventbus.js";


export default {
  props: ["bookid", "chapid", "highlight"],
  components: {
    Scroller,
    MdContent
  },
  data() {
    return {
      title: "",
      content: ""
    };
  },
  created() {
    let self = this;
    CONTENTS.init(this.$store, this.$axios);
    CONTENTS.fetchChapter(this.bookid, this.chapid).then(res => {
      self.content = CONTENTS.content;
      if (!self.title) {
        self.title = CONTENTS.title;
      }
      this.$emit("content-loaded");
      EVENT_BUS.$emit("chapter-content-loaded");
      
    });
  },
  mounted() {},
  updated() {
    this.hightLightCurrentSent();
  },
  watch: {},
  methods: {
    select(sent) {
      this.$emit("select", sent);
    },
    hightLightCurrentSent() {
      console.log("highlighting");
      if (!this.highlight) return;
      // remove old highlights
      for (let span of this.$el.getElementsByClassName("mark")) {
        span.classList.remove("mark");
      }
      // add new highlight
      let sent = document.getElementById(this.highlight);
      let span = sent.previousSibling;
      if (span) {
        span.classList.add("mark");
      }
      span.scrollIntoView(); //{block: "center"});
      let pane = document.getElementById("chapter-content-pane");
      if (!pane) return;
      pane.scrollBy(0, -100);
    }
  }
};
</script>

<style lang="stylus" scoped>
#chapter-content-pane
  min-height 860px
</style>
