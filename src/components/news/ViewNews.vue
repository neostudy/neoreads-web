<template>
  <div id="view-news-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="go-back" @click="goBack">
          <faicon icon="arrow-left"></faicon>返回
        </span>
        <span class="title">{{title}}</span>
        <span class="right">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="goWrite">修改记事</el-button>
        </span>
      </el-header>
      <el-main class="view-news-content-pane">
        <scroller maxHeight="700">
          <div class="view-news-summary" v-if="summary" @click="hideCommentsWindow">{{summary}}</div>
          <md-content :noScroll="true" :content="content" :title="title" @select="contentSelected"></md-content>
          <div class="view-news-comments-pane">
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
          </div>
          <div class="view-news-comments-window" v-show="showCommentsWindow">
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
            <p>comments</p>
          </div>
        </scroller>
      </el-main>
      <el-footer class="bottom-toolbar" height="50px">
        <nistat i="heart" value="15" @click="toggleCommentsWindow"></nistat>
        <nistat i="comments" value="25" @click="showComments"></nistat>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Scroller from "../tools/Scroller.vue";
import MdContent from "../content/MarkdownContent.vue";
import Nistat from "../tools/NeoStatIcon.vue";
export default {
  components: {
    Scroller,
    MdContent,
    Nistat
  },
  data() {
    return {
      newsid: this.$route.params.newsid,
      title: "",
      link: "",
      source: "",
      summary: "",
      tagsjson: [],
      content: "",
      paras: [],
      highlight: "",
      showCommentsWindow: false
    };
  },
  created() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      let newsid = this.newsid;
      console.log(`fetching content for news ${newsid}`);
      let articleUrl = `/api/v1/news/get/${newsid}`;
      return this.$axios.get(articleUrl).then(res => {
        let data = res.data;
        this.summary = data.summary;
        this.link = data.link;
        this.source = data.source;
        this.title = data.title;
        this.content = data.content;
      });
    },
    goWrite() {
      this.$router.push(`/news/edit/${this.newsid}`);
    },
    goDetailView() {},
    goBack() {
      this.$router.go(-1);
    },
    contentSelected(data) {
      console.log("selected:", data);
    },
    getToolBarPane() {
      return this.$el.getElementsByClassName("view-news-comments-pane")[0];
    },
    showComments() {
      console.log("showing comments");
      this.getToolBarPane().scrollIntoView();
    },
    toggleCommentsWindow() {
      this.showCommentsWindow = !this.showCommentsWindow;
    },
    hideCommentsWindow() {
      this.showCommentsWindow = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
#view-news-pane
  text-align left
  min-height 500px
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

  .view-news-content-pane
    padding 20px 0px 20px 20px

    .view-news-summary
      border 1px dashed #C6E2FF
      border-radius 5px
      padding 20px
      background-color #ECF5FF

    .view-news-comments-window
      position absolute
      width 94.5%
      bottom 0px
      height 500px
      z-index 0
      background-color white
      padding 20px
      border 1px solid #eee
      border-radius 5px

  .bottom-toolbar
    font-size 1.4em
    border-top 1px solid #eee
    padding-top 10px
</style>