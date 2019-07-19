<template>
  <div>
    <div class="interactive-dict">
      <div class="note">
        <div>{{note.ctx.text}}</div>
        <div>
          <textarea v-model="note.content"></textarea>
          <el-button @click="saveNote">保存笔记</el-button>
        </div>
      </div>
      <!--
      <div>{{dict.word}}</div>
      <div v-for="(s,i) in dict.symbols" :key="i">
        <span>{{s.symbol}}</span>
        <span v-if="s.mp3">
          <faicon icon="volume-up" @click="playMp3(s.mp3)"></faicon>
        </span>
      </div>
      -->
    </div>
    <!--
    <div>{{py}}</div>
    -->
  </div>
</template>

<script>
import { EVENT_BUS } from "src/eventbus.js";
import { toPinyin } from "src/js/phonetics/pinyingen.js";
export default {
  props: ["dict"],
  data() {
    return {
      py: "",
      note: {
        ctx: {
          text: ""
        },
        content: ""
      }
    };
  },
  created() {
    EVENT_BUS.$on("OPEN_NOTES", this.openNotes);
  },
  mounted() {
    this.py = toPinyin("你好");
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
    }
  },
  methods: {
    playMp3(url) {
      new Audio(url).play();
    },
    openNotes() {
      let ctx = this.$store.getters.selectContext;
      console.log("selected:", ctx);
      this.note.ctx = ctx;
      let text = ctx.text;
    },
    saveNote() {
      this.$message("saving note: " + this.note.content);
      let ctx = this.note.ctx
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
    }
  }
};
</script>

<style lang="stylus" scoped>
div.interactive-dict
  text-align left

  div
    text-align left

  span
    text-align left
</style>

