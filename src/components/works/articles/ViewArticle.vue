<template>
  <div id="view-article-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="go-back" @click="goBack">
          <faicon icon="arrow-left"></faicon>返回
        </span>
        <span class="title">{{title}}</span>
        <!--
        <span class="right">
          <el-divider direction="vertical"></el-divider>按时间排序
          <faicon icon="sort" title="排序"></faicon>
        </span>
        -->
        <span class="right">
          <nicon i="pen" title="编辑" @click="goWrite"></nicon>
          <nicon i="eye" title="研读" @click="goDetailView"></nicon>
          <nicon i="globe-asia" title="翻译" @click="goTranslator"></nicon>
        </span>
      </el-header>
      <el-main>
        <md-content :content="content" :title="title" @select="contentSelected"></md-content>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MdContent from "../../content/MarkdownContent.vue";
import Nicon from "../../tools/NeoIcon.vue";
export default {
  components: {
    MdContent,
    Nicon
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
      });
    },
    goWrite() {
      this.$router.push(`/works/write/${this.artid}`)
    },
    goDetailView() {},
    goTranslator() {},
    goBack() {
      this.$router.go(-1);
    },
    contentSelected(data) {
      console.log("selected:", data);
    }
  }
};
</script>

<style lang="stylus" scoped>
#view-article-pane
  text-align left
  max-height 800px
  padding 0

  .title-pane
    border-bottom 1px solid #eee
    height 50px
    line-height 50px
    text-align center

    span.go-back
      float left
      cursor pointer

      svg
        margin-right 5px

    span.title
      font-weight bold
      font-size 1.2em

    span.right
      float right
      .neo-icon-wrap
        color #409EFF
        font-size 1.2em
        margin-left 5px

</style>