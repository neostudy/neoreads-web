<template>
  <div class="pinyin-notes-pane">
    <div>
      <el-container>
        <el-aside width="120px">
          <fangge :char="ch" :large="true"></fangge>
        </el-aside>
        <el-main>
          <div class="pinyin-notes">
            {{phnotes}}
          </div>
          <div class="pinyin-notes-options">
            备选注音：
            <pinyin-chooser :pinyins="select.pinyins" v-model="pnote" @save="savePinyin"></pinyin-chooser>
          </div>
          <div class="pinyin-notes-references">
            参考：&nbsp;
            <a target="_blank" :href="handian(ch)">汉典</a>
            <a target="_blank" :href="baidu(ch)">百度</a>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import Fangge from "../tools/charbox/Fangge.vue";
import PinyinChooser from "./PinyinChooser.vue";
import { makeTone } from "src/js/pinyin.js";
export default {
  components: { Fangge, PinyinChooser },
  props: ["select", "notes"],
  watch: {
    select(n, o) {
      this.loadPhNote();
    },
  },
  computed: {
    ch() {
      return this.select.char;
    },
    phnotes() {
      return this.notes.filter(n => n.ntype == 2);
    }
  },
  data() {
    return {
      pnote: "",
      where: {
        colid: "",
        artid: "AbeR0m2v"
      }
    };
  },
  methods: {
    savePinyin(p) {
      console.log("saving pnote:", JSON.stringify(this.select), p);
      let ptype = 0; // 字词
      let ntype = 2; // phonetics
      let spos = this.select.i;
      let epos = this.select.i + 1;
      let note = {
          ntype: nType, // note
          ptype: ptype,
          colid: this.where.colid,
          artid: this.where.artid,
          paraid: this.select.paraid,
          sentid: this.select.sentid,
          startpos: spos,
          endpos: epos,
          content: p
      };
      let url = "/api/v1/note/add";
      this.authPost(url, note)
        .then((res) => {
          let noteid = res.data.id;
          note.id = noteid;
          //self.notes[noteid] = note;
          //EVENT_BUS.$emit("NOTE_ADDED", note);
          //this.$store.dispatch("addNote", note);
          //this.loadNotes();
          return note;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    },
    loadPhNote() {},
    onEnter(ch, event) {
      // TODO：每个字在回车时直接提交注音笔记
      let pinyin = makeTone(event.target.value);
      event.target.value = pinyin;
      let spos = this.select.location.startpos + i;
      let word = {
        char: ch,
        spos: spos,
        epos: spos + 1,
        pinyin: pinyin,
      };
      this.$emit("save", word);
    },
    handian(ch) {
      let url = "https://www.zdic.net/hans/";
      let esc = encodeURIComponent(ch);
      return url + esc;
    },
    baidu(ch) {
      let url = "https://hanyu.baidu.com/zici/s?wd=";
      let esc = encodeURIComponent(ch);
      return url + esc;
    },
  },
};
</script>

<style lang="stylus">
.pinyin-notes-pane
  text-align left
  padding 20px

  .el-main
    padding 0px
    margin-left 10px
    font-size 1em

  .pinyin-notes-options
    margin-bottom 30px

  .pinyin-notes-references
    font-size 1em

    a
      margin-right 5px
</style>