<template>
  <div>
    <div v-bar v-if="!noScroll">
      <div id="markdown-content-pane" class="markdown-content">
        <div class="markdown-content-inner">
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
    <div v-if="noScroll" class="markdown-content">
      <paragraph v-for="(p,i) in paras" :key="i" :html="p" @select="select" :highlight="highlight"></paragraph>
    </div>
  </div>
</template>

<script>
import Paragraph from "./Paragraph.vue";
import sentence from "src/js/markdown/sentence.js";
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
  .use(sentence)
  ;

export default {
  props: ["title", "content", "noScroll"],
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
      this.parseContent();
    }
  },
  created() {
    console.log("Rules for text:", mdi.renderer.rules);
    //this.parseContent()
  },
  methods: {
    // TODO: how to avoid contaminating <pre><code> blocks
    parseContent() {
      let md = mdi.render(this.content);

      let dp = new DOMParser();
      let dom = dp.parseFromString(md, "text/html");

      let tags = dom.body.children;
      let paras = [];
      for (let i = 0; i < tags.length; ++i) {
        paras.push(tags[i].outerHTML);
      }

      let mdps = paras.map(ln => ln.trim());
      /*
        .filter(ln => ln != "")
        .map(ln => {
          if (ln.startsWith("<pre")) {
            return ln;
          } else {
            return ln.replace(
              />([^<]+)</g,
              '><span class="content-text">$1</span><'
            );
          }
        });
        */

      /*
      let mdps = md
        .split(/<\/?p>/g)
        .map(ln => ln.trim())
        .filter(ln => ln != "")
        .map(ln => "<p>" + ln + "</p>")
        .map(ln =>
          ln.replace(/>([^<]+)</g, '><span class="content-text">$1</span><')
        );
        */
      this.paras = mdps;
    },
    select(data) {
      this.$emit("select", data);
    }
  }
};
</script>

<style lang="stylus" scoped>
#markdown-content-pane
  text-align left
  max-height 860px

  .markdown-content-inner
    padding 20px
</style>

<style lang="stylus" src="src/stylus/markdown.styl"></style>
