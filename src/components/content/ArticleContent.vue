<template>
  <div>
    <div v-bar>
      <div id="article-content-pane">
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
var mdi = require("markdown-it")({
  html: true
});
export default {
  components: {
    Paragraph
  },
  data() {
    return {
      artid: this.$route.params.artid,
      title: "",
      content: "",
      paras: [],
      highlight: ""
    };
  },
  created() {
    // fetch article content
    this.fetchArticle();
  },
  methods: {
    fetchArticle() {
      let artid = this.artid;
      console.log(`fetching content for article ${artid}`);
      let articleUrl = `/api/v1/articles/get/${artid}`;
      return this.authGet(articleUrl).then(res => {
        let data = res.data;
        this.title = data.title;
        this.content = data.content;
        this.parseContent();
        this.last = {
          artid: artid
        };
        return this.contents;
      });
    },
    parseContent() {
      let md = mdi.render(this.content);
      let mdps = md
        .split(/<\/?p>/g)
        .map(ln => ln.trim())
        .filter(ln => ln != "")
        .map(ln => "<p>" + ln + "</p>")
        .map(ln =>
          ln.replace(/>([^<]+)</g, '><span class="content-text">$1</span><')
        );
      this.paras = mdps;
    },
    select() {}
  }
};
</script>

<style lang="stylus" scoped>
#article-content-pane
  text-align left
  max-height 700px
</style>