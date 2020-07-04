<template>
  <el-container>
    <el-main>
      <el-row class="ground">
        <el-col class="col-bar" :span="3" :offset="1">文集</el-col>
        <el-col class="art-bar" :span="3">文章</el-col>
        <el-col class="content-pane" :span="16">
          <div class>内容</div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/ocean");
  },
  methods: {}
};
</script>

<style lang="stylus">

.ground
  border 1px solid #fff
  border-radius 4px
  padding 10px
  min-height 600px

  .col-bar
    border-right 1px solid #eee
    min-height 600px
    text-align left
    padding 10px

  .art-bar
    border-right 1px solid #eee
    min-height 600px
    text-align left
    padding 10px


</style>
