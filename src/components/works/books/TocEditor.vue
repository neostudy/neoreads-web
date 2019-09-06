<template>
  <div class="toc-editor-pane">
    <div v-for="(ch, i) in chapters" :key="i" class="chapter">
      第{{i+1}}章：
      <label v-if="i+1 != editNum">{{ch}}</label>
      <faicon v-if="i+1 != editNum" icon="pen" @click="editChapter(i+1)"></faicon>
      <el-input v-if="i+1 == editNum" v-model="chapters[i]" @keyup.native.enter="editNum=0"></el-input>
      <span class="right">
        <faicon icon="trash"></faicon>
      </span>
    </div>
    <div class="toc-block">
      第{{count}}章：
      <el-input
        v-model="title"
        style="width: 500px;"
        @keyup.native.enter="addChapter"
        placeholder="请输入章节标题，回车添加"
        size="small"
      ></el-input>&nbsp;
      <el-button @click="addChapter" size="small" icon="el-icon-plus" type="primary">添加章节</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chapters: [],
      title: "",
      editNum: 0
    };
  },
  computed: {
    count() {
      return this.chapters.length + 1;
    }
  },
  methods: {
    addChapter() {
      this.chapters.push(this.title);
      this.title = "";
    },
    editChapter(n) {
      this.editNum = n;
    },
  }
};
</script>

<style lang="stylus">
.toc-editor-pane
  padding 10px 0px

  .chapter
    padding 5px

    .right
      display none

  .chapter:hover
    background-color #eee
    cursor pointer

    .right
      display inline
      float right

  .toc-block
    margin-bottom 10px
</style>