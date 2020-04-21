<template>
  <div>
    <a v-for="a in hotPoets" :key="a.id" @click="filterAuthor(a)">{{a.fullname}}</a>
    <a href="">...更多</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotPoets: []
    }
  },
  created() {
    this.$axios.get("/api/v1/people/hotauthors?tag=诗人").then(res => {
      this.hotPoets = res.data;
    });
  }
};
</script>