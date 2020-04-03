<template>
  <div>
    <div class="center-pane">
      <el-row>
        <el-col :span="10">
          <div class="view-poem-pane">
            <div class="poem-title-pane">
              <span class="poem-title">{{poem.title}}</span>
              <span class="author">{{poem.author}}</span>
            </div>
            <div class="poem-content">
              <poem-content :content="poem.content" @select="select"></poem-content>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <poem-notes :selection="selection" :where="where"></poem-notes>
        </el-col>
      </el-row>
      <div class="poem-toolbar">
        <fav class="poem-fav" size="lg"></fav>
        <star></star>
        <faicon icon="pen" title="编辑" @click="edit" size="sm"></faicon>
      </div>
    </div>
  </div>
</template>

<script>
import PoemContent from "../content/PoemContent.vue";
import PoemNotes from "./PoemNotes.vue";
import Fav from "../tools/Fav.vue";
import Star from "../tools/Star.vue";
export default {
  components: {
    PoemContent,
    PoemNotes,
    Fav,
    Star
  },
  data() {
    return {
      id: this.$route.params.poemid,
      poem: {
        content: ""
      },
      selection: {},
      where: {
        colid: "", 
        artid: this.$route.params.poemid,
      },
      selectedText: "",
    };
  },
  created() {
    // 获取诗歌内容
    this.$axios.get("/api/v1/articles/poems/get/" + this.id).then(res => {
      this.poem = res.data;
    });
  },
  updated() {
    // 为每句话注册响应事件
  },
  methods: {
    edit() {},
    select(data) {
      this.selection = data;
      this.selectedText = data.content;
      if (data.type == "sent") {
      }
    },
  }
};
</script>

<style lang="stylus" scoped>
.center-pane
  text-align left

  .view-poem-pane
    text-align left
    width 100% -10px
    padding 10px

    .poem-title-pane
      margin-bottom 20px

      .poem-title
        font-weight bold
        font-size 1.5em
        padding 10px 10px 10px 0px

        .poem-fav
          margin-right 8px

        span.author
          font-weight normal
          color #666

        a.poem-link
          font-size 1.2em
          cursor pointer
          margin-right 10px

        a.poem-link:hover
          color #409EFF

    .poem-content
      font-size 1.2em
      min-height 100px
      max-height 400px

    border-right 1px solid #eee

  .poem-notes
    padding 30px

  .poem-toolbar
    font-weight normal
    font-size 1.2em

    span
      margin-left 10px

    svg
      color #409eff
      cursor pointer
      margin-left 10px
</style>