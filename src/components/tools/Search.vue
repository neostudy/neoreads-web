<template>
  <div class="search theme">
    <el-input
      id="search-input"
      size="medium"
      class="search-input theme"
      type="search"
      :placeholder="$t('search-placeholder')"
    >
      <el-button
        size="small"
        slot="append"
        icon="el-icon-search"
        id="search-btn"
        class="search-btn theme"
      ></el-button>
    </el-input>

  </div>
</template>

<script>
export default {
  methods: {
  }
};
</script>

<style lang="stylus" scoped>
.search
  width 300px
  height 32px
  line-height 32px

  .search-input
    width 260px
    color #666

</style>
