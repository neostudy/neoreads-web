<template>
  <div class="book-info">
    <el-container>
      <el-aside width="160px">
        <img
          v-show="coverUrl != ''"
          :src="coverUrl"
          :alt="book.title"
          :title="book.title"
          class="cover"
          @click="openBookDetail"
        />
        <dummy-cover v-if="coverUrl == ''" :title="book.title"></dummy-cover>
      </el-aside>
      <el-main>
        <a class="name">
          <span @click="openBookDetail">{{book.title}}</span>
        </a>
        <p class="desc" :title="book.intro">{{book.intro}}</p>
        <p class="rate">
          <el-rate v-model="rate" disabled show-score></el-rate>
        </p>
        <p class="stats">
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
        </p>
      </el-main>
    </el-container>
    <div class="toolbar" v-if="showDefaultToolbar">
      <faicon icon="pen" title="编辑" @click="editBook"></faicon>
      <faicon icon="share-alt" title="分享" @click="shareBook"></faicon>
      <faicon class="grey" icon="trash" title="删除" @click="removeBook"></faicon>
    </div>
    <div class="toolbar">
      <slot name="toolbar" :book="book"></slot>
    </div>
  </div>
</template>

<script>
import { toHumanString } from "src/js/math.js";
import DummyCover from "../../tools/DummyCover.vue";
export default {
  components: {
    DummyCover
  },
  props: {
    book: Object,
    showDefaultToolbar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rate: 4.9
    };
  },
  computed: {
    coverUrl() {
      return `/res/img/${this.book.cover}_file.png`;
    },
    popularity() {
      return toHumanString(1);
    }
  },
  methods: {
    onClick() {
      console.log("On book info click");
    },
    editBook() {
      this.$router.push("/works/books/edit/" + this.book.id);
    },
    shareBook() {
      // TODO: implement this
    },
    removeBook() {
      this.$confirm("确认删除书籍？").then(_ => {
        this.authGet("api/v1/books/remove/" + this.book.id)
          .then(res => {
            this.$message("书籍删除成功");
            this.$emit("book-removed", this.book.id);
          })
          .catch(err => {
            this.$message("书籍删除失败！ " + err);
          });
      });
    },
    openBookDetail() {
      this.$router.push("/works/books/detail/" + this.book.id + "/toc");
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-rate__icon
  margin-right 0px

div.book-info
  width 450px
  margin 15px 15px 50px 15px
  padding 5px
  text-align left
  border 1px solid #fff

  .cover
    float left
    width 140px
    height 203px
    border 1px solid #ebebeb
    background-position center
    background-size 100%
    box-shadow 2px 4px 6px #bbb
    cursor pointer

  .el-main
    height 220px
    padding 0px 0px 0px 6px

    .name
      height 24px
      line-height 24px
      font-weight bold
      font-size 1.2em
      color #333 !important
      cursor pointer

    .desc
      margin-top 5px
      height 40px
      line-height 20px
      font-size 12px
      color #999

    .rate
      margin-top 91px

    .stats
      margin-top 10px
      height 20px
      font-size 14px

      span
        margin-right 10px
        color #999

        svg
          margin-right 4px
          color #999

    .c-red
      color red

  .toolbar
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


