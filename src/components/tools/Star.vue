<template>
  <span class="star">
    <span v-show="!isStar">
      <faicon icon="star" class="grey" @click="changeStar(1)"></faicon>
    </span>
    <el-button-group v-show="isStar">
      <el-button
        size="small"
        class="star-button active"
        type="primary"
        plain
        @click="changeStar(1)"
      >
        <faicon icon="star" class="fav-icon"></faicon>
        <span class="star-count">{{star.value}}</span>
      </el-button>
      <el-button size="small" class="star-down-button" type="primary" plain @click="changeStar(-1)">
        <faicon icon="caret-down"></faicon>
      </el-button>
    </el-button-group>
  </span>
</template>

<script>
export default {
  props: ["star"],
  data() {
    return {};
  },
  computed: {
    isStar() {
      return this.star && this.star.value > 0;
    }
  },
  methods: {
    changeStar(n) {
      let delta = { ...this.star };
      delta.value = n;
      this.$emit("changed", delta);
    }
  }
};
</script>

<style lang="stylus">
.star
  margin 0 5px

  .grey
    color #ccc
    cursor pointer

    &:hover
      color #409EFF
  
</style>
<style lang="stylus" scoped>
.star-button
  padding 8px 10px

  &.active
    padding 8px 5px 8px 10px

  .star-count
    margin-left 5px

.star-down-button
  padding 8px 10px 8px 5px
</style>