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
                  <span class="theme">{{$t('home')}}</span>
                </el-menu-item>
                <el-menu-item index="/library">
                  <span class="theme">{{$t('library')}}</span>
                </el-menu-item>
                <el-menu-item index="/reviews">
                  <span class="theme">{{$t('reviews')}}</span>
                </el-menu-item>
                <el-menu-item index="/news">
                  <span class="theme">{{$t('news')}}</span>
                </el-menu-item>
                <el-menu-item index="/works">
                  <span class="theme">{{$t('works')}}</span>
                </el-menu-item>
                <el-menu-item index="/friends">
                  <span class="theme">{{$t('friends')}}</span>
                </el-menu-item>
                <el-menu-item index="/dev">
                  <span class="theme">{{$t('dev')}}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="4">
              <search/>
            </el-col>
            <el-col :span="2">
              <div class="lang">
              <locale @locale="changeLocale"/>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="options">
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
import Search from "./components/tools/Search.vue"
import Locale from "./components/tools/Locale.vue"

export default {
  name: "app",
  components: {
    Search, Locale
  },
  data() {
    return {
      activeIndex: "/home"
    };
  },
  mounted() {
    console.log("locale:", this.$i18n.locale)
  },
  methods: {
    login() {
      console.log("login")
    },
    changeLocale(loc) {
      this.$i18n.locale = loc
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
  bottom -12px

.options
  line-height 76px
  height 60px
  text-align left

.user
  cursor pointer
  


</style>