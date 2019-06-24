<template>
  <div id="app">
    <el-container>
      <el-header class="top-header" height="62px">
        <div id="nav">
          <el-row>
            <el-col :span="4">
              <div id="logo">
                <span class="theme">Neo</span>
                <span>Reads</span>
              </div>
            </el-col>
            <el-col :span="12">
              <el-menu
                :default-active="activeIndex"
                class="el-menu top-menu"
                id="top-menu"
                mode="horizontal"
                router
              >
                <el-menu-item index="/home">
                  <span class="theme">首页</span>
                </el-menu-item>
                <el-menu-item index="/library">
                  <span class="theme">书斋</span>
                </el-menu-item>
                <el-menu-item index="/reviews">
                  <span class="theme">温故</span>
                </el-menu-item>
                <el-menu-item index="/news">
                  <span class="theme">知新</span>
                </el-menu-item>
                <el-menu-item index="/notes">
                  <span class="theme">笔记</span>
                </el-menu-item>
                <el-menu-item index="/friends">
                  <span class="theme">会友</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="4">
              <search/>
            </el-col>
            <el-col :span="2">
              <div style="height: 60px; line-height: 80px;">
              <faicon icon="user" size="2x" class="user theme" @click="login"></faicon>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Search from "./components/tools/Search.vue";

export default {
  name: "app",
  components: {
    Search
  },
  data() {
    return {
      activeIndex: "/home"
    };
  },
  methods: {
    login() {
      console.log("login")
    }
  }
};
</script>

<style lang="stylus">
*
  margin 0
  padding 0
</style>

<style lang="stylus" scoped>
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  min-width 1440px

#nav
  padding 0 20px

  .el-col
    height 60px
    line-height 60px

#logo
  span
    font-size 1.8em
    text-align left

#top-menu
  border-bottom 0

  span
    font-size 1.4em
    font-weight bold
    margin-left 5px

.top-header
  border-bottom 1px solid #eee

.search
  position relative
  float right
  bottom -10px

.user
  cursor pointer
  

// theme
dftColor = #409EFF
dftBorderColor = #C6E2FF
dftHighlightColor = #A0CFFF

#logo
  span.theme
    color dftColor

.user.theme
  color dftColor

  &:hover
    color dftHighlightColor
</style>
