<template>
  <div class="book-info">
    <el-container>
      <el-header height="295px" class="cover-pane">
        <img
          v-show="coverUrl != ''"
          :src="coverUrl"
          :alt="book.title"
          :title="book.title"
          class="cover"
        />
        <dummy-cover v-if="coverUrl == ''" :title="book.title"></dummy-cover>
      </el-header>
      <el-main>
        <h4 class="name">
          <span>{{book.title}}</span>
        </h4>
        <p class="rate">
          <el-rate v-model="rate" disabled show-score></el-rate>
        </p>
        <p class="desc" :title="book.intro">{{book.intro}}</p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { toHumanString } from "src/js/math.js";
import DummyCover from "../../tools/DummyCover.vue";
export default {
  components: {
    DummyCover
  },
  props: ["book"],
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

  .cover-pane
    text-align left
    padding 0px

  .cover
    float left
    width 188px
    height 265px
    border 1px solid #ebebeb
    background-position center
    background-size 100%
    box-shadow 2px 4px 6px #bbb

  .el-main
    padding 0px 0px 0px 0px

    .name
      height 22px
      line-height 22px
      font-size 15px
      color #333 !important
      margin-bottom 10px

      .status
        margin-left 10px
        font-size 12px

      .finished
        color red

      .serial
        color green

    .desc
      margin-bottom 10px
      height 100px
      line-height 20px
      font-size 12px
      color #999

    .rate
      margin-bottom 10px

    .c-red
      color red

</style>


