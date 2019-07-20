<template>
  <el-tabs type="border-card" id="reader-interactive-panel" v-model="tab">
    <el-tab-pane name="explains" label="讲解">
      <span slot="label" class="label">
        <faicon icon="book-reader"></faicon>
        <label>讲解</label>
      </span>
      <div>{{ctx.text}}</div>
    </el-tab-pane>
    <!--
    <el-tab-pane name="favorites">
      <span slot="label" class="label">
        <faicon icon="heart"></faicon>
        <label>收藏</label>
      </span>
    </el-tab-pane>
    -->
    <el-tab-pane name="notes">
      <span slot="label" class="label">
        <faicon icon="pen"></faicon>
        <label>笔记</label>
      </span>
      <div v-bar>
        <div class="tab-content-pane">
          <notes></notes>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="annotations" label="批注">
      <span slot="label" class="label">
        <faicon icon="pen-alt"></faicon>
        <label>批注</label>
      </span>
    </el-tab-pane>
    <el-tab-pane name="translations">
      <span slot="label" class="label">
        <faicon icon="globe-asia"></faicon>
        <label>翻译</label>
      </span>
    </el-tab-pane>
    <el-tab-pane name="qa" label="问答">
      <span slot="label" class="label">
        <faicon icon="question"></faicon>
        <label>问答</label>
      </span>
    </el-tab-pane>
    <el-tab-pane name="comments">
      <span slot="label" class="label">
        <faicon icon="comments"></faicon>
        <label>评论</label>
      </span>
    </el-tab-pane>
    <el-tab-pane name="refs">
      <span slot="label" class="label">
        <faicon icon="quote-left"></faicon>
        <label>引用</label>
      </span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { EVENT_BUS } from "src/eventbus.js";
import { toPinyin } from "src/js/phonetics/pinyingen.js";

import Notes from "./interactive/Notes.vue";
import { scrypt } from "crypto";
export default {
  components: {
    Notes
  },
  props: ["dict"],
  data() {
    return {
      tab: "notes",
      py: ""
    };
  },
  created() {
    EVENT_BUS.$on("OPEN_NOTES", this.openNotes);
  },
  mounted() {
    this.py = toPinyin("你好");

    let scrollpane = document
      .getElementById("reader-interactive-panel")
      .getElementsByClassName("el-tabs__content")[0];
    console.log(scrollpane);
    let paneNotes = document.getElementById("pane-notes");

    scrollpane.onwheel = function(event) {
      if (event.deltaY < 0) {
        console.log(
          "tops:",
          paneNotes.scrollTop,
          paneNotes.clientTop,
          paneNotes.offsetTop
        );
        // wheel up
        console.log("wheel up:", event.deltaY);
        //paneNotes.style.marginTop = - event.deltaY + "px";
      } else {
        // wheel down
        console.log("wheel down", event.deltaY);
        console.log(
          "tops:",
          paneNotes.scrollTop,
          paneNotes.clientTop,
          paneNotes.offsetTop
        );
        //paneNotes.style.marginTop = - event.deltaY + "px";
      }
    };
  },
  computed: {
    ctx: function() {
      return this.$store.getters.select;
    },
    isShow: function() {
      return this.ctx.text != undefined && this.ctx.text != "";
    },
    needNote: function() {
      return this.getNote() == "";
    }
  },
  watch: {
    dict: function(newData, oldData) {
      console.log("prop data received:", newData);
      if (newData.symbols) {
        for (var s of newData.symbols) {
          if (s.mp3) {
            console.log(s.mp3);
          }
        }
      }
    },
    ctx: function(n, o) {
      console.log("CTX changed:", n);
    }
  },
  methods: {
    playMp3(url) {
      new Audio(url).play();
    }
  }
};
</script>

<style lang="stylus">
div#reader-interactive-panel
  div.el-tabs__content
    padding 0px

// TODO move this to a dedicate stylus file
.vb > .vb-dragger
  z-index 5
  width 12px
  right 0

.vb > .vb-dragger > .vb-dragger-styler
  -webkit-backface-visibility hidden
  backface-visibility hidden
  -webkit-transform rotate3d(0, 0, 0, 0)
  transform rotate3d(0, 0, 0, 0)
  -webkit-transition background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out
  transition background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out
  background-color rgba(48, 121, 244, 0.1)
  margin 5px 5px 5px 0
  border-radius 20px
  height calc(100% - 10px)
  display block

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler
  background-color rgba(48, 121, 244, 0.3)

.vb > .vb-dragger:hover > .vb-dragger-styler
  background-color rgba(48, 121, 244, 0.5)
  margin 0px
  height 100%

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler
  background-color rgba(48, 121, 244, 0.5)
  margin 0px
  height 100%

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler
  background-color rgba(48, 121, 244, 0.5)
</style>

<style lang="stylus" scoped>
div#reader-interactive-panel
  margin-left 10px
  text-align left
  height 910px

  .el-tab-pane
    padding 0px

  .tab-content-pane
    max-height 870px

  .tab-pane
    padding 0 16px

  span.label
    svg
      margin-right 4px
</style>
