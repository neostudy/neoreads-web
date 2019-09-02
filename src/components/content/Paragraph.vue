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
        self.$emit("select", { sentid: sent.id, el: span, event: event });
      };
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>