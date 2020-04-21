<template>
  <div>
    <div class="nav-box poem-authors">
      <div class="nav-title">
        <span class="title-text">诗人</span>
        <span class="nav-toolbar">
          <faicon icon="search"></faicon>
          <faicon icon="plus"></faicon>
        </span>
      </div>
      <div class="nav-body">
        <hot-authors tags="poets"></hot-authors>
      </div>
    </div>
    <div class="nav-box poem-genres">
      <div class="nav-title">
        <span class="title-text">诗体</span>
      </div>
      <div class="nav-body">
        <a href="#">四言</a>
        <a href="#">楚辞</a>
        <a href="#">五绝</a>
        <a href="#">七绝</a>
        <a href="#">五律</a>
        <a href="#">七律</a>
        <a href="#">古风</a>
        <a href="#">歌行体</a>
      </div>
    </div>
    <div class="nav-box poem-styles">
      <div class="nav-title">
        <span class="title-text">风格</span>
      </div>
      <div class="nav-body">
        <a href="#">豪放</a>
        <a href="#">婉约</a>
      </div>
    </div>
  </div>
</template>

<script>
import HotAuthors from "./HotAuthors.vue";

export default {
  components: {
    HotAuthors
  },
  methods: {
  }
};
</script>

<style lang="stylus">
.nav-box
  margin-bottom 20px
  text-align left

  .nav-title
    border-bottom 1px solid #eee
    padding 0 0 8px 10px

    .title-text
      font-weight bold

    .nav-toolbar
      float right

      svg
        margin-left 5px
        color #999
        cursor pointer

        &:hover
          color #409EFF

  .nav-body
    padding 10px

    a
      color #666
      cursor pointer
      text-decoration none
      margin-right 10px

      &:hover
        color #409EFF
</style>