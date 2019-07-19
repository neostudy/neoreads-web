<template>
  <el-tabs type="border-card" id="reader-interactive-panel" v-model="tab">
    <el-tab-pane name="explains" label="讲解">
      <span slot="label" class="label">
        <faicon icon="book-reader" ></faicon>
        <label>讲解</label>
      </span>
      <div>{{ctx.text}}</div>
    </el-tab-pane>
    <el-tab-pane name="favorites">
      <span slot="label" class="label">
        <faicon icon="heart"></faicon>
        <label>收藏</label>
      </span>
    </el-tab-pane>
    <el-tab-pane name="notes">
      <span slot="label" class="label">
        <faicon icon="pen"></faicon>
        <label>笔记</label>
      </span>
      <div class="note" v-show="isShow">
        <div class="note-text">{{ctx.text}}</div>
        <div class="note-editor">
          <div v-if="needNote">
            <mavon-editor  v-model="note.content"></mavon-editor>
          <br/>
          <el-button type="primary" @click="saveNote">保存笔记</el-button>
          </div>
          <div v-if="!needNote">{{getNote()}}</div>
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
        <faicon icon="globe-asia" ></faicon>
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
export default {
  props: ["dict"],
  data() {
    return {
      tab: "notes",
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
  computed: {
    ctx: function() {
      return this.$store.getters.selectContext;
    },
    isShow: function() {
      return this.ctx.text != undefined && this.ctx.text != '';
    },
    needNote: function() {
      return this.getNote() == '';
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
    },
    getNote() {
      let ctx = this.ctx
      if (!ctx) {
        return '';
      }
      if (!ctx.note) {
        return ''
      }
      if (!ctx.note.content) {
        return '';
      }
      return ctx.note.content

    },
    openNotes() {
      /*
      let ctx = this.$store.getters.selectContext;
      console.log("selected:", ctx);
      this.note.ctx = ctx;
      let text = ctx.text;
      */
      this.tab = "notes";
    },
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
    }
  }
};
</script>

<style lang="stylus" scoped>
#reader-interactive-panel
  margin-left 10px
  text-align left
  height 836px

  span.label
    svg
      margin-right 4px

  .note-text
    border-left 5px solid #D9ECFF
    margin-top 20px
    margin-bottom 30px
    padding-left 10px
    font-size 1.3em
    color #888

</style>

