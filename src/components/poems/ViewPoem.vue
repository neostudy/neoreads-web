<template>
  <div>
    <div class="center-pane">
      <poem-card :poem="poem"></poem-card>
    </div>
  </div>
</template>

<script>
import PoemCard from "./PoemCard.vue";
export default {
  components: {
    PoemCard
  },
  data() {
    return {
      id: this.$route.params.poemid,
      poem: {
        content: ""
      }
    };
  },
  created() {
    // 获取诗歌内容
    this.$axios.get("/api/v1/articles/poems/get/" + this.id).then(res => {
      this.poem = res.data;
    });
  }
};
</script>