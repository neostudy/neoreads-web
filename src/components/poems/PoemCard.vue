<template>
  <div class="poem-card">
    <div class="poem-title">
      <a class="poem-link" @click="view">{{poem.title}}</a>
      <span class="author">{{poem.author}}</span>
      <span class="right">
        <faicon icon="pen" title="编辑" @click="edit" size="sm"></faicon>
      </span>
    </div>
    <div class="poem-content">
      <poem-content :content="poem.content"></poem-content>
    </div>
  </div>
</template>

<script>
import PoemContent from "../content/PoemContent.vue";
export default {
  props: ["poem"],
  components: {
    PoemContent
  },
  data() {
    return {
    };
  },
  methods: {
    view() {
      this.$router.push("/poems/view/" + this.poem.id);
    },
    edit() {}
  }
};
</script>

<style lang="stylus" scoped>
.poem-card
  width 100% -10px
  border 1px solid #eee
  border-radius 5px
  padding 10px
  margin-bottom 20px

  .poem-title
    font-weight bold
    padding 10px

    span.author
      font-weight normal
      color #666

    span.right
      float right

      svg
        color #409eff
        cursor pointer

    a.poem-link
      font-size 1.2em
      cursor pointer
      margin-right 10px

    a.poem-link:hover
      color #409EFF

  .poem-content
    padding 10px
    font-size 1em
    min-height 100px
    max-height 400px
</style>