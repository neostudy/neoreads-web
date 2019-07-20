<template>
  <el-container>
    <el-header class="reader-header" height="30px">
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
      <el-aside v-show="showTOC" class="reader-aside" width="250px">
        <toc-tree :tocdata="toc"></toc-tree>
      </el-aside>
      <el-main class="reader-main">
        <el-row>
          <el-col :span="12">
            <div class="reader-content-wrap">
            <reader-toolbar @is-ruby="isRuby = $event"></reader-toolbar>
            <div class="reader-content-div">
              <reader-content :bookid="bookid" :chapid="chapid" :is-ruby="isRuby"></reader-content>
            </div>
            </div>
          </el-col>
          <el-col :span="12">
            <interactive v-bind="idata"></interactive>
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
import { EVENT_BUS } from "src/eventbus.js";

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
      toc: [],
      showTOC: false
    };
  },
  created() {

    this.$store.dispatch("setActiveMenuIndex", "/library");

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

    EVENT_BUS.$on("TOGGLE_TOC", () => (this.showTOC = !this.showTOC));
    EVENT_BUS.$on("HIDE_TOC", () => (this.showTOC = false));
  },
  mounted() {
    //this.lookupWord("天");
  },
  beforeRouteUpdate(to, from, next) {
    this.bookid = to.params.bookid;
    this.chapid = to.params.chapid;
    next();
  },
  methods: {}
};
</script>


<style lang="stylus" scoped>
.reader-header
  height 36px
  line-height 36px

.reader-aside
  border 1px solid #DCDFE6
  text-align left
  height 868px
  box-shadow 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
  overflow hidden

.reader-main
  //border 1px solid #eee
  padding 0px 10px
  height 876px
  overflow hidden

.reader-content-wrap
  box-shadow 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)

.reader-toolbar
  border 1px solid #DCDFE6
  border-bottom 0px
  text-align left

.reader-content-div
  height 816px
  padding 0px
  overflow-y hidden
  border 1px solid #DCDFE6

.reader-content-pane.ruby
  font-size 24px
</style>
