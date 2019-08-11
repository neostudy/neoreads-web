<template>
  <div>
    <el-container>
      <el-header height="80px">Reviewing book: {{$route.params.bookid}}</el-header>
      <el-main>
        <el-row v-for="ch in chapters" :key="ch.id" class="reviews-chapters-row">
          <el-col :span="6" :offset="4">
            <span class="chapter-title">{{ch.title}}</span>
          </el-col>
          <el-col :span="6">
            <el-progress :percentage="ch.progress"></el-progress>
          </el-col>
          <el-col :span="4">
            <el-button @click="goReviewChapter(ch)">温习章节</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {CONTENTS} from "src/js/content/contents.js"
export default {
  data() {
    return {
      bookid: this.$route.params.bookid,
      chapters: []
    };
  },
  created() {
    // init ContentManager.
    // TODO: move all managers to a central location
    CONTENTS.init(this.$store, this.$axios)
    
    // fetch chapters and their review progresses
    let url = "/api/v1/reviews/" + this.bookid + "/chapters";
    let self = this;
    this.chapters = [
      {
        title: "第一卷：五帝本纪",
        progress: 75,
        id: "Bs4P"
      },
      {
        title: "第二卷：夏本纪",
        progress: 40,
        id: "gGL6"
      }
    ];
    /*
    this.$axios.get(url).then(res => {
      console.log(res);
      self.chapters = res.data;
    });
    */
  },
  methods: {
    goReviewChapter(ch) {
      // set current chapter info (main: title)
      this.$store.dispatch("setChapter", ch)
      this.$router.push("/review/chapter/" + this.bookid + "/" + ch.id);
    }
  }
};
</script>

<style lang="stylus" scoped>
.reviews-chapters-row
  margin-bottom 10px
  text-align left

  .chapter-title
    text-align left
</style>
