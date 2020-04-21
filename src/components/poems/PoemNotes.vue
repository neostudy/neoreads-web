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
        <span class="note-type-filter">
          <el-radio-group size="small" v-model="filterType">
            <el-radio-button label="all">全部 {{noteCounts.all}}</el-radio-button>
            <el-radio-button v-show="noteCounts.note > 0" label="note">笔记 {{noteCounts.note}}</el-radio-button>
            <el-radio-button v-show="noteCounts.reference > 0" label="reference">引用 {{noteCounts.reference}}</el-radio-button>
            <el-radio-button v-show="noteCounts.translation > 0" label="translation">翻译 {{noteCounts.translation}}</el-radio-button>
          </el-radio-group>
        </span>
        <faicon icon="plus" title="添加" class="right" @click="addNote"></faicon>
      </div>
      <div class="note-pane">
        <div v-show="showEditor" class="note-editor">
          <el-radio-group v-model="noteType">
            <el-radio-button label="note">笔记</el-radio-button>
            <el-radio-button label="reference">引用</el-radio-button>
            <el-radio-button label="translation">翻译</el-radio-button>
          </el-radio-group>
          <mavon-editor v-model="editorText"></mavon-editor>
          <el-button type="primary" @click="saveNote">保存</el-button>
          <el-button @click="cancel()">取消</el-button>
        </div>
        <div class="note-list">
          <note-card v-for="n in filteredNotes" :key="n.id" :note="n" @removed="noteRemoved"></note-card>
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
  computed: {
    isSelection() {
      return "type" in this.selection;
    },
    nType() {
      let typeMap = {
        note: 1,
        reference: 3,
        translation: 4
      };
      if (this.noteType in typeMap) {
        return typeMap[this.noteType];
      } else {
        return 1; // 默认是普通笔记
      }
    },
    focusNotes() {
      var focusNotes = [];
      // 如果用户选择了部分内容，只显示相关的笔记
      if (this.isSelection) {
        let sel = this.selection;
        if (sel.type == "sent") {
          let curSentid = sel.location.sentid;
          focusNotes = this.notes.filter(
            x => x.ptype == 1 && x.sentid == curSentid
          );
        } else if (sel.type == "word") {
          // TODO: implement
          focusNotes = this.notes.filter(
            x =>
              x.ptype == 0 &&
              x.sentid == sel.location.sentid &&
              x.startpos == sel.location.startpos &&
              x.endpos == sel.location.endpos
          );
        }
      } else {
        // 否则只显示全文相关的笔记
        focusNotes = this.notes.filter(x => x.ptype == 3); // ptype==3 => article
      }
      return focusNotes;
    },
    filteredNotes() {
      // 根据笔记类型筛选条件进行筛选
      if (this.filterType == "note") {
        return this.focusNotes.filter(x => x.ntype == 1);
      } else if (this.filterType == "reference") {
        return this.focusNotes.filter(x => x.ntype == 3);
      } else if (this.filterType == "translation") {
        return this.focusNotes.filter(x => x.ntype == 4);
      } else {
        return this.focusNotes;
      }
    },
    noteCounts() {
      let counts = {};
      this.focusNotes.map(n => {
        if (n.ntype in counts) {
          counts[n.ntype]++;
        } else {
          counts[n.ntype] = 1;
        }
      });
      return {
        all: this.focusNotes.length,
        note: counts[1],
        reference: counts[3],
        translation: counts[4]
      };
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
      this.showEditor = false;
    },
    editNote() {
      this.editorText = this.note.content;
      this.showEditor = true;
    },
    addNote() {
      this.noteType = "note";
      this.showEditor = true;
    },
    saveNote() {
      let note = this.note;
      var url = "";
      if ("id" in note) {
        // modify
        note.content = this.editorText;
        url = "/api/v1/note/modify";
      } else {
        let sel = this.selection;
        let ptype = 1; // 句子
        let spos = 0;
        let epos = 0;
        if (sel.type == "word") {
          ptype = 0; // 字词
          spos = sel.location.startpos;
          epos = sel.location.endpos;
        }
        // create
        note = {
          ntype: this.nType, // note
          ptype: ptype,
          colid: this.where.colid,
          artid: this.where.artid,
          paraid: this.selection.location.paraid,
          sentid: this.selection.location.sentid,
          startpos: spos,
          endpos: epos,
          content: this.editorText
        };
        url = "/api/v1/note/add";
      }

      console.log("saving note:", note);
      this.showEditor = false;
      return this.authPost(url, note)
        .then(res => {
          let noteid = res.data.id;
          note.id = noteid;
          //self.notes[noteid] = note;
          //EVENT_BUS.$emit("NOTE_ADDED", note);
          //this.$store.dispatch("addNote", note);
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
        this.$emit("notes-loaded", this.notes);
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

    .note-type-filter
      margin-left 20px

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
    background-color #eee

    div
      margin-bottom 10px

    .note-editor-title
      font-weight bold
      margin-bottom 10px
</style>