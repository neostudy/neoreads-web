<template>
  <div>
    <div id="review-pane" v-show="!showDetail">
      <el-container>
        <el-header height="40px">
          <span class="chapter-title">{{title}}</span>
          <el-divider direction="vertical"></el-divider>
          <el-button icon="el-icon-caret-right" type="primary" size="small">开始温习</el-button>
          <div style="width:300px;float:right;margin-right:20px;">
            <neo-progress :text-inside="true" :stroke-width="18" :now="13" :total="20"></neo-progress>
            <!--
            <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
            -->
          </div>
          <label style="float: right;">温习进度：</label>
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
    <div id="review-sent-pane" v-show="showDetail">
      <review-detail :sentid="sentid" :show="showDetail" @next-sent="nextSent" @go-chapter="goChapter"></review-detail>
    </div>
  </div>
</template>

<script>
import { CONTENTS } from "src/js/content/contents.js";
import { NOTES } from "src/js/note/note.js";
import { EVENT_BUS } from "src/eventbus.js";
import ReviewNote from "./ReviewNote.vue";
import ReviewDetail from "./ReviewDetail.vue";
import NeoProgress from "../tools/Progress.vue";
export default {
  components: {
    ReviewNote,
    ReviewDetail,
    NeoProgress
  },
  data() {
    return {
      bookid: this.$route.params.bookid,
      chapid: this.$route.params.chapid,
      sentid: this.$route.params.sentid,
      notes: {},
      sents: [],
      title: "",
      curOrder: -1
    };
  },
  computed: {
    showDetail: function() {
      return !!this.sentid;
    }
  },
  created() {
    CONTENTS.init(this.$store, this.$axios);
    NOTES.init(this.$store, this.$axios, this.bookid, this.chapid);
  },
  mounted() {
    // fetch chapter content
    let self = this;
    CONTENTS.fetchChapter(this.bookid, this.chapid).then(res => {
      //this.fetchNotes();
      NOTES.fetchNotes().then(notes => {
        console.log("notes:", notes);
        for (let sid in notes) {
          let n = notes[sid];
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
        console.log(self.sents);
      });
      if (!self.title) {
        self.title = CONTENTS.title;
      }
    });
    this.title = this.$store.getters.chapter.title;
  },
  beforeRouteUpdate(to, from, next) {
    let sid = to.params.sentid;
    this.selectSent(sid);
    next();
  },
  beforeRouteEnter(to, from, next) {
    console.log("before enter:", to);
    let sid = to.params.sentid;

    next(vm => {
      vm.selectSent(sid);
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
            if (!(sentid in self.notes) || !self.notes[sentid]) {
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
    goReviewSent(sent, order) {
      this.$router.push(
        `/review/chapter/${this.bookid}/${this.chapid}/${sent.id}`
      );
      this.curOrder = order;
      console.log("curOrder:", this.curOrder);
    },
    nextSent(diff) {
      let order = this.curOrder + diff;
      if (order < -1) {
        order = -1;
      }
      if (order != this.curOrder) {
        let sent = this.sents[order];
        this.goReviewSent(sent, order);
      }
    },
    goChapter() {
      this.sentid = '';
      this.order = -1;
    },
    selectSent(sid) {
      this.sentid = sid;

      for (let sn of this.sents) {
        if (sn.id == this.sentid) {
          console.log("setting ctx");
          let ctx = {
            isFav: !!sn.fav,
            favid: sn.fav ? sn.fav.id : "",
            text: sn.text,
            pos: {
              // TODO replace ids with pos
              bookid: this.bookid,
              chapid: this.chapid,
              sentid: this.sentid,
              paraid: "",
              start: 0,
              end: 0
            },
            note: sn.note
          };
          this.$store.dispatch("select", ctx);
          EVENT_BUS.$emit("CONTEXT_UPDATED");
        }
      }
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
