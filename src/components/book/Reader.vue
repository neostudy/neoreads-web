<template>
  <el-container>
    <el-header class="reader-header" height="36px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/library">
          <faicon icon="stream" class="breadcrum-icon"></faicon>书斋
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">史记</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>第1章</el-breadcrumb-item>
        <el-breadcrumb-item>五帝本纪</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-container>
      <el-aside class="reader-toolbar" width="200px">
        <toc-tree></toc-tree>
      </el-aside>
      <el-main class="reader-main">
        <el-row>
          <el-col :span="12">
            <reader-toolbar></reader-toolbar>
            <div class="reader-content-div">
              <reader-content :bookid="bookid" :chapid="chapid"></reader-content>
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
      bookid: this.$route.params.id,
      chapid: "",
      isRuby: false,
      idata: {
        dict: {}
      }
    };
  },
  created() {
    // get toc and chapter id
    if (this.chapid == "") {
      let tocUrl = "/api/v1/book/" + this.bookid + "/toc";
      let self = this;
      this.$axios.get(tocUrl).then(res => {
        let toc = res.data;
        let chap1 = toc[0];
        self.chapid = chap1.id;
      });
    }
  },
  mounted() {
    //this.lookupWord("天");
  },

  methods: {}
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
  padding 10px
  overflow-y scroll

.reader-content-pane.ruby
  font-size 24px
</style>
