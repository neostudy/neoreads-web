<template>
  <div class="item-info">
    <el-container>
      <el-aside width="100px">
        <img :src="cover" :alt="title" class="cover" />
        <h4 class="name">
          <span>{{i.name}}</span>
        </h4>
      </el-aside>
      <el-main>
        <div class="item-stats-num">正在学习 {{i.count}} {{i.unit}}</div>
        <div class="item-stats-stars">获得星值 {{i.stars}}</div>
        <div class="review-progress">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { toHumanString } from "src/js/math.js";
export default {
  components: {},
  props: {
    i: Object,
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
    },
    goPlan() {
      this.$router.push("/review/plan/" + this.id);
    },
    goReview() {
      this.$router.push("/review/book/" + this.id);
    }
  }
};
</script>

<style lang="stylus">
div.item-info
  margin 15px
  padding 5px
  text-align left
  border 1px solid #fff

  .cover
    width 90px
    height 120px
    border 1px solid #ebebeb
    background-position center
    background-size 100%
    box-shadow 2px 4px 6px #bbb

  .name
    margin-top 5px
    height 22px
    line-height 22px
    font-size 1.2em

  .el-main
    padding 0px 0px 0px 6px

    div
      margin-bottom 30px

    .review-progress
      height 92px

      span.progress-title
        margin-bottom 4px
        line-height 32px

</style>


