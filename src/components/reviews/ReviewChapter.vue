<template>
  <div>
    <div id="review-pane">
      <el-container>
        <el-header height="40px">
          <span class="chapter-title">{{title}}</span>
          <el-divider direction="vertical"></el-divider>
          <el-button icon="el-icon-caret-right" type="primary" size="small">开始温习</el-button>
          <div style="width:300px;float:right;margin-right:20px;">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          </div>
          <label style="float: right;"> 温习进度： </label>
        </el-header>
        <el-main>
          <el-row v-for="(sent, i) in sents" :key="sent.id" class="reviews-notes-row">
            <el-col :span="24">
              <review-note @go-review-sent="goReviewSent" :order="i" :sent="sent"></review-note>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <div id="chapter-content-dummy"></div>
    </div>
  </div>
</template>

<script>
import { CONTENTS } from "src/js/content/contents.js";
import ReviewNote from "./ReviewNote.vue";
export default {
  components: {
    ReviewNote
  },
  data() {
    return {
      bookid: this.$route.params.bookid,
      chapid: this.$route.params.chapid,
      notes: {},
      sents: [],
      title: ""
    };
  },
  created() {
    CONTENTS.init(this.$store, this.$axios);
  },
  mounted() {
    // fetch chapter content
    let self = this;
    CONTENTS.fetchChapter(this.bookid, this.chapid).then(res => {
      self.fetchNotes();
      if (!self.title) {
        self.title = CONTENTS.title;
      }
    });
    this.title = this.$store.getters.chapter.title;
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
    },
    goReviewSent(sent) {
      this.$router.push(`/review/sent/${this.bookid}/${this.chapid}/${sent.id}`);
    }
  }
};
</script>

<style lang="stylus" scoped>
#review-pane
  text-align left
  margin 0px auto
  width 1024px
  margin-top 20px

  .chapter-title
    font-weight bold
    font-size 1.3em

</style>
