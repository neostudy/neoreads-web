<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div>
          <book-detail-card :book="book"></book-detail-card>
        </div>
      </el-col>
      <el-col :span="18">
        <el-container>
          <el-aside width="300px">
            <el-menu
              :default-active="detailMenuIndex"
              class="el-menu"
              id="works-menu"
              mode="horizontal"
              router
            >
              <el-menu-item :index="tocUrl">
                <span class="works-menu theme">
                  <faicon icon="list"></faicon>
                  {{$t('works.bookdetail.toc')}}
                </span>
              </el-menu-item>
              <el-menu-item :index="commentsUrl">
                <span class="works-menu theme">
                  <faicon icon="comments"></faicon>
                  {{$t('works.bookdetail.comments')}}
                </span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <book-toolbar :bookid="bookid"></book-toolbar>
          </el-main>
        </el-container>

        <div>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BookDetailCard from "./BookDetailCard";
import BookToolbar from "./BookToolbar";
export default {
  components: {
    BookDetailCard,
    BookToolbar
  },
  data() {
    let bookid = this.$route.params.bookid;
    return {
      bookid: bookid,
      book: {},
      detailMenuIndex: `/works/books/detail/${bookid}/toc`
    };
  },
  computed: {
    tocUrl() {
      return `/works/books/detail/${this.bookid}/toc`;
    },
    commentsUrl() {
      return `/works/books/detail/${this.bookid}/comments`;
    }
  },
  created() {
    this.$store.dispatch("setActiveWorksMenu", "/works/books");
    // fetch book info
    this.authGet("/api/v1/books/get/" + this.bookid).then(res => {
      console.log("got book", res.data);
      this.book = res.data;
    });
  },
  methods: {
  }
};
</script>

<style lang="stylus" scoped>
.stats
  float right
</style>