<template>
  <div id="books-pane">
    <el-container>
      <el-header class="title-pane" height="50px">
        <span class="title">我的协作书籍</span>
        <span class="right">
          <el-divider direction="vertical"></el-divider>按名称排序
          <faicon icon="sort" title="排序"></faicon>
        </span>
        <span class="right">
          <el-button type="primary" size="small" icon="el-icon-search" @click="searchBooks">寻找书籍</el-button>
          <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addBook">添加书籍</el-button>
        </span>
      </el-header>
      <el-main>
        <div class="book-list">
          <div class="book-item-wrap" v-for="(c, i) in books" :key="i">
            <book-card :book="c" @book-removed="bookRemoved" :showDefaultToolbar="false" :detailUrlMaker="detailUrl">
              <template #toolbar="{book}">
                <faicon icon="pen" title="编辑" @click="editBook(book)"></faicon>
                <faicon class="grey" icon="eye-slash" title="退出" @click="unwatch(book)"></faicon>
              </template>
            </book-card>
          </div>
        </div>
      </el-main>
    </el-container>

    <div></div>
  </div>
</template>

<script>
import BookCard from "./books/BookCard.vue";
export default {
  components: {
    BookCard
  },
  data() {
    return {
      books: []
    };
  },
  created() {
    this.$store.dispatch("setActiveWorksMenu", "/works/collaborations");
    this.authGet("/api/v1/books/my/collaborations")
      .then(res => {
        console.log("got books:", res.data);
        this.books = res.data;
      })
      .catch(err => {
        console.log("error getting books: " + err);
      });
  },
  methods: {
    searchBooks() {},
    addBook() {
      this.$router.push("/works/collaborations/edit/");
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
    display inline-block
</style>