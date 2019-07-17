<template>
  <router-link :to="'/reader/'+id" tag="div" class="book-info">
    <el-container>
      <el-aside width="100px">
        <img v-show="cover != ''" :src="cover" :alt="title" class="cover" />
        <dummy-cover v-if="cover == ''" :title="title"></dummy-cover>
      </el-aside>
      <el-main>
        <h4 class="name">
          <span>{{title}}</span>
        </h4>
        <p class="desc" :title="intro">{{intro}}</p>
        <el-rate v-model="rate" disabled show-score></el-rate>
        <p class="popularity">
          <span>{{authors}}</span>
          <span class="split">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          热度：<span class="c-red">{{getLatelyFollower}}</span>
        </p>
      </el-main>
    </el-container>
  </router-link>
</template>

<script>
import { toHumanString } from "src/js/math.js";
import DummyCover from "./DummyCover.vue";
export default {
  components: {
    DummyCover
  },
  props: {
    id: String,
    title: String,
    authors: String
  },
  data() {
    return {
      intro: "史家之绝唱，无韵之离骚",
      cover: "",
      rate: 5
    };
  },
  computed: {
    getLatelyFollower() {
      return toHumanString(1);
    }
  },
  methods: {
    onClick() {
      console.log("On book info click");
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-rate__icon
  margin-right 0px
div.book-info
  margin 15px
  padding 5px
  text-align left
  cursor pointer
  border 1px solid #fff

  .cover
    float left
    width 90px
    height 120px
    border 1px solid #ebebeb
    background-position center
    background-size 100%
    box-shadow 2px 4px 6px #bbb

  .el-main
    height 130px
    padding 0px 0px 0px 6px

    .name
      height 22px
      line-height 22px
      font-size 15px
      color #333 !important

      .status
        margin-left 10px
        font-size 12px

      .finished
        color red

      .serial
        color green

    .desc
      margin-top 5px
      height 40px
      line-height 20px
      font-size 12px
      color #999

    .popularity
      margin-top 15px
      height 20px
      font-size 14px

    .c-red
      color red
</style>


