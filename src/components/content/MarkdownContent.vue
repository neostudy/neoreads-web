<template>
  <div>
    <div v-bar>
      <div id="article-content-pane" class="markdown-content">
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
</template>

<script>
import Paragraph from "./Paragraph.vue";
var hljs = require("highlight.js");
import 'highlight.js/styles/github.css';
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
  .use(require("markdown-it-ins"));

export default {
  props: ["title", "content"],
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
    //this.parseContent()
  },
  methods: {
    // TODO: how to avoid contaminating <pre><code> blocks
    parseContent() {
      let md = mdi.render(this.content);
      console.log("md:", md);

      let dp = new DOMParser();
      let dom = dp.parseFromString(md, "text/html");
      console.log(dom.body.children);

      let tags = dom.body.children;
      let paras = [];
      for (let i = 0; i < tags.length; ++i) {
        paras.push(tags[i].outerHTML);
      }

      let mdps = paras
        .map(ln => ln.trim())
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
#article-content-pane
  text-align left
  max-height 700px
</style>

<style lang="stylus" src="src/stylus/markdown.styl"></style>
