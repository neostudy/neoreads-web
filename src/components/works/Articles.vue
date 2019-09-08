<template>
  <div id="articles-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="title">我的文章</span>
        <span class="right">
          <el-divider direction="vertical"></el-divider>按时间排序
          <faicon icon="sort" title="排序"></faicon>
        </span>
        <span class="right">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="goWrite">写文章</el-button>
        </span>
      </el-header>
      <el-main class="article-list-pane">
        <div v-bar>
          <div class="article-list-vbar">
            <div class="article-list">
            <div class="article-item-wrap" v-for="(a, i) in articles" :key="i">
              <article-card @article-removed="articleRemoved" :article="a"></article-card>
            </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>

    <div></div>
  </div>
</template>

<script>
import ArticleCard from "./articles/ArticleCard.vue";
export default {
  components: {
    ArticleCard
  },
  data() {
    return {
      articles: []
    };
  },
  created() {
    this.$store.dispatch("setActiveWorksMenu", "/works/articles");
    this.authGet("/api/v1/articles/list").then(res => {
      this.articles = res.data;
    });
  },
  methods: {
    goWrite() {
      this.$router.push("/works/write");
    },
    articleRemoved(artid) {
      this.articles = this.articles.filter(a => a.id != artid);
    }
  }
};
</script>

<style lang="stylus" scoped>
#articles-pane
  text-align left
  padding 0

  .title-pane
    border-bottom 1px solid #eee
    height 50px
    line-height 50px

    span.title
      font-weight bold
      font-size 1.2em

    span.right
      float right

  .article-list-pane
    padding 20px 0 20px 20px

    .article-list-vbar
      max-height 760px

      .article-list
        padding-right 20px
</style>