<template>
  <div class="article-item">
    <div class="article-title">
      <a class="article-link" @click="viewArticle">{{article.title}}</a>
      <span class="right">
        <faicon icon="pen" title="编辑" @click="editArticle" size="sm"></faicon>
      </span>
    </div>
    <!--<div class="article-content" v-html="mdContent"></div>-->

    <mavon-editor
      :ishljs="true"
      :subfield="false"
      defaultOpen="preview"
      :value="article.content"
      :toolbarsFlag="false"
      :editable="false"
      placeholder="请输入正文..."
      :boxShadow="false"
    ></mavon-editor>
    <div class="article-toolbar">
      <span>
        <faicon icon="heart" size="lg" class="mark"></faicon>
        <label>128</label>
      </span>
      <span>
        <faicon icon="pen-square" size="lg"></faicon>
        <label>12</label>
      </span>
      <span>
        <faicon icon="comments" size="lg"></faicon>
        <label>99</label>
      </span>
      <span>
        <faicon icon="quote-left" size="lg"></faicon>
        <label>58</label>
      </span>
      <span class="modtime">更新于：{{lastModTime}}</span>
      <span class="right">
        <faicon icon="trash" title="删除" class="right" @click="removeArticle"></faicon>
      </span>
    </div>
  </div>
</template>


<script>
var mdi = require("markdown-it")({
  html: true
});

export default {
  props: ["article"],
  computed: {
    mdContent() {
      return mdi.render(this.article.content);
    },
    // TODO: make it more human readable, like ignore date when it's today, ignore time when it's earlier, and has a tooltip
    lastModTime() {
      return this.article.modtime.substr(0, 19).replace("T", " ");
    }
  },
  methods: {
    editArticle() {
      this.$router.push("/works/write/" + this.article.id);
    },
    removeArticle() {
      this.$confirm("确认删除文章？")
        .then(_ => {
          this.authGet("/api/v1/articles/remove/" + this.article.id).then(
            res => {
              this.$message("文章删除成功");
              this.$emit('article-removed', this.article.id)
            }
          );
        })
        .catch(_ => {});
    },
    viewArticle() {
      this.$router.push(`/works/articles/${this.article.id}`)
    }
  }
};
</script>


<style lang="stylus" scoped>
.article-item
  margin-bottom 20px

  .article-title
    font-weight bold
    font-size 1.2em
    padding 10px

    span.right
      float right

      svg
        color #409eff
        cursor pointer
    
    a.article-link
      cursor pointer

    a.article-link:hover
      color #409EFF

  .article-content
    padding 10px
    font-size 1em
    min-height 100px
    max-height 400px

  .article-toolbar
    padding 10px 10px 30px 10px
    border-bottom 1px solid #eee
    line-height 30px
    height 30px

    span
      margin-right 20px

      svg
        color #409eff
        cursor pointer

      label
        margin-left 4px

    span.right
      float right
      margin-right 0px
      margin-left 10px

    span.modtime
      font-size 0.9em
      color #666
</style>
<style lang="stylus">
.article-content
  h1, h2, h3, h4, p
    margin-bottom 20px

  blockquote
    border-left 3px solid #d4d4d4
    padding-left 10px
    color #888

.v-note-wrapper
  max-height 800px
</style>