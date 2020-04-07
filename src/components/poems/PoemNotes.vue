<template>
  <div class="poem-notes">
    <div v-if="isSelection" class="note-section">
      <div class="note-section-title">
        <span class="right">
          <el-rate :value="4.5" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
        </span>
        <span class="right"></span>
        当前选择
        <faicon v-if="isFav" title="取消收藏" icon="heart" class="red" @click="removeFav"></faicon>
        <faicon v-if="!isFav" title="收藏" :icon="['far', 'heart']" @click="addFav"></faicon>
      </div>
      <div class="note-ref">{{selection.content}}</div>
    </div>
    <div class="note-section my-note">
      <div class="note-section-title">
        笔记列表
        <faicon icon="plus" title="添加" class="right" @click="addNote"></faicon>
      </div>
      <div class="note-pane">
        <div v-show="isEdit" class="note-editor">
          <mavon-editor v-model="editorText"></mavon-editor>
          <br />
          <el-button type="primary" @click="saveNote">保存</el-button>
          <el-button @click="cancel()">取消</el-button>
        </div>
        <div class="note-list">
          <note-card v-for="n in focusNotes" :key="n.id" :note="n" @removed="noteRemoved"></note-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteCard from "./PoemNoteCard.vue";
export default {
  components: {
    NoteCard
  },
  props: ["selection", "where"],
  data() {
    return {
      isEdit: false,
      isFav: false,
      editorText: "",
      note: {
        content: ""
      },
      notes: []
    };
  },
  computed: {
    isSelection() {
      return "type" in this.selection;
    },
    focusNotes() {
      // 如果用户选择了部分内容，只显示相关的笔记
      if (this.isSelection) {
        if (this.selection.type == "sent") {
          let curSentid = this.selection.location.sentid;
          return this.notes.filter(x => x.sentid == curSentid);
        } else if (this.selection.type == "word") {
          // TODO: implement
          return this.notes;
        }
      } else {
        // 否则只显示全文相关的笔记
        return this.notes.filter(x => x.ptype == 3); // ptype==3 => article
      }
    }
  },
  created() {
    this.loadNotes();
  },
  methods: {
    addFav() {},
    removeFav() {},
    cancel() {
      this.editorText = "";
      this.isEdit = false;
    },
    editNote() {
      this.editorText = this.note.content;
      this.isEdit = true;
    },
    addNote() {
      this.isEdit = true;
    },
    saveNote() {
      let note = this.note;
      var url = "";
      if ("id" in note) {
        // modify
        note.content = this.editorText;
        url = "/api/v1/note/modify";
      } else {
        // create
        note = {
          ntype: 1, // note
          ptype: 1, // position: sentence
          colid: this.where.colid,
          artid: this.where.artid,
          paraid: this.selection.location.paraid,
          sentid: this.selection.location.sentid,
          content: this.editorText
        };
        url = "/api/v1/note/add";
      }

      console.log("saving note:", note);
      return this.authPost(url, note)
        .then(res => {
          let noteid = res.data.id;
          note.id = noteid;
          //self.notes[noteid] = note;
          //EVENT_BUS.$emit("NOTE_ADDED", note);
          //this.$store.dispatch("addNote", note);
          this.isEdit = false;
          this.loadNotes();
          return note;
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
    },
    loadNotes() {
      console.log("loading all notes");
      let query = "colid=" + this.where.colid + "&artid=" + this.where.artid;
      this.authGet("/api/v1/note/list/cards?" + query).then(res => {
        this.notes = res.data;
        return true;
      });
    },
    noteRemoved(note) {
      this.notes = this.notes.filter(n => n.id != note.id);
    }
  }
};
</script>


<style lang="stylus" scoped>
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
</style>