<template>
  <div v-html="html"></div>
</template>

<script>
export default {
  props: ["html", "highlight"],
  created() {},
  mounted() {
    for (let sent of this.$el.getElementsByClassName("sent")) {
      //console.log(sent.id, "|", sent.previousSibling.textContent);
      //console.log(span);
      let self = this;
      sent.onclick = function(event) {
        self.$emit("select", { type: "sent", id: sent.id, content: sent.textContent, el: sent, event: event });
      };
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>