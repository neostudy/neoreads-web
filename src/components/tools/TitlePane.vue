<template>
  <div class="title-pane">
    <span class="title">
      <slot></slot>
    </span>
    <span class="right">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<style lang="stylus" scoped>
.title-pane
  text-align left
  border-bottom 1px solid #eee
  height 50px
  line-height 50px

  span.title
    font-weight bold
    font-size 1.2em

  span.right
    float right

    & > *
      margin-left 10px
</style>