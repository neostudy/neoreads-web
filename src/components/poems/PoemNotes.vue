<template>
  <div class="poem-notes">
    <div v-show="noteMode == 'article'">
      <article-notes :selection="selection"></article-notes>
    </div>
    <div v-show="noteMode == 'sentence'">
      <sentence-notes :selection="selection" :where="where"></sentence-notes>
    </div>
    <div v-show="noteMode == 'word'">
      <word-notes :selection="selection" :where="where"></word-notes>
    </div>
  </div>
</template>

<script>
import ArticleNotes from "./ArticleNotes.vue";
import SentenceNotes from "./SentenceNotes.vue";
import WordNotes from "./WordNotes.vue";
export default {
  components: {
    ArticleNotes,
    SentenceNotes,
    WordNotes
  },
  props: ["selection", "where"],
  data() {
    return {
      noteMode: "article",
      showEditor: false,
      filterType: "all",
      noteType: "note",
      isFav: false,
      editorText: "",
      note: {
        content: ""
      },
      notes: []
    };
  },
  watch: {
    selection(o, n) {
      let oldMode = this.noteMode;
      if ("type" in this.selection) {
        if (this.selection.type == "sent") {
          this.noteMode = "sentence";
        } else if (this.selection.type == "word") {
          this.noteMode = "word";
        } else {
          this.noteMode = "article";
        }
      } else {
        this.noteMode = "article";
      }
      if (this.noteMode != oldMode) {
        this.clearInputs();
      }
    }
  },
  methods: {
    clearInputs() {
      // TODO:实现
    }
  }
};
</script>


<style lang="stylus">
.note-section
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
    margin 20px 0
    border-bottom 1px solid #D9ECFF
    font-weight bold
    color #666

    .note-toolbar
      margin-right 20px

    .note-type-filter
      margin-left 20px
      float right

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

  .note-editor
    border 1px dotted #ddd
    border-radius 5px
    padding 15px
    background-color #f7fbff

    div
      margin-bottom 10px

    .note-editor-title
      font-weight bold
      margin-bottom 10px
</style>