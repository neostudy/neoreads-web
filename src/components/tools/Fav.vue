<template>
  <div>
    <faicon v-if="isFav" icon="heart" size="lg" @click="toggleFav" class="fav-icon" :class="isMark"></faicon>
    <faicon v-if="!isFav" :icon="['far', 'heart']" size="lg" @click="toggleFav" class="fav-icon"></faicon>
  </div>
</template>

<script>
export default {
  props: ["fav"],
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
    toggleFav() {
      if (this.isFav) {
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
svg.fav-icon
  //color #409EFF
  color #ddd

svg.fav-icon.mark
  color #FF6666
</style>