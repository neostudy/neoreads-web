<template>
  <div class="book-toolbar">
    <faicon icon="pen" title="编辑" @click="editBook"></faicon>
    <faicon icon="share-alt" title="分享" @click="shareBook"></faicon>
    <faicon class="grey" icon="trash" title="删除" @click="removeBook"></faicon>
  </div>
</template>

<script>
export default {
  props: ["bookid"],
  data() {
    return {
    };
  },
  methods: {
    editBook() {
      this.$router.push("/works/books/edit/" + this.bookid);
    },
    shareBook() {
      // TODO: implement this
    },
    removeBook() {
      this.$confirm("确认删除书籍？").then(_ => {
        this.authGet("api/v1/books/remove/" + this.bookid)
          .then(res => {
            this.$message("书籍删除成功");
            this.$emit("book-removed", this.bookid);
          })
          .catch(err => {
            this.$message("书籍删除失败！ " + err);
          });
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.book-toolbar
  float right
  width 160px

  svg
    margin-right 15px
    color #409EFF
    cursor pointer

  .grey
    color #666

    svg
      color #666

  .right
    float right
</style>