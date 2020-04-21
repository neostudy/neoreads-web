<template>
  <div>
    <a v-for="a in hotPoets" :key="a.id" @click="filterAuthor(a)">{{a.fullname}}</a>
    <a href>...更多</a>
  </div>
</template>

<script>
import {EVENT_BUS} from "src/eventbus.js";
export default {
  data() {
    return {
      hotPoets: []
    };
  },
  created() {
    this.$axios.get("/api/v1/people/hotauthors?tag=诗人").then(res => {
      this.hotPoets = res.data;
    });
  },
  methods: {
    filterAuthor(a) {
      EVENT_BUS.$emit("poems-filter", {
        kind: "author",
        value: a
      });
    }
  }
};
</script>