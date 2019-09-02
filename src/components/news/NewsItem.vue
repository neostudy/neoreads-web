<template>
  <div v-html="html">
  </div>
</template>

<script>
export default {
  props:["html"],
  created() {

  },
  mounted() {
    let sent = this.$el.getElementsByTagName("sent")[0]
    if (!sent) return;
    console.log(sent.id, "|", sent.previousSibling.textContent)
  }
};
</script>

<style lang="stylus" scoped></style>