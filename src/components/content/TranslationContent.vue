<template>
  <div id="translation-content-pane">
    <md-content :content="content" :title="title" @select="select"></md-content>
  </div>
</template>

<script>
import Scroller from "../tools/Scroller.vue";
import MdContent from "./MarkdownContent.vue";
import { CONTENTS } from "src/js/content/contents.js";
import { EVENT_BUS } from "src/eventbus.js";

export default {
  props: ["bookid", "chapid", "highlight"],
  components: {
    Scroller,
    MdContent,
  },
  data() {
    return {
      title: "",
      content: ""
    };
  },
  created() {
    EVENT_BUS.$on("chapter-content-loaded", () => {
      this.content = CONTENTS.content;
    });
  },
  mounted() {},
  updated() {
    this.updateIds();
    this.loadTranslations();
  },
  watch: {},
  methods: {
    select(sent) {
      this.$emit("select", sent);
    },
    updateIds() {
      console.log("updating ids...");
      let contentpane = this.$el.getElementsByClassName(
        "markdown-content-inner"
      );
      for (let pane of contentpane) {
        for (let para of pane.getElementsByClassName("md-paragraph")) {
          this.updateParaId(para, "P")
          this.updateParaId(para, "LI")
          this.updateParaId(para, "H1")
          for (let sent of para.getElementsByClassName("sent")) {
            let sid = sent.id;
            if (!!sid) {
              sent.id = "t_" + sid;
            }
          }
        }
      }
    },
    updateParaId(parent, tag) {
      for (let p of parent.getElementsByTagName(tag)) {
        let pid = p.id;
        if (!!pid) {
          p.id = "t_" + pid;
        }
      }
    },
    loadTranslations() {

    }
  }
};
</script>

<style lang="stylus" scoped>
#translation-content-pane
  min-height 860px
</style>
