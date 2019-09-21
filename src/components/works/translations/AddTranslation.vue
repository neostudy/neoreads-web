<template>
  <div>
    <title-pane>
      选择原著
      <template #right>
        语言：
        <el-select size="small" placeholder="请选择语言" v-model="language">
          <el-option v-for="item in languages" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </template>
    </title-pane>
    <div class="book-list-pane">
      <div class="book-list">
        <div class="book-item-wrap" v-for="(c, i) in books" :key="i">
          <book-card :showDefaultToolbar="false" :book="c">
            <template #toolbar="{book}">
              <el-button type="primary" size="small" @click="selectBook(book)">选择</el-button>
            </template>
          </book-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitlePane from "../../tools/TitlePane.vue";
import BookCard from "../books/BookCard.vue";
export default {
  components: {
    TitlePane,
    BookCard
  },
  data() {
    return {
      language: "en",
      languages: ["en", "zh"],
      books: []
    };
  },
  created() {
    // fetch public books for language

    this.$axios.get(`/api/v1/books/public?lang=${this.language}`).then(res => {
      console.log(res.data);
      this.books = res.data;
    });
  },
  methods: {
    selectBook(book) {
      // add book to my translation list
      this.authGet(`/api/v1/books/my/translations/add/${book.id}`).then(res => {
        this.$router.push('/works/translations');
      }).catch(err => {
        this.$message({type:'error', message:"原著添加失败！"})
      })

    }
  }
};
</script>