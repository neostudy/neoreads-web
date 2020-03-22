<template>
  <div id="translation-content-pane">
    <md-content :content="content" :title="title" @select="select"></md-content>
    <translation-editor :show="showEditor" :para="para"></translation-editor>
  </div>
</template>

<script>
import Scroller from "../tools/Scroller.vue";
import MdContent from "./MarkdownContent.vue";
import TranslationEditor from "../book/interactive/TranslationEditor.vue";
import { CONTENTS } from "src/js/content/contents.js";
import { EVENT_BUS } from "src/eventbus.js";

export default {
  props: ["bookid", "chapid", "highlight"],
  components: {
    Scroller,
    MdContent,
    TranslationEditor
  },
  data() {
    return {
      title: "",
      content: "",
      showEditor: false,
      para: {}
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
    this.registerEditors();
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
          this.updateParaId(para, "P");
          this.updateParaId(para, "LI");
          this.updateParaId(para, "H1");
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
    loadTranslations() {},
    registerEditors() {
      for (let p of this.$el.getElementsByClassName("md-paragraph")) {
        let elem = p.firstChild;
        if (elem.tagName === "UL" || elem.tagName === "OL") {
          for (let li of elem.children) {
            this.registerEditor(li);
          }
        } else {
          this.registerEditor(elem);
        }
      }
    },
    registerEditor(elem) {
      elem.classList.add("md-para");
      let editor = document.getElementById("translation-editor");
      elem.onclick = event => {
        if (!event.path.includes(editor)) {
          this.openEditor(elem);
        }
      };
    },
    openEditor(p) {
      let pid = p.id;
      if (pid.startsWith("t_")) pid = pid.substr(2);
      if (!!pid) {
        let mdText = this.findMarkdownText(pid);
        let sents = CONTENTS.getParaSents(pid);
        this.para = {
          pid: pid,
          sents: sents
        };
        let editor = document.getElementById("translation-editor");
        editor.remove();
        //p.parentNode.insertBefore(editor, p.nextSibling);
        p.classList.add("translation-panel");
        p.appendChild(editor);
        this.showEditor = true;
      }
    },
    findMarkdownText(pid) {
      let para = CONTENTS.getPara(pid);
      return para;
    }
  }
};
</script>

<style lang="stylus" scoped>
#translation-content-pane
  min-height 860px
</style>
<style lang="stylus">
#translation-content-pane
  .md-para
    border-radius 4px
    cursor pointer

    &:hover
      background-color #ECF5FF

  .translation-panel
    padding 5px 10px
    border 1px solid #C6E2FF
    border-radius 5px
    background-color #ECF5FF
</style>
