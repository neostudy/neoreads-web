<template>
  <div class="search theme">
    <input id="search-input" class="search-input theme" type="search" placeholder="搜索书名、人名、笔记内容">
    <a id="search-btn" class="search-btn theme">
      <faicon icon="search"></faicon>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.search
  width 300px
  height 42px
  line-height 40px
  border 1px solid #cab389

  .search-input
    width 240px
    height 100%
    line-height 40px
    padding-left 10px
    color #666
    border 0 none
    background-color #f2f2f2
    box-sizing border-box

  .search-btn
    float right
    width 60px
    height 42px
    line-height 40px
    background-repeat no-repeat
    background-position center center
    cursor pointer
    text-align center
    color #f2f2f2

.search.theme
  border-color #70B6FF

.search-input.theme
  background-color #C6E2FF

.search-btn.theme
  background-color #409EFF
</style>

