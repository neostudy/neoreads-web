<template>
  <div>
    <div id="review-sent-pane">
      <el-container>
        <el-container>
          <el-aside width="700px">
            <div class="review-content-pane">
              <chapter
                :bookid="bookid"
                :chapid="chapid"
                @content-loaded="contentLoaded"
                :highlight="sentid"
              ></chapter>
            </div>
          </el-aside>
          <el-main class="review-note-pane">
            <el-button size="small" @click="goChapter">返回笔记列表</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button-group>
              <el-button @click="prevSent" size="small" plain icon="el-icon-arrow-left">上一句</el-button>
              <el-button @click="nextSent" size="small" plain>
                下一句
                <i class="el-icon-arrow-right el-icon--right"></i>
              </el-button>
            </el-button-group>

            <div style="width: 200px;display:inline-block;float:right;line-height:32px;height:32px;">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
            </div>
            <notes></notes>
          </el-main>
        </el-container>
        <el-footer></el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import ReviewContentPane from "./ReviewContentPane.vue";
import ReviewNotePane from "./ReviewNotePane.vue";
import Notes from "../book/reader/interactive/Notes.vue";
import Chapter from "../content/Chapter.vue";
import { CONTENTS } from "src/js/content/contents.js";
import { NOTES } from "src/js/note/note.js";
import { EVENT_BUS } from "src/eventbus.js";

export default {
  props: ["sentid", "show"],
  components: {
    ReviewContentPane,
    ReviewNotePane,
    Notes,
    Chapter
  },
  data() {
    return {
      bookid: this.$route.params.bookid,
      chapid: this.$route.params.chapid,
      title: "",
      notes: {},
      sents: [],
      content: "",
      curSent: ""
    };
  },
  created() {
    let self = this;
    //CONTENTS.init(this.$store, this.$axios);
    NOTES.init(this.$store, this.$axios, this.bookid, this.chapid);
  },
  methods: {
    contentLoaded() {
      this.content = CONTENTS.content;
      // this.fetchNotes();
    },
    prevSent() {
      this.$emit("next-sent", -1);
    },
    nextSent() {
      this.$emit("next-sent", 1);
    },
    goChapter() {
      this.$emit("go-chapter");
    },
    // TODO: move this feature into NOTES
    fetchNotes() {
      // fetch chapters and their review progresses
      let url = "/api/v1/reviews/notes/" + this.bookid + "/" + this.chapid;
      let self = this;
      this.authGet(url)
        .then(res => {
          console.log(res);
          let notes = res.data;
          for (let n of notes) {
            if (n.progress == "") {
              n.progress = 75;
            }
            let sentid = n.sentid;
            if (!(sentid in self.notes) || !self.notes[sentid]) {
              self.notes[sentid] = [];
            }
            self.notes[sentid].push(n);
          }
          self.sents = CONTENTS.getNotedSents(self.notes);

          /*
          // TODO: 重新调整self.sents，不用再遍历一遍
          for (let sn of self.sents) {
            if (sn.id == self.sentid) {
              // the popbar shows itself when self.selectContext changes
              let ctx = {
                isFav: !!sn.fav,
                favid: sn.fav ? sn.fav.id : "",
                text: sn.text,
                pos: {
                  // TODO replace ids with pos
                  bookid: self.bookid,
                  chapid: self.chapid,
                  sentid: self.sentid,
                  paraid: "",
                  start: 0,
                  end: 0
                },
                note: sn.note
              };
              self.$store.dispatch("select", ctx);
              EVENT_BUS.$emit("CONTEXT_UPDATED");
            }
          }
          */

          /*
          let contentEl = document.getElementById("chapter-content");
          console.log("contenEL:", contentEl);
          if (contentEl) {
            let sents = contentEl.getElementsByTagName("sent");
            for (let s of sents) {
              if (s.id == self.sentid) {
                let sentEl = s.previousSibling;
                if (sentEl) {
                  sentEl.classList.add("mark");
                }
              }
            }
          }
          console.log(self.sents);
          */
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
#review-sent-pane
  text-align left
  margin 0px auto
  width 1440px
  margin-top 20px

  .review-content-pane
    padding 20px
    border 1px solid #eee
    border-radius 5px
    margin-right 10px
    text-align left

  .review-note-pane
    padding 20px
    border 1px solid #eee
    border-radius 5px
</style>

<!-- NOTE: no scoped here for this to work -->
<style lang="stylus">
#review-sent-pane
  #chapter-content-pane
    p
      margin-bottom 20px
      border-radius 4px
      font-size 20px
      line-height 36px
      transition background-color 300ms ease-in

      span
        padding 4px 0
        background-color white
        border-radius 4px
        transition background-color 300ms ease-in

      span:hover
        background-color #D9ECFF
        cursor pointer

      span.mark
        background-color #FFFFB3

      span.note
        background-color #FFCFA0

    ruby
      rb
        font-size 28px

      rt
        font-size 8px
</style>