<template>
  <div class="pop-window" :id="id">
    <h2>PoP</h2>
    <div>{{context.text}}</div>
    <div>{{context.ids}}</div>
  </div>
</template>

<script>
export default {
  props: ["id", "context"],
  watch: {
    context: function(ctx, old) {
      let rec = ctx.rect;
      let left = (rec.left + rec.right) / 2 - this.$el.clientWidth / 2;
      let top = rec.top - this.$el.clientHeight - 10;
      this.$el.style.top = top + "px";
      this.$el.style.left = left + "px";
      console.log("text:", ctx.text);
    }
  }
};
</script>

<style lang="stylus">
.pop-window
  position fixed
  top 100px
  left 200px
  width 300px
  height 100px
  padding 10px
  border 1px solid #999
  border-radius 4px
  background-color #eee
  box-shadow 0px 2px 8px rgba(0, 0, 0, 0.75)
</style>
