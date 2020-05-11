<template>
  <div>
    <div v-if="isSelection" class="note-section">
      <div class="note-ref">{{selection.content}}</div>
    </div>
    <div class="note-section my-note">
      <div class="note-section-title">
        <span class="note-type-filter">
          <el-radio-group size="mini" v-model="filterType">
            <el-radio-button label="all">全部 {{noteCounts.all}}</el-radio-button>
            <el-radio-button v-show="noteCounts.note > 0" label="note">笔记 {{noteCounts.note}}</el-radio-button>
            <el-radio-button
              v-show="noteCounts.reference > 0"
              label="reference"
            >引用 {{noteCounts.reference}}</el-radio-button>
            <el-radio-button
              v-show="noteCounts.translation > 0"
              label="translation"
            >翻译 {{noteCounts.translation}}</el-radio-button>
          </el-radio-group>
        </span>
        <span class="note-toolbar">
          <ri i="note" @click="addNote"></ri>
          <ri i="quote" @click="addReference"></ri>
          <ri i="translate" @click="addTranslation"></ri>
        </span>
      </div>
      <div class="note-pane">
        <div v-show="showEditor" class="note-editor">
          <mavon-editor v-show="noteType != 'phonetics'" v-model="editorText"></mavon-editor>
          <pinyin-editor v-show="noteType == 'phonetics'" :text="selection.content"></pinyin-editor>
          <el-button type="primary" @click="saveNote">保存</el-button>
          <el-button @click="cancel()">取消</el-button>
        </div>
        <div class="note-list">
          <note-card v-for="n in filteredNotes" :key="n.id" :note="n" @removed="$emit('note-removed', $event)"></note-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NoteCard from "./PoemNoteCard.vue";
import PinyinEditor from "../tools/PinyinEditor.vue";
export default {
  components: {
    PinyinEditor,
    NoteCard
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
    };
  },
  computed: {
    isSelection() {
      return "type" in this.selection;
    },
    nType() {
      let typeMap = {
        note: 1,
        phonetics: 2,
        reference: 3,
        translation: 4
      };
      if (this.noteType in typeMap) {
        return typeMap[this.noteType];
      } else {
        return 1; // 默认是普通笔记
      }
    },
    filteredNotes() {
      // 根据笔记类型筛选条件进行筛选
      if (this.filterType == "note") {
        return this.selection.focusNotes.filter(x => x.ntype == 1);
      } else if (this.filterType == "reference") {
        return this.selection.focusNotes.filter(x => x.ntype == 3);
      } else if (this.filterType == "translation") {
        return this.selection.focusNotes.filter(x => x.ntype == 4);
      } else {
        return this.selection.focusNotes;
      }
    },
    noteCounts() {
      let counts = {};
      this.selection.focusNotes.map(n => {
        if (n.ntype in counts) {
          counts[n.ntype]++;
        } else {
          counts[n.ntype] = 1;
        }
      });
      return {
        all: this.selection.focusNotes.length,
        note: counts[1],
        reference: counts[3],
        translation: counts[4]
      };
    }
  },
  created() {
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
    addReference() {
      this.noteType = "reference";
      this.showEditor = true;
    },
    addTranslation() {
      this.noteType = "translation";
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
    
  }
};
</script>