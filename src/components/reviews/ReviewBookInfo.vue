<template>
  <div class="book-info">
    <el-container>
      <el-aside width="100px">
        <img v-show="cover != ''" :src="cover" :alt="title" class="cover" />
        <dummy-cover v-if="cover == ''" :title="title"></dummy-cover>
      </el-aside>
      <el-main>
        <el-row>
          <el-col :span="12">
            <h4 class="name">
              <span>{{title}}</span>
            </h4>
            <p class="desc" :title="intro">{{intro}}</p>
            <el-rate v-model="rate" disabled show-score></el-rate>
            <p class="popularity">
              <span>{{authors}}</span>
            </p>
          </el-col>
          <el-col :span="12">
            <div class="review-progress">
              <span class="progress-title">温习进度</span>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
            </div>
            <div class="review-buttons">
              <el-button-group>
                <el-button @click="goPlan" type="primary" size="small">规划</el-button>
                <el-button @click="goReview" type="primary" size="small">温习</el-button>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { toHumanString } from "src/js/math.js";
import DummyCover from "../tools/DummyCover.vue";
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
    },
    goPlan() {
      this.$router.push("/review/plan/"+this.id);
    },
    goReview() {
      this.$router.push("/review/book/"+this.id);
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

    .review-progress
      height 92px

      span.progress-title
        margin-bottom 4px
        line-height 32px

    .review-buttons
      float right
      margin-right 5px

</style>


