<template>
  <el-container>
    <el-header class="reader-header" height="36px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/library">
          <faicon icon="stream" class="breadcrum-icon"></faicon>&nbsp;书斋
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">史记</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>第1章</el-breadcrumb-item>
        <el-breadcrumb-item>卷一 五帝本纪第一</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-container>
      <el-aside class="reader-toolbar" width="200px">
        <toc-tree :tocdata="toc"></toc-tree>
      </el-aside>
      <el-main class="reader-main">
        <el-row>
          <el-col :span="12">
            <reader-toolbar @is-ruby="isRuby = $event"></reader-toolbar>
            <div class="reader-content-div">
              <reader-content :bookid="bookid" :chapid="chapid" :is-ruby="isRuby"></reader-content>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="reader-interactive-div">
              <span id="sel"></span>
              <interactive v-bind="idata"></interactive>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TocTree from "./TocTree";
import ReaderToolbar from "./reader/toolbar/ReaderToolbar";
import ReaderContent from "./reader/ReaderContent";
import Interactive from "./reader/Interactive";
import Pinyin from "../tools/Pinyin";

export default {
  components: {
    TocTree,
    ReaderToolbar,
    ReaderContent,
    Interactive,
    Pinyin
  },
  data() {
    return {
      bookid: this.$route.params.bookid,
      chapid: this.$route.params.chapid,
      isRuby: false,
      idata: {
        dict: {}
      },
      toc: []
    };
  },
  created() {
    let self = this;
    console.log("reader: chap id is ", this.chapid);
    // get toc and chapter id
    let tocUrl = "/api/v1/book/" + this.bookid + "/toc";
    this.$axios.get(tocUrl).then(res => {
      let toc = res.data;
      let chap1 = toc[0];
      if (!self.chapid) {
        self.chapid = chap1.id;
        self.$router.push("/reader/" + self.bookid + "/" + chap1.id);
      }
      self.toc = toc;
    });
  },
  mounted() {
    //this.lookupWord("天");
  },
  beforeRouteUpdate(to, from, next) {
    this.bookid = to.params.bookid;
    this.chapid = to.params.chapid;
    next();
  },
  methods: {
  }
};
</script>


<style lang="stylus" scoped>
.reader-header
  height 36px
  line-height 36px

.reader-toolbar
  border 1px solid #eee

.reader-main
  border 1px solid #eee

.reader-toolbar
  text-align left

.reader-content-div
  max-height 800px
  padding 0px
  overflow-y scroll
  border 1px solid #eee

.reader-content-pane.ruby
  font-size 24px
</style>
