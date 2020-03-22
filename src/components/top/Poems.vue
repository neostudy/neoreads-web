<template>
  <div>
    <div class="center-pane">
      <el-container>
        <el-aside width="250px" class="side-bar"><poem-nav></poem-nav></el-aside>
        <el-main>
          <poem-list></poem-list>
          <!--
          <el-container>
            <el-header height="60px" class="poems-header">
              <span>123</span>
              <span>4214</span>
              <span>123</span>
            </el-header>
            <el-main>
              <el-row>
                <el-col :span="16" :offset="4">
                  <div>诗社1</div>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
          -->
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import PoemNav from "../poems/PoemNav.vue"
import PoemList from "../poems/PoemList.vue"

export default {
  components: {
    PoemNav,
    PoemList
  },
  created() {
    this.$store.dispatch("setActiveMenuIndex", "/poems");
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.side-bar
  padding 10px
  border-right 1px solid #eee
  min-height 500px

.poems-header
  padding 5px
  border-bottom 1px solid #eee
</style>

