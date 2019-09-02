<template>
  <el-row class="reviews-notes-row">
    <el-col :span="1" class="note-number-pane">
      <div class="note-number">{{order+1}}</div>
      <div class="note-fav">
        <fav :fav="sent.fav"></fav>
      </div>
    </el-col>
    <el-col :span="20" class="note-content-pane">
      <div class="note-title">{{sent.text}}</div>
      <div class="note-content" v-html="noteContent"></div>
    </el-col>
    <el-col :span="2" :offset="1" class="note-progress-pane">
      <div class="review-button">
        <el-button @click="goReviewSent" type="primary" size="small">温习</el-button>
      </div>
      <div class="review-progress">
        <el-progress type="circle" :width="60" :percentage="60"></el-progress>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Fav from "../tools/Fav.vue"
import {CONTENTS} from "src/js/content/contents.js"
var mdi = require("markdown-it")({
  html: true
});

export default {
  components: {
    Fav
  },
  props: ["order","sent"],
  computed: {
    noteContent() {
      let n = this.sent.note;
      if (!n || !n.content) return "";
      return mdi.render(n.content);
    },
  },
  methods: {
    goReviewSent() {
      this.$emit('go-review-sent', this.sent, this.order)
    }
  }
};
</script>

<style lang="stylus" scoped>
.reviews-notes-row
  margin-bottom 10px
  border-bottom 1px solid #eee
  text-align left

  .note-number-pane
    padding 10px

    .note-number
      border 1px solid #409EFF//#d9ecff
      border-radius 50%
      text-align center
      padding 5px
      width 18px
      background-color #409EFF//#f7fbff
      color white//#409EFF
      font-weight bold

    .note-fav
      margin-left 5px
      margin-top 10px

  .note-content-pane
    padding 10px

    .note-title
      padding-bottom 10px
      font-weight bold
      font-size 1.1em
      border-bottom 1px solid #eee

    .note-content
      margin-top 10px
      padding 10px
      border 1px dashed #d9ecff
      min-height 3em
      background-color #f7fbff

  .note-progress-pane
    padding 10px
    position relative

    .review-progress
      margin-top 20px

  .note-title
    text-align left
</style>
