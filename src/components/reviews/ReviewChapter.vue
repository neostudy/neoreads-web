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
            <el-button @click="goReviewChapter(ch.id)">温习章节</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookid: this.$route.params.bookid,
      chapters: []
    };
  },
  created() {
    // fetch chapters and their review progresses
    let url = "/api/v1/reviews/" + this.bookid + "/chapters";
    let self = this;
    this.chapters = [
      {
        title: "你好",
        progress: 75,
        id: "Bs4P"
      },
      {
        title: "你坏",
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
    goReviewChapter(chapid) {
      this.$router.push('/review/chapter/'+this.bookid+'/'+chapid);
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
