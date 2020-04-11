<template>
  <div class="md-paragraph" v-html="html"></div>
</template>

<script>
import {
  getSelectionText,
  getWordSelection
} from "../../js/selection/selection.js";

export default {
  props: ["html", "highlight"],
  created() {},
  mounted() {
    let sents = this.$el.getElementsByClassName("sent");
    for (let sent of sents) {
      // 在每句话之前添加一个统计块。TODO：是不是放到PoemContent里更好
      this.addStatsSpan(sent);
      // 给每句话添加一个选中事件
      this.addClickListener(sent);
    }
  },
  methods: {
    // 取消其他句子的高亮，并将当前句子高亮
    highlightSelection(sel) {
      this.clearSentSelection();
      if (sel.type == "sent") {
        let sent = sel.el;
        sent.classList.add("selected");
      } else if (sel.type == "word") {
        let sent = sel.el;
        let spos = sel.location.startpos;
        let epos = sel.location.endpos;
        console.log("selected location:", sel.location);
        this.highlightWord(sent, spos, epos);
      }
    },
    // 高亮一个单词。现在的实现假设每句话是纯文本。TODO：处理句中有嵌套元素的情形，比如加粗字体之类。
    highlightWord(sent, spos, epos) {
      let text = sent.textContent;
      sent.innerHTML = "";
      if (spos > 0) {
        let head = text.slice(0, spos);
        console.log("head:", head);
        sent.appendChild(document.createTextNode(head));
      }
      let body = text.slice(spos, epos);
      console.log("body:", body);
      let marked = document.createElement("span");
      marked.classList.add("selected");
      marked.textContent = body;
      sent.appendChild(marked);
      if (epos < text.length - 1) {
        let tail = text.slice(epos);
        console.log("tail:", tail);
        sent.appendChild(document.createTextNode(tail));
      }
    },
    clearSentSelection() {
      // 清除高亮句子
      let sents = this.$el.parentNode.getElementsByClassName("sent");
      Array.from(sents).forEach(el => el.classList.remove("selected"));
      // 清除高亮单词
    },
    addStatsSpan(sent) {
      let stat = document.createElement("span");
      stat.classList.add("sent-stat");
      let parent = sent.parentNode;
      if (parent.lastChild == sent) {
        parent.appendChild(stat);
      } else {
        parent.insertBefore(stat, sent.nextSibling);
      }
    },
    addClickListener(sent) {
      let self = this;
      sent.onclick = function(event) {
        // TODO: 应当遍历所有父节点，直到找到一个class="para"的节点
        let para = event.target.parentNode;
        let paraid = para.id;
        // TODO：处理跨句选择转化为多个完整句子的情形。
        let selectedText = getSelectionText();
        let sel = {};
        if (selectedText) {
          let wordsel = getWordSelection();
          // 如果是选择一段文字，这里只支持单句之内的选择，如单词、单字等，跨句的情况不作考虑，当跨句时，应当转化为多句选择。
          sel = {
            type: "word",
            content: wordsel.text,
            el: sent,
            event: event,
            location: {
              paraid: paraid,
              sentid: sent.id,
              startpos: wordsel.startpos,
              endpos: wordsel.endpos
            }
          };
          self.highlightSelection(sel);
        } else {
          // 如果只是单选一行
          sel = {
            type: "sent",
            id: sent.id,
            content: sent.textContent,
            el: sent,
            event: event,
            location: {
              paraid: paraid,
              sentid: sent.id
            }
          };
          self.highlightSelection(sel);
        }
        self.$emit("select", sel);
      };
    }
  }
};
</script>

<style lang="stylus" scoped></style>