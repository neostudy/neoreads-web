<template>
  <div class="note tab-pane" v-show="isShow">
    <div class="note-section">
      <div class="note-section-title">
        <span class="right">
          <el-rate :value="4.5" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
        </span>
        <span class="right"></span>
        当前句子
        <faicon v-if="isFav" title="取消收藏" icon="heart" class="red" @click="removeFav"></faicon>
        <faicon v-if="!isFav" title="收藏" :icon="['far', 'heart']" @click="addFav"></faicon>
      </div>
      <div class="note-ref">{{ctx.text}}</div>
    </div>
    <div class="note-section my-note">
      <div class="note-section-title">
        我的笔记
        <faicon icon="pen" title="编辑" @click="editNote"></faicon>
        <faicon icon="trash" title="删除" class="right" @click="removeNote"></faicon>
      </div>
      <div class="note-pane">
        <div v-if="!needNote" class="note-content">{{getNote()}}</div>
        <div v-if="needNote" class="note-editor">
          <mavon-editor v-model="note.content"></mavon-editor>
          <br />
          <el-button type="primary" @click="saveNote">保存</el-button>
          <el-button @click="cancel()">取消</el-button>
        </div>
      </div>
    </div>
    <div class="note-section friends-notes">
      <div class="note-section-title">
        <span class="right">
          <label class="sort-by">按评价</label>
          <faicon icon="sort" title="排序" @click="sortFriendNotes"></faicon>
        </span>
        好友笔记
      </div>
    </div>
    <div class="note-section all-notes">
      <div class="note-section-title">
        <span class="right">
          <label class="sort-by">按评价</label>
          <faicon icon="sort" title="排序" @click="sortAllNotes"></faicon>
        </span>
        全部笔记
      </div>
    </div>
  </div>
</template>

<script>
import { EVENT_BUS } from "src/eventbus.js";
import { NOTES } from "src/js/note/note.js";
export default {
  data() {
    return {
      ctx: {},
      note: {
        ctx: {
          text: ""
        },
        content: ""
      }
    };
  },
  computed: {
    isShow: function() {
      return this.ctx.text != undefined && this.ctx.text != "";
    },
    needNote: function() {
      return this.getNote() == "";
    },
    isFav: function() {
      return this.ctx.isFav;
    }
  },
  created() {
    EVENT_BUS.$on("SELECT_SENTENCE", this.updateContext);
  },
  methods: {
    updateContext() {
      // TODO: if an editing is in process, ask the user to hold
      this.ctx = this.$store.getters.select;
      NOTES.updateCtx();
      console.log("nm ctx:", NOTES.ctx);
      console.log("nm id:", NOTES.id);
    },
    getNote() {
      let ctx = this.ctx;
      if (!ctx) {
        return "";
      }
      if (!ctx.note) {
        return "";
      }
      if (!ctx.note.content) {
        return "";
      }
      return ctx.note.content;
    },
    openNotes() {
      this.tab = "notes";
    },
    editNote() {},
    saveNote() {
      this.$message("saving note: " + this.note.content);
      let ctx = this.note.ctx;
      var json = {
        ntype: 1, // note
        ptype: 1, // position: sentence
        bookid: ctx.ids.bookid,
        chapid: ctx.ids.chapid,
        paraid: ctx.ids.paraid,
        sentid: ctx.ids.sentid,
        content: this.note.content
      };
      console.log("add note:", json);
      let self = this;
      this.authPost("/api/v1/note/add", json).then(res => {
        let noteid = res.data.id;
      });
    },
    removeNote() {},
    addFav() {},
    removeFav() {},
    sortFriendNotes() {},
    sortAllNotes() {}
  }
};
</script>

<style lang="stylus" scoped>
#reader-interactive-panel
  .note-section
    padding 10px
    margin-bottom 10px

    .note-ref
      border 1px solid #D9ECFF
      border-radius 2px
      box-shadow 0 2px 6px 0 #D9ECFF
      background-color #F7FBFF
      padding 10px 20px
      font-weight bold
      font-size 1.2em
      color #080400

    .note-section-title
      padding 10px 0
      margin-bottom 20px
      border-bottom 1px solid #D9ECFF
      font-weight bold
      color #666

      svg
        margin-left 6px
        color #409EFF
        cursor pointer

      svg.red
        color #F66

      .right
        float right

      .sort-by
        font-weight normal
        color #999

    .note-content
      border 2px dashed #D9ECFF
      background-color #F7FBFF
      border-radius 2px
      padding 10px 20px
      font-size 1em
</style>
