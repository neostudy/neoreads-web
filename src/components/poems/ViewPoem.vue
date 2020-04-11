<template>
  <div>
    <div class="center-pane">
      <el-row>
        <el-col :span="10">
          <div class="view-poem-pane">
            <div class="poem-title-pane">
              <span class="poem-title">{{poem.title}}</span>
              <span class="author">
                <a :href="'/#/people/view/'+poem.author">{{poem.author}}</a>
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
      <div class="poem-toolbar">
        <fav class="poem-fav" size="lg"></fav>
        <star></star>
        <faicon icon="pen" title="编辑" @click="edit" size="sm"></faicon>
      </div>
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
      selection: {},
      where: {
        colid: "",
        artid: this.$route.params.poemid
      },
      selectedText: ""
    };
  },
  created() {
    // 获取诗歌内容
    this.$axios.get("/api/v1/articles/poems/get/" + this.id).then(res => {
      this.poem = res.data;
    });
  },
  updated() {
    // 为每句话注册响应事件
  },
  methods: {
    edit() {},
    select(data) {
      this.selection = data;
      this.selectedText = data.content;
      if (data.type == "sent") {
      }
    },
    notesLoaded(notes) {
      console.log("notes loaded:", notes);
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
        slots.push({ s: [], e: [] });
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
        if (slot.s.length > 0) { // 如果是某个range的起点
          span = document.createElement("span");
          span.classList.add("note");
          spans.push(span);
          level = level + slot.s.length;
          if (level > 1) {
            span.classList.add("deep");
          }
        } else if (slot.e.length > 0) { // 如果是某个range的终点
          span = document.createElement("span");
          level = level - slot.e.length;
          if (level > 0) {
            span.classList.add("note");
          }
          spans.push(span);
        }
        span.innerText = span.innerText + text[i];
      }
      sent.innerHTML = "";
      for (let span of spans) {
        sent.append(span);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.center-pane
  text-align left

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