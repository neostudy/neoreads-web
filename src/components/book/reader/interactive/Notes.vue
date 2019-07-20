<template>
  <div class="note tab-pane" v-show="isShow">
    <div class="note-section">
      <div class="note-section-title">
        当前句子
        <faicon v-if="isFav" title="取消收藏" icon="heart" @click="fav"></faicon>
        <faicon v-if="!isFav" title="收藏" :icon="['far', 'heart']" @click="fav"></faicon>
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
        好友笔记
        <faicon icon="sort" title="排序" class="right" @click="sortFriendNotes"></faicon>
      </div>
    </div>
    <div class="note-section all-notes">
      <div class="note-section-title">
        全部笔记
        <faicon icon="sort" title="排序" class="right" @click="sortAllNotes"></faicon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {
        ctx: {
          text: ""
        },
        content: ""
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
    },
    isFav: function() {
      return this.ctx.isFav;
    }
  },
  methods: {
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
    removeNote() {

    },
    fav() {

    },
    sortFriendNotes() {

    },
    sortAllNotes() {

    }
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

      .right
        float right

    .note-content
      border 2px dashed #D9ECFF
      background-color #F7FBFF
      border-radius 2px
      padding 10px 20px
      font-size 1.0em
</style>
