<template>
  <div>
    <div class="center-pane">
      <el-row>
        <el-col :span="10">
          <div class="view-poem-pane">
            <div class="poem-title-pane">
              <span class="poem-title" @click="onTitle">{{poem.title}}</span>
              <span class="author">
                <a :href="'/#/people/view/'+poem.author">{{poem.author}}</a>
              </span>
              <span class="poem-toolbar">
                <ri i="sound" @click="showSound"></ri>
                <ri i="note"></ri>
                <ri i="quote"></ri>
                <ri i="translate"></ri>
              </span>
            </div>
            <div class="poem-content">
              <poem-content :content="poem.content" @select="select"></poem-content>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <poem-notes :selection="selection" :where="where" @notes-loaded="notesLoaded"></poem-notes>
        </el-col>
      </el-row>
      <!--
      <el-row class="progress-pane">
        <el-col :span="16" :offset="4">
          <el-steps :active="activeStep" finish-status="success">
            <el-step title="读"></el-step>
            <el-step title="释"></el-step>
            <el-step title="译"></el-step>
            <el-step title="抄"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      -->

    </div>
  </div>
</template>

<script>
import PoemContent from "../content/PoemContent.vue";
import PoemNotes from "./PoemNotes.vue";
import Fav from "../tools/Fav.vue";
import Star from "../tools/Star.vue";
export default {
  components: {
    PoemContent,
    PoemNotes,
    Fav,
    Star
  },
  data() {
    return {
      id: this.$route.params.poemid,
      poem: {
        content: ""
      },
      notes: [],
      star: {},
      selection: this.dftSelection(),
      where: {
        colid: "",
        artid: this.$route.params.poemid
      },
      selectedText: "",
      activeStep : 0
    };
  },
  created() {
    // 获取诗歌内容
    this.$axios.get("/api/v1/articles/poems/get/" + this.id).then(res => {
      this.poem = res.data;
      // 获取诗歌所有笔记
      // TODO: 为了防止加载笔记时诗歌内容还没渲染好，所以放在这里了。但这么做并不是最优的
      this.loadNotes();
    });
  },
  updated() {
    // 为每句话注册响应事件
  },
  methods: {
    edit() {},
    loadNotes() {
      console.log("loading all notes");
      let query = "colid=" + this.where.colid + "&artid=" + this.where.artid;
      this.authGet("/api/v1/note/list/cards?" + query).then(res => {
        this.notes = res.data;
        this.notesLoaded(this.notes);
        return true;
      });
    },
    noteRemoved(note) {
      this.notes = this.notes.filter(n => n.id != note.id);
    },
    focusNotes() {
      var focusNotes = [];
      // 如果用户选择了部分内容，只显示相关的笔记
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
      } else {
        // 否则只显示全文相关的笔记
        focusNotes = this.notes.filter(x => x.ptype == 3); // ptype==3 => article
      }
      return focusNotes;
    },
    dftSelection() {
      return {
        type: "article",
        content: "",
        colid: "",
        artid: this.$route.params.poemid
      };
    },
    onTitle() {
      this.selection = this.dftSelection();
      this.selectedText = "";
      this.clearCurrentSelection();
    },
    select(data) {
      this.selection = data;
      this.selectedText = data.content;
      this.highlightSelection(this.selection);
      this.selection.focusNotes = this.focusNotes();
    },
    // 取消其他句子的高亮，并将当前句子高亮
    highlightSelection(sel) {
      this.clearCurrentSelection();
      if (sel.type == "line") {
        let sent = sel.el;
        sent.classList.add("selected");
      } else if (sel.type == "word") {
        let spos = sel.location.startpos;
        let epos = sel.location.endpos;
        let sent = sel.el;
        // 找到所有涉及到的span
        let curIdx = 0;
        for (let span of sent.children) {
          let text = span.textContent;
          let textLen = text.length;
          if (curIdx >= spos && curIdx + textLen <= epos) {
            span.classList.add("selected");
          }
          curIdx += text.length;
        }
        console.log("selected location:", JSON.stringify(sel.location));
        //this.highlightWord(sent, spos, epos);
      }
    },
    clearCurrentSelection() {
      // 清除所有包含selected类别的span
      let highlighted = this.$el.getElementsByClassName("selected");
      Array.from(highlighted).forEach(span =>
        span.classList.remove("selected")
      );
    },
    notesLoaded(notes) {
      this.selection.focusNotes = this.focusNotes();
      // 更新每句内容的热点统计
      this.updateStats(notes);
      // 高亮单词级别的笔记（即ptype == 0的笔记）
      let wordNotes = notes.filter(n => n.ptype == 0);
      this.markWordNotes(wordNotes);
    },
    updateStats(notes) {
      let sentCounts = {};
      notes.map(n => {
        if (n.ptype == 1) {
          let sentid = n.sentid;
          if (sentid in sentCounts) {
            sentCounts[sentid]++;
          } else {
            sentCounts[sentid] = 1;
          }
        }
      });
      let sents = this.$el.getElementsByClassName("sent");
      for (let sent of sents) {
        let sentid = sent.id;
        if (sentid in sentCounts) {
          let stat = sent.nextSibling;
          stat.innerText = sentCounts[sentid];
          stat.style.display = "inline";
        }
      }
    },
    markWordNotes(wordNotes) {
      // 先清理上次高亮的所有单词（用于笔记更新）
      let words = this.$el.getElementsByClassName("word-with-note");
      for (let word of words) {
        word.classList.remove("word-with-note");
      }
      // 把各个句子中的单词收集到一起
      let sentMap = {};

      for (let note of wordNotes) {
        let sentid = note.sentid;
        if (sentid in sentMap) {
          sentMap[sentid].push(note);
        } else {
          sentMap[sentid] = [note];
        }
      }

      console.log("sentMap", sentMap);

      // 对于每个句子，分别调用markWordsInSent()
      for (let sentid in sentMap) {
        let notes = sentMap[sentid];
        this.markWordsInSent(sentid, notes);
      }
    },
    markWordsInSent(sentid, notes) {
      console.log("marking sent: ", sentid, "with", notes);
      // 先获取所有笔记的位置信息，并进行排序。范围相同的笔记汇集到同一个range里
      let ranges = [];
      for (let note of notes) {
        let spos = note.startpos;
        let epos = note.endpos;
        let isNewRange = true;
        for (let range of ranges) {
          if (range.spos == spos && range.epos == epos) {
            range.notes.push(note);
            isNewRange = false;
          }
        }
        if (isNewRange) {
          ranges.push({
            spos: spos,
            epos: epos,
            notes: [note]
          });
        }
      }
      ranges.sort(function(x, y) {
        if (x.spos != y.spos) {
          return x.spos - y.spos;
        } else {
          return x.epos - y.epos;
        }
      });
      console.log("sorted ranges:", ranges);

      // 把各个range整理到一句话的各个字位上
      let slots = [];
      let sent = document.getElementById(sentid);
      let text = sent.textContent;
      for (let i = 0; i < text.length; ++i) {
        slots.push({ s: [], e: [], h: [] }); // s: start, e: end, h: highlight
      }

      for (let range of ranges) {
        slots[range.spos].s.push(range);
        slots[range.epos].e.push(range);
      }

      console.log("slots:", slots);

      // 根据slots将文本转化为嵌套的span
      let level = 0;
      let spans = [];
      let span = document.createElement("span");
      spans.push(span);
      for (let i = 0; i < slots.length; ++i) {
        let slot = slots[i];
        if (slot.s.length > 0) {
          // 如果是某个range的起点
          span = document.createElement("span");
          span.pos = i;
          span.classList.add("note");
          span.ranges = slot.s;
          this.registerWordNote(span);
          spans.push(span);
          level = level + slot.s.length;
          if (level > 1) {
            span.classList.add("deep");
          }
        } else if (slot.e.length > 0) {
          // 如果是某个range的终点
          if (!span.ranges) {
            span.ranges = slot.e;
          } else {
            span.ranges = span.ranges.concat(slot.e);
          }

          span = document.createElement("span");
          span.pos = i;
          level = level - slot.e.length;
          if (level > 0) {
            span.classList.add("note");
            //span.ranges = slot.e;
            this.registerWordNote(span);
          }
          spans.push(span);
        }
        span.innerText = span.innerText + text[i];
      }
      sent.innerHTML = "";
      for (let span of spans) {
        sent.append(span);
      }
    },
    registerWordNote(span) {
      span.onclick = event => {
        console.log("word note clicked");
        console.log("notes:", span.notes);
        console.log("ranges:", span.ranges);
        event.stopPropagation();
        let cur = span.curRange;
        if (cur == undefined) {
          cur = 0;
          span.curRange = 0;
        } else {
          cur = (cur + 1) % span.ranges.length;
          span.curRange = cur;
        }
        console.log("cur:", cur);
        let sent = span.parentNode;
        let sentid = sent.id;
        let para = sent.parentNode;
        let paraid = para.id;
        let range = span.ranges[cur];
        let sel = {
          type: "word",
          content: sent.textContent.substr(range.spos, range.epos - range.spos),
          el: sent,
          event: event,
          location: {
            paraid: paraid,
            sentid: sentid,
            startpos: range.spos,
            endpos: range.epos
          }
        };
        console.log("sel:", sel);
        this.select(sel, sel.content);
      };
    },
    showSound() {
      console.log("show sound");
    }
  }
};
</script>

<style lang="stylus" scoped>
.center-pane
  text-align left

  .progress-pane
    margin-top 20px
    border-top 1px solid #eee
    padding-top 20px

  .view-poem-pane
    text-align left
    width 100% -10px
    padding 10px

    .poem-title-pane
      margin-bottom 20px

      .poem-title
        font-weight bold
        font-size 1.5em
        padding 10px 10px 10px 0px
        width 100%

        .poem-fav
          margin-right 8px

        span.author
          font-weight normal
          color #666

        a.poem-link
          font-size 1.2em
          cursor pointer
          margin-right 10px

        a.poem-link:hover
          color #409EFF

     
      .poem-toolbar
        float right
        margin-right 10px


    .poem-content
      font-size 1.2em
      min-height 100px
      max-height 400px

    border-right 1px solid #eee

  .poem-notes
    padding 0px 10px 0px 30px

  .poem-toolbar
    font-weight normal
    font-size 1.2em

    span
      margin-left 10px

    svg
      color #409eff
      cursor pointer
      margin-left 10px
</style>