<template>
  <div>
    <div v-bar v-if="!noScroll">
      <div class="poem-content-pane">
        <div class="poem-content-inner" :class="large ? 'large' : 'normal'">
          <paragraph
            v-for="(p,i) in paras"
            :key="i"
            :html="p"
            @select="select"
            :highlight="highlight"
          ></paragraph>
        </div>
      </div>
    </div>
    <div v-if="noScroll" class="poem-content">
      <paragraph v-for="(p,i) in paras" :key="i" :html="p" @select="select" :highlight="highlight"></paragraph>
    </div>
  </div>
</template>

<script>
import Paragraph from "./Paragraph.vue";
import sentence from "src/js/markdown/sentence.js";
import linenum from "src/js/markdown/linenum.js";
var hljs = require("highlight.js");
import "highlight.js/styles/github.css";
var mdi = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
})
  .use(require("markdown-it-sup"))
  .use(require("markdown-it-sub"))
  .use(require("markdown-it-mark"))
  .use(require("markdown-it-ins"))
  .use(require("markdown-it-attrs"))
  .use(linenum);

function addLineNum(text) {
  let lines = text.split("\n");
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i].trim() != "") {
      lines[i] = lines[i] + "[#" + String(i).padStart(4, "0") + "]";
    }
  }
  return lines.join("\n");
}
export default {
  props: ["content", "noScroll", "large"],
  components: {
    Paragraph
  },
  data() {
    return {
      paras: [],
      highlight: ""
    };
  },
  watch: {
    content() {
      console.log("content updated!");
      this.parseContent();
    }
  },
  created() {
    if (this.content !== "") {
      this.parseContent();
    }
  },
  methods: {
    // TODO: how to avoid contaminating <pre><code> blocks
    parseContent() {
      // 给每行内容添加行号：
      let content = addLineNum(this.content);

      let md = mdi.render(content);

      let dp = new DOMParser();
      let dom = dp.parseFromString(md, "text/html");

      let tags = dom.body.children;
      let paras = [];
      for (let i = 0; i < tags.length; ++i) {
        paras.push(tags[i].outerHTML);
      }

      let mdps = paras.map(ln => ln.trim());
      this.paras = mdps;
    },
    select(data) {
      this.$emit("select", data);
    }
  }
};
</script>

<style lang="stylus" scoped>
.poem-content-pane
  max-height 860px

  .poem-content-inner
    padding 20px 20px 20px 0
</style>

<style lang="stylus">
.poem-content-inner

  & .line
    display inline-block
    margin-bottom 0.6em
    padding 5px

    &.selected
      background-color #C6E2FF
      border-radius 5px

    & span.selected
      background-color #C6E2FF

    & .note
      //background-color #C6E2FF
      border-bottom 5px inset #C6E2FF

      &.deep
        //background-color #A6C2CF
        border-bottom 5px inset #A6C2CF

  &.large .line
    font-size 2em

  &.normal .line
    font-size 1.3em

  & .line-stat
    display none
    border 1px solid #ddd
    border-radius 4px
    font-size 0.8em
    color #666
    background-color #fafafa
    padding 2px 6px
    margin-left 10px


</style>

<style lang="stylus" src="src/stylus/markdown.styl"></style>
