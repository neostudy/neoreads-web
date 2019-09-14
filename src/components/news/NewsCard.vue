<template>
  <div class="news-card">
    <el-container>
      <el-aside width="30px" class="left-toolbar">
        <faicon @click="voteUp" icon="chevron-up" size="lg"></faicon>
        <span class="stat">120</span>
        <faicon icon="chevron-down" size="lg"></faicon>
      </el-aside>
      <el-main class="main-pane">
        <el-container>
          <el-header height="36px" class="top-toolbar">
            <tag v-for="tag in news.tags" :key="tag.name" :tag="tag" @click="tagClicked(tag)"></tag>
            <a class="link-source" :href="news.source">({{news.source}})</a>
            <span class="external-link">
              <nicon :title="news.link" i="external-link-alt" @click="openExternal(news.link)"></nicon>
            </span>
          </el-header>
          <el-main class="content-pane">
            <h3 class="news-title" @click="viewNewsItem(news)">{{news.title}}</h3>
            <div class="news-intro">{{news.summary}}</div>
          </el-main>
          <el-footer height="30px" class="bottom-toolbar">
            <nistat i="heart" value="15"></nistat>
            <nistat i="comments" value="25"></nistat>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nistat from "../tools/NeoStatIcon.vue";
import Tag from "./Tag.vue";
import Nicon from "../tools/NeoIcon.vue";
export default {
  components: {
    Tag,
    Nistat,
    Nicon
  },
  props: ["news", "number"],
  methods: {
    voteUp() {
      document.getElementsByClassName("left-toolbar").classList.add("active");
    },
    tagClicked(tag) {
      console.log("clicking tag:", tag);
    },
    viewNewsItem(news) {
      this.$router.push(`/news/view/${news.id}`);
    },
    openExternal(link) {
      window.open(link, "_blank");
    }
  }
};
</script>

<style lang="stylus" scoped>
.news-card
  border 1px solid #eee
  border-radius 4px
  max-height 500px
  padding 10px
  margin-top 10px

  .left-toolbar
    align-items center
    box-sizing border-box
    display flex
    flex-direction column
    height 100%
    left 0

    svg
      color #999
      font-size bold
      cursor pointer

    .stat
      margin 5px 0

  .left-toolbar.active
    svg
      color #409EFF

  .main-pane
    padding 0 20px

    .content-pane
      padding 0

      .news-title
        font-size 1.5em
        cursor pointer

        &:hover
          color #409EEF
          text-decoration underline

      .news-intro
        margin-top 10px
        font-size 1em
        min-height 100px

    .top-toolbar
      padding 0
      padding-top 4px

      .tag-wrap
        margin-right 5px

      .link-source
        color #999
        text-decoration none

        &:hover
          text-decoration underline

      .external-link
        float right

    .bottom-toolbar
      margin-top 10px
      padding 0
      line-height 30px

      .neo-stat-icon
        margin-right 10px
        color #666
</style>