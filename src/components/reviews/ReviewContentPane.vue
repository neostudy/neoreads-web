<template>
  <div v-bar>
    <div id="chapter-content-pane"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sentid: this.$route.params.sentid
    };
  },
  created() {},
  mounted() {
    
  }
};
</script>

<style lang="stylus" scoped>
#chapter-content-pane
  max-height 800px
</style>