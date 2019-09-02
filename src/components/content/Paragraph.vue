<template>
  <div v-html="html"></div>
</template>

<script>
export default {
  props: ["html", "highlight"],
  created() {},
  mounted() {
    for (let sent of this.$el.getElementsByTagName("sent")) {
      //console.log(sent.id, "|", sent.previousSibling.textContent);
      let span = sent.previousSibling;
      //console.log(span);
      let self = this;
      span.onclick = function(event) {
        console.log("click");
        self.$emit("select", { sentid: sent.id, el: span, event: event});
      };
    }

    // TODO: should move this function to Chapter.vue, but we can't decide when are these paragraphs mounted.

    //this.hightLightCurrentSent()
  },
  methods: {
   hightLightCurrentSent() {
      let sent = document.getElementById(this.highlight)
      let span = sent.previousSibling;
      if (span) {
        span.classList.add("mark");
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>