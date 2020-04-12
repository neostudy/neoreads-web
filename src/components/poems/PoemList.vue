<template>
  <div id="books-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="title">我的诗单</span>
        <span class="right">
          <el-divider direction="vertical"></el-divider>按名称排序
          <faicon icon="sort" title="排序"></faicon>
        </span>
        <span class="right">
          <el-button type="primary" size="small" icon="el-icon-search" @click="discoverPoems">发现</el-button>
          <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addPoem">添加</el-button>
        </span>
      </el-header>
      <el-main>
        <div class="book-list">
          <div class="book-item-wrap" v-for="(p, i) in poems" :key="i">
            <poem-card :poem="p"></poem-card>
          </div>
        </div>
      </el-main>
    </el-container>

    <div></div>
  </div>
</template>

<script>
import PoemCard from "./PoemCard.vue"
export default {
  components: {
    PoemCard
  },
  data() {
    return {
      poems: []
    };
  },
  created() {
    // 初始化诗歌列表
    // TODO: 添加默认搜索条件
    this.$axios.get("/api/v1/articles/poems/list")
      .then(res => {
        console.log("got books:", res.data);
        this.poems = res.data;
      })
      .catch(err => {
        console.log("error getting books: " + err);
      });
  },
  methods: {
    discoverPoems() {},
    addPoem() {
      this.$router.push("/poems/edit");
    },
    bookRemoved(colid) {
      this.books = this.books.filter(c => c.id != colid);
    },
    editBook(book) {
      this.$router.push("/works/collaborations/edit/" + book.id);
    },
    unwatch(book) {

    },
    detailUrl(book) {
      this.$router.push(`/works/collaborations/detail/${book.id}/toc`);
    }
  }
};
</script>

<style lang="stylus" scoped>
#books-pane
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

  .book-item-wrap
    display block
</style>