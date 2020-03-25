<template>
  <span>
    <el-button v-show="silent" size="small" class="star-button" type="primary" plain @click="incStar">
      <faicon icon="star" class="fav-icon" :class="isMark"></faicon>
      <span class="star-count">{{num}}</span>
    </el-button>

    <el-button-group v-show="!silent">
      <el-button size="small" class="star-button active" type="primary" plain @click="incStar">
        <faicon icon="star" class="fav-icon" :class="isMark"></faicon>
        <span class="star-count">{{num}}</span>
      </el-button>
      <el-button size="small" class="star-down-button" type="primary" plain @click="decStar">
        <faicon icon="caret-down"></faicon>
      </el-button>
    </el-button-group>
  </span>
</template>

<script>
export default {
  props: ["fav", "count"],
  data() {
    return {
      silent: true, 
      num: this.count || 0
    };
  },
  computed: {
    isFav() {
      return this.fav && this.fav.id;
    },
    isMark() {
      if (this.isFav) {
        return "mark";
      } else {
        return "";
      }
    }
  },
  methods: {
    incStar() {
      this.num++;
      this.silent = false;
    },
    decStar() {
      if (this.num > 0) this.num--;
      if (this.num <= 0) this.silent = true;
    }
  }
};
</script>

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