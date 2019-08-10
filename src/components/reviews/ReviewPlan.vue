<template>
  <div>
    Reviewing book: {{$route.params.bookid}}
    <ul>
      <li v-for="ch in chapters" :key="ch.id">
        <span>{{ch.title}}</span>
        <span>温习进度</span>
        <span>
          <el-progress :percentage="ch.progress"></el-progress>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookid: $route.params.bookid,
      chapters: []
    };
  },
  created() {
    // fetch chapters and their review progresses
    let url = "/api/v1/reviews/" + this.bookid + "/chapters";
    let self = this;
    this.chapters = [
      {
        title: "第一章：五帝本纪",
        progress: "75"
      }
    ];
    /*
    this.$axios.get(url).then(res => {
      console.log(res);
      self.chapters = res.data;
    });
    */
  }
};
</script>

<style>
</style>
