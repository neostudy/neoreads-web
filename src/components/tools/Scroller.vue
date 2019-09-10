<template>
  <div class="vbar-outer-wrapper">
    <div v-bar>
      <div class="vbar-inner-wrapper">
        <div class="vbar-inner-pane" :style="maxHeightStyle">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["maxHeight"],
  computed: {
    maxHeightStyle() {
      if (!this.maxHeight) {
        return "max-height: 760px";
      } else {
        return `max-height: ${this.maxHeight}px`;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.vbar-outer-wrapper
  padding 0

  .vbar-inner-wrapper
    max-height 760px

    .vbar-inner-pane
      padding-right 20px
</style>