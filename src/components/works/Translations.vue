<template>
  <div>
    <title-pane>
      我的译作
      <template #right>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addTranslation">添加译作</el-button>
      </template>
    </title-pane>
    <div class="book-list-pane">
      <div class="book-list">
        <div class="book-item-wrap" v-for="(c, i) in books" :key="i">
          <book-card :showDefaultToolbar="false" :book="c" :detailUrlMaker="detailUrlMaker">
            <template #toolbar="{book}">
              <el-button type="primary" size="small" @click="translate(book)">开始翻译</el-button>
            </template>
          </book-card>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import TitlePane from "../tools/TitlePane.vue";
import BookCard from "./books/BookCard.vue";
export default {
  components: {
    TitlePane,
    BookCard
  },
  data() {
    return {
      books: []
    }
  },
  created() {
    this.$store.dispatch("setActiveWorksMenu", "/works/translations");

    this.authGet(`/api/v1/books/my/translations/list`).then(res => {
      console.log(res.data);
      this.books = res.data;
    });
  },
  methods: {
    addTranslation() {
      this.$router.push("/works/translations/add");
    },
    translate(book) {
      console.log("start translate book")
      this.$router.push(`/works/translations/detail/${book.id}/toc`);
    },
    detailUrlMaker(book) {
      return `/works/translations/detail/${book.id}/toc`;
    }
  }
};
</script>