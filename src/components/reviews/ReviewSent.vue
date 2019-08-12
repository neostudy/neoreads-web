<template>
  <div>
    <div id="review-sent-pane">
      <el-container>
        <el-header height="60px">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
        </el-header>
        <el-container>
          <el-aside width="700px">
            <div class="review-content-pane">
              <review-content-pane></review-content-pane>
            </div>
          </el-aside>
          <el-main class="review-note-pane">
            <review-note-pane></review-note-pane>
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
import { CONTENTS } from "src/js/content/contents.js";
export default {
  components: {
    ReviewContentPane,
    ReviewNotePane
  },
  data() {
    return {
      bookid: this.$route.params.bookid,
      chapid: this.$route.params.chapid,
      sentid: this.$route.params.sentid,
      title: "",
      notes: {},
      sents: []
    };
  },
  created() {
    CONTENTS.init(this.$store, this.$axios);
    let self = this;
    CONTENTS.fetchChapter(this.bookid, this.chapid).then(res => {
      self.fetchNotes();
      if (!self.title) {
        self.title = CONTENTS.title;
      }
    });
  },
  methods: {
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
            if (!sentid in self.notes || !self.notes[sentid]) {
              self.notes[sentid] = [];
            }
            self.notes[sentid].push(n);
          }
          self.sents = CONTENTS.getNotedSents(self.notes);
          console.log(self.sents);
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

  .review-note-pane
    padding 20px
    border 1px solid #eee
    border-radius 5px
</style>