<template>
  <div class="md-paragraph" v-html="html"></div>
</template>

<script>
import { getSelectionText } from "../../js/selection/selection.js";

export default {
  props: ["html", "highlight"],
  created() {},
  mounted() {
    let sents = this.$el.getElementsByClassName("sent");
    for (let sent of sents) {
      let self = this;
      sent.onclick = function(event) {
        // TODO: 应当遍历所有父节点，直到找到一个class="para"的节点
        let para = event.target.parentNode;
        console.log("para:", para);
        let paraid = para.id;
        // TODO：处理跨句选择转化为多个完整句子的情形。
        let selectedText = getSelectionText();
        let sel = {};
        if (selectedText) {
          // 如果是选择一段文字，这里只支持单句之内的选择，如单词、单字等，跨句的情况不作考虑，当跨句时，应当转化为多句选择。
          sel = {
            type: "range",
            content: selectedText,
            el: sent,
            event: event,
            location: {
              paraid: paraid,
              sentid: sent.id
            }
          };
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
        }
        self.$emit("select", sel);
      };
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>